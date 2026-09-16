// dist/tokens.css 생성기.
// - css/primitive/*.css → css/semantic/*.css → css/deprecated.css 순으로 이어 붙인다.
// - 각 파일의 다크 블록 `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` 을 찾아
//   수동 강제용 `[data-theme="dark"] { … }` 사본을 바로 뒤에 덧붙인다. 다크 값은 소스에 한 벌만 존재한다.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const DARK_BLOCK_RE = /@media \(prefers-color-scheme: dark\) \{\n\t:root:not\(\[data-theme="light"\]\) \{\n([\s\S]*?)\n\t\}\n\}/g;

export function sourceFiles() {
	const list = (dir) => fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith(".css")).sort().map((f) => `${dir}/${f}`);
	return [...list("css/primitive"), ...list("css/semantic"), "css/deprecated.css"];
}

export function expandDark(css) {
	return css.replace(DARK_BLOCK_RE, (block, body) => {
		const dedented = body.replace(/^\t\t/gm, "\t");
		return `${block}\n\n/* ===== Dark — 수동 강제. build 가 위 블록에서 생성 ===== */\n[data-theme="dark"] {\n${dedented}\n}`;
	});
}

export function build() {
	const parts = sourceFiles().map((f) => `/* ---------- ${f} ---------- */\n${expandDark(fs.readFileSync(path.join(ROOT, f), "utf8")).trimEnd()}\n`);
	return `/* @newtil/design-tokens — scripts/build.mjs 가 생성. 직접 수정하지 마세요. 소스는 css/ */\n\n${parts.join("\n")}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const out = path.join(ROOT, "dist/tokens.css");
	fs.mkdirSync(path.dirname(out), { recursive: true });
	fs.writeFileSync(out, build());
	console.log(`built ${path.relative(ROOT, out)} (${fs.statSync(out).size} bytes)`);
}
