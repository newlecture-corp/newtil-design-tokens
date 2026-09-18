// 토큰 정합성 검사. 하나라도 실패하면 exit 1 — prepublishOnly 가 이 스크립트를 통과해야 게시된다.
//  1. 모든 var(--x) 참조가 정의된 토큰을 가리킨다
//  2. 같은 블록 안에서 같은 이름을 두 번 정의하지 않는다
//  3. 라이트·다크 parity: 다크에 있는 이름은 라이트에도 있고, 라이트의 --color-* 는 다크에도 있다
//  4. semantic 에는 hex 가 없다 (primitive 만 값 원본)
//  5. 다크 블록은 정해진 꼴 하나뿐이고, 소스에 [data-theme="dark"] 정의 블록이 없다 (build 가 만든다)
//  6. dist/tokens.css 가 build() 결과와 같다
//  7. 대비: on-X 대 X ≥ 3.0, text·text-muted 대 surface~surface-2 ≥ 4.5, text-subtle·link 대 surface ≥ 3.0 / 4.5
import fs from "node:fs";
import path from "node:path";
import { ROOT, DARK_BLOCK_RE, build, sourceFiles } from "./build.mjs";

const errors = [];
const fail = (msg) => errors.push(msg);
const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

// ---- parse: file → { light: {name: value}, dark: {…} }
const defs = { light: {}, dark: {}, deprecated: {} };
const where = {};
for (const f of sourceFiles()) {
	const raw = strip(fs.readFileSync(path.join(ROOT, f), "utf8"));
	const isDeprecated = f.endsWith("deprecated.css");
	const isSemantic = f.startsWith("css/semantic/");
	if (!isDeprecated && /\[data-theme="dark"\]\s*\{/.test(raw)) fail(`${f}: 소스에 [data-theme="dark"] 블록이 있다. 다크 값은 @media 블록 한 벌만 쓰고 사본은 build 가 만든다`);
	const darkBlocks = [...raw.matchAll(DARK_BLOCK_RE)];
	const darkRaw = darkBlocks.map((m) => m[1]).join("\n");
	if (/prefers-color-scheme: dark/.test(raw) && darkBlocks.length !== (raw.match(/prefers-color-scheme: dark/g) || []).length) fail(`${f}: 다크 블록이 정해진 꼴(@media … { :root:not([data-theme="light"]) { … } })이 아니다`);
	const lightRaw = raw.replace(DARK_BLOCK_RE, "");
	const collect = (text, ctx) => {
		const seen = new Set();
		for (const m of text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
			const [, name, value] = m;
			if (seen.has(name)) fail(`${f}: ${name} 이(가) 같은 블록에 두 번 정의됨`);
			seen.add(name);
			if (defs[ctx][name] !== undefined && ctx !== "deprecated") fail(`${f}: ${name} 이(가) ${where[ctx + name]} 에도 정의됨`);
			defs[ctx][name] = value.trim();
			where[ctx + name] = f;
			if (isSemantic && /#[0-9a-fA-F]{3,8}\b/.test(value)) fail(`${f}: ${name} 에 hex 직접 사용 (${value.trim()}). primitive 를 참조할 것`);
		}
	};
	collect(lightRaw, isDeprecated ? "deprecated" : "light");
	if (darkRaw) collect(darkRaw, "dark");
}

// ---- 1. 참조 해석
const all = { ...defs.light, ...defs.dark, ...defs.deprecated };
for (const ctx of ["light", "dark", "deprecated"]) for (const [name, value] of Object.entries(defs[ctx])) for (const m of value.matchAll(/var\((--[\w-]+)/g)) if (all[m[1]] === undefined) fail(`${where[ctx + name]}: ${name} → ${m[1]} 정의 없음`);

// ---- 3. parity
for (const name of Object.keys(defs.dark)) if (defs.light[name] === undefined) fail(`parity: ${name} 은 다크에만 있다`);
for (const name of Object.keys(defs.light)) if (name.startsWith("--color-") && defs.dark[name] === undefined) fail(`parity: ${name} 은 라이트에만 있다 (색 토큰은 다크 값이 필수)`);

// ---- 6. dist 동기
const distPath = path.join(ROOT, "dist/tokens.css");
if (!fs.existsSync(distPath) || fs.readFileSync(distPath, "utf8") !== build()) fail("dist/tokens.css 가 소스와 다르다 — npm run build");

// ---- 7. 대비
const resolve = (env, v, d = 0) => evalColor(d > 12 ? v : v.replace(/var\((--[\w-]+)\)/g, (_, n) => (env[n] !== undefined ? resolve(env, env[n], d + 1) : _)));

// ---- oklch(from <hex> L C H) 상대 색 문법을 hex 로 계산 (0.2.3: --brand 씨앗에서 램프를 만들기 때문)
//      L·C·H 자리에는 l c h 와 calc()/clamp()/사칙연산만 온다. 브라우저와 같은 OKLab 변환, sRGB 밖은 잘라낸다.
const srgb2ok = (hex) => {
	let h = hex.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join("");
	const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
	const [r, g, b] = [0, 2, 4].map((i) => lin(parseInt(h.slice(i, i + 2), 16) / 255));
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	return { l: L, c: Math.hypot(a, bb), h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 };
};
const ok2srgb = ({ l: L, c: C, h: H }) => {
	const a = C * Math.cos((H * Math.PI) / 180), bb = C * Math.sin((H * Math.PI) / 180);
	const l = (L + 0.3963377774 * a + 0.2158037573 * bb) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * bb) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * bb) ** 3;
	const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
	const gam = (c) => { c = Math.min(1, Math.max(0, c)); return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055; };
	return "#" + lin.map((c) => Math.round(gam(c) * 255).toString(16).padStart(2, "0")).join("");
};
const evalExpr = (expr, vars) => {
	// calc() 은 괄호로, clamp() 은 함수로 — clamp 안에 calc 이 겹쳐도(0.2.5 on-primary) 괄호 짝만 맞으면 된다
	let e = expr.replace(/\b(l|c|h)\b/g, (m) => String(vars[m])).replace(/calc\(/g, "(").replace(/clamp\(/g, "__clamp(").replace(/\bmin\(/g, "__min(").replace(/\bmax\(/g, "__max(");
	if (!/^[\d\s.+\-*\/()_clampinx,]+$/.test(e)) throw new Error(`계산식 아님: ${expr}`);
	return Function(`"use strict"; const __clamp = (lo, x, hi) => Math.min(Math.max(x, lo), hi), __min = Math.min, __max = Math.max; return (${e});`)();
};
function evalColor(v) {
	v = v.replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")");   // 여러 줄로 쓴 값도 한 줄로
	for (let i = 0; i < 8; i++) {
		const m = v.match(/oklch\(from\s+(#[0-9a-fA-F]{3,8})\s+(.+)\)$/) || v.match(/oklch\(from\s+(#[0-9a-fA-F]{3,8})\s+(.+?)\)(?=\s|$)/);
		if (!m) return v;
		const seed = srgb2ok(m[1]);
		// 인자 셋을 괄호 깊이 기준으로 나눈다
		const args = []; let depth = 0, cur = "";
		for (const ch of m[2].trim()) { if (ch === "(") depth++; if (ch === ")") depth--; if (ch === " " && depth === 0) { if (cur) args.push(cur); cur = ""; } else cur += ch; }
		if (cur) args.push(cur);
		if (args.length !== 3) return v;
		const [L, C, H] = args.map((a) => evalExpr(a, seed));
		v = v.replace(m[0], ok2srgb({ l: L, c: C, h: H }));
	}
	return v;
}
const hex2rgb = (h) => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); };
const lum = ([r, g, b]) => { const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (a, b) => { const [x, y] = [lum(hex2rgb(a)), lum(hex2rgb(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const pairs = [];
for (const role of ["primary", "secondary", "tertiary", "success", "warning", "danger", "info"]) pairs.push([`--color-on-${role}`, `--color-${role}`, 3.0]);
for (const t of ["--color-text", "--color-text-muted"]) for (const s of ["--color-surface", "--color-surface-1", "--color-surface-2"]) pairs.push([t, s, 4.5]);
pairs.push(["--color-text-subtle", "--color-surface", 3.0], ["--color-link", "--color-surface", 4.5], ["--color-code-fg", "--color-code-bg", 4.5], ["--color-text-inverse", "--color-surface-inverse", 4.5]);
const rows = [];
for (const [fg, bg, min] of pairs) for (const theme of ["light", "dark"]) {
	const env = theme === "light" ? defs.light : { ...defs.light, ...defs.dark };
	const a = resolve(env, `var(${fg})`), b = resolve(env, `var(${bg})`);
	if (!/^#/.test(a) || !/^#/.test(b)) { fail(`대비: ${fg}/${bg} (${theme}) 값을 hex 로 풀 수 없다: ${a} / ${b}`); continue; }
	const c = contrast(a, b);
	rows.push(`${theme.padEnd(5)} ${fg.padEnd(24)} on ${bg.padEnd(24)} ${c.toFixed(2).padStart(6)}  (min ${min})${c < min ? "  ✗" : ""}`);
	if (c < min) fail(`대비 미달: ${fg} on ${bg} (${theme}) = ${c.toFixed(2)} < ${min}`);
}
console.log(rows.join("\n"));

const count = (o) => Object.keys(o).length;
console.log(`\n토큰: light ${count(defs.light)} (semantic ${Object.keys(defs.light).filter((k) => !k.startsWith("--_")).length}, primitive ${Object.keys(defs.light).filter((k) => k.startsWith("--_")).length}), dark ${count(defs.dark)}, deprecated ${count(defs.deprecated)}`);
if (errors.length) { console.error(`\n✗ ${errors.length} 건 실패\n- ` + errors.join("\n- ")); process.exit(1); }
console.log("\n✓ check 통과");
