// docs/reference/tokens.md 생성기.
// css/primitive/*.css → css/semantic/*.css 를 읽어 카테고리(파일)별 표를 만든다.
//   토큰 | 라이트 값(참조를 끝까지 푼 hex/rem) | 다크 값 | 설명(줄 끝 /* */ 주석)
// 다크 값은 build.mjs 와 같은 DARK_BLOCK_RE 로 찾는다. 다크 블록이 없는 축은 다크 열이 "—".
// 이 파일은 문서 전용이다. 토큰 소스나 dist 를 건드리지 않는다.
import fs from "node:fs";
import path from "node:path";
import { ROOT, DARK_BLOCK_RE, sourceFiles } from "./build.mjs";

const OUT = path.join(ROOT, "docs/reference/tokens.md");

// 파일 → 표 제목. 없으면 파일명.
const TITLES = {
	"css/primitive/scale.css": "Scale — 길이 계단",
	"css/primitive/hue.css": "Hue — 색상 팔레트",
	"css/primitive/radius-scale.css": "Radius scale — 모서리 계단",
	"css/primitive/font-scale.css": "Font scale — 글꼴 크기 계단",
	"css/primitive/shadow-elev.css": "Shadow elevation — 그림자 계단",
	"css/semantic/color.css": "Color — 색",
	"css/semantic/spacing.css": "Spacing — 간격·크기",
	"css/semantic/typography.css": "Typography — 글꼴",
	"css/semantic/radius.css": "Radius — 모서리",
	"css/semantic/border.css": "Border width — 선 굵기",
	"css/semantic/shadow.css": "Shadow — 그림자",
	"css/semantic/opacity.css": "Opacity — 불투명도",
	"css/semantic/z-index.css": "Z-index — 층",
	"css/semantic/transition.css": "Transition — 시간·가속",
};

// 표 순서. index.css 의 @import 순서를 따른다.
const ORDER = [
	"css/primitive/scale.css",
	"css/primitive/hue.css",
	"css/primitive/radius-scale.css",
	"css/primitive/font-scale.css",
	"css/primitive/shadow-elev.css",
	"css/semantic/spacing.css",
	"css/semantic/color.css",
	"css/semantic/radius.css",
	"css/semantic/border.css",
	"css/semantic/typography.css",
	"css/semantic/z-index.css",
	"css/semantic/opacity.css",
	"css/semantic/shadow.css",
	"css/semantic/transition.css",
];

const DECL_RE = /^\s*(--[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*([\s\S]*?)\s*\*\/)?\s*$/;
const GROUP_RE = /^\s*\/\* =====\s*(.+?)\s*(?:=====\s*\*\/|=====\s*$)/;

// 한 블록의 텍스트를 줄 단위로 읽어 [{name, value, desc, group}] 로.
function parseBlock(text) {
	const rows = [];
	let group = null;
	for (const line of text.split("\n")) {
		const g = line.match(GROUP_RE);
		if (g) { group = g[1].replace(/\s*\(.*$/, "").trim(); continue; }
		const m = line.match(DECL_RE);
		if (!m) continue;
		rows.push({ name: m[1], value: m[2].trim(), desc: (m[3] || "").replace(/\s+/g, " ").trim(), group });
	}
	return rows;
}

// 파일 헤더(첫 블록 주석)는 그룹 마커와 모양이 같으므로 제거한다.
const stripHeader = (css) => css.replace(/^\/\*[\s\S]*?\*\/\s*/, "");

const files = sourceFiles().filter((f) => !f.endsWith("deprecated.css"));
const parsed = {};
for (const f of files) {
	const raw = stripHeader(fs.readFileSync(path.join(ROOT, f), "utf8"));
	const darkBody = [...raw.matchAll(DARK_BLOCK_RE)].map((m) => m[1]).join("\n");
	const lightBody = raw.replace(DARK_BLOCK_RE, "");
	parsed[f] = { light: parseBlock(lightBody), dark: parseBlock(darkBody) };
}

// 참조 해석 환경. 라이트 = 모든 파일의 라이트 값, 다크 = 라이트 위에 다크 값 덮기.
const lightEnv = {};
const darkEnv = {};
for (const f of files) {
	for (const r of parsed[f].light) lightEnv[r.name] = r.value;
	for (const r of parsed[f].dark) darkEnv[r.name] = r.value;
}
const darkFull = { ...lightEnv, ...darkEnv };
const resolve = (env, v, d = 0) => (d > 12 ? v : v.replace(/var\((--[\w-]+)\)/g, (_, n) => (env[n] !== undefined ? resolve(env, env[n], d + 1) : _)));

const isColor = (v) => /^#[0-9a-fA-F]{3,8}$/.test(v) || /^(rgba?|color-mix)\(/.test(v);
const swatch = (v) => (isColor(v) ? `<span class="tk-swatch" style="background:${v}"></span> ` : "");
const code = (v) => `\`${v}\``;
const cell = (v) => v.replace(/\|/g, "\\|");

// 표 한 장. 참조 토큰이면 "참조 → 풀린 값" 을 같이 보여준다.
function renderRows(rows, darkRows, hasDark) {
	const dark = Object.fromEntries(darkRows.map((r) => [r.name, r]));
	const head = hasDark
		? "| 토큰 | 라이트 값 | 다크 값 | 설명 |\n|---|---|---|---|"
		: "| 토큰 | 값 | 설명 |\n|---|---|---|";
	const lines = [head];
	for (const r of rows) {
		const lv = resolve(lightEnv, r.value);
		const lightCell = swatch(lv) + code(lv) + (lv !== r.value ? `<br><small>${code(r.value)}</small>` : "");
		const parts = [code(r.name), lightCell];
		if (hasDark) {
			const dr = dark[r.name];
			if (dr) {
				const dv = resolve(darkFull, dr.value);
				parts.push(swatch(dv) + code(dv) + (dv !== dr.value ? `<br><small>${code(dr.value)}</small>` : ""));
			} else parts.push("—");
			const desc = [r.desc, dr && dr.desc && dr.desc !== r.desc ? `다크: ${dr.desc}` : ""].filter(Boolean).join(" / ");
			parts.push(desc);
		} else parts.push(r.desc);
		lines.push(`| ${parts.map(cell).join(" | ")} |`);
	}
	return lines.join("\n");
}

function renderFile(f) {
	const { light, dark } = parsed[f];
	const hasDark = dark.length > 0;
	const out = [`## ${TITLES[f] || f}`, "", `소스: \`${f}\` · ${light.length}개${hasDark ? ` (다크 값 ${dark.length}개)` : ""}`, ""];
	const groups = [...new Set(light.map((r) => r.group))];
	if (groups.length > 1) {
		for (const g of groups) {
			if (g) out.push(`### ${g}`, "");
			out.push(renderRows(light.filter((r) => r.group === g), dark, hasDark), "");
		}
	} else out.push(renderRows(light, dark, hasDark), "");
	return out.join("\n");
}

const count = (pred) => Object.keys(lightEnv).filter(pred).length;
const primitiveCount = count((k) => k.startsWith("--_"));
const semanticCount = count((k) => !k.startsWith("--_"));

const md = `---
outline: [2, 3]
---

<!-- scripts/docs-tokens.mjs 가 css/ 에서 생성한다. 직접 수정하지 마세요. -->

<style>
.tk-swatch { display: inline-block; width: 0.9em; height: 0.9em; border-radius: 3px; border: 1px solid rgba(128,128,128,0.45); vertical-align: -0.1em; }
.vp-doc table { font-size: 0.85em; }
.vp-doc td small code { font-size: 0.9em; opacity: 0.75; }
</style>

# 토큰 레퍼런스

\`css/primitive\` 와 \`css/semantic\` 소스에서 생성한 전체 목록이다. semantic ${semanticCount}개, primitive ${primitiveCount}개.

- **값** 열은 참조(\`var(--_…)\`)를 끝까지 풀어 실제 hex·rem 을 보여준다. 참조로 정의된 토큰은 원래 참조를 작은 글씨로 함께 적었다.
- **다크 값** 열은 \`@media (prefers-color-scheme: dark)\` 블록의 값이다. 다크 블록이 없는 축(간격·글꼴·모서리 등)은 테마와 무관하게 한 값이다.
- \`--_\` 로 시작하는 primitive 는 내부 저장소다. 앱·컴포넌트 코드에서는 semantic 토큰을 쓰고, primitive 는 [브랜드색 교체](/guide/customizing) 때만 덮어쓴다.
- 제거된 옛 이름의 별칭은 [마이그레이션](/guide/migration)에 있다.

# Semantic

${ORDER.filter((f) => f.startsWith("css/semantic/")).map(renderFile).join("\n")}
# Primitive

${ORDER.filter((f) => f.startsWith("css/primitive/")).map(renderFile).join("\n")}`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, md);
console.log(`generated ${path.relative(ROOT, OUT)} (semantic ${semanticCount}, primitive ${primitiveCount})`);
