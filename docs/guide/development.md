# 개발

```bash
npm run build         # css/ → dist/tokens.css
npm run check         # 정합성 검사 (= npm test)
npm run docs:tokens   # css/ → docs/reference/tokens.md
npm run docs:dev      # 문서 개발 서버
npm run docs:build    # 문서 빌드
```

## 소스 구조

```
css/
  index.css            소스 진입점 (@import 묶음)
  primitive/           값의 원본 (--_*)
    scale.css          길이 계단 (4px 그리드, rem)
    hue.css            색상 팔레트 (gray, green, blue, red, amber, emerald, sky, white)
    radius-scale.css   모서리 계단
    font-scale.css     글꼴 크기 계단
    shadow-elev.css    그림자 계단
  semantic/            역할 토큰
    color.css          라이트 블록 + @media 다크 블록
    spacing.css  radius.css  border.css  typography.css
    z-index.css  opacity.css  shadow.css  transition.css
  deprecated.css       제거된 이름의 별칭 (다음 minor 에서 삭제)
dist/
  tokens.css           빌드 결과. 직접 수정하지 않는다
scripts/
  build.mjs            dist 생성
  check.mjs            정합성 검사
  docs-tokens.mjs      토큰 레퍼런스 문서 생성
```

## `npm run build` — `scripts/build.mjs`

`css/primitive/*.css` → `css/semantic/*.css` → `css/deprecated.css` 순으로 이어 붙여 `dist/tokens.css` 를 만든다 (디렉터리 안은 파일명 정렬).

각 파일에서 정해진 꼴의 다크 블록을 찾아 수동 강제용 사본을 바로 뒤에 덧붙인다.

```css
@media (prefers-color-scheme: dark) {
	:root:not([data-theme="light"]) {
		…
	}
}
/* ↓ build 가 생성 */
[data-theme="dark"] {
	…
}
```

다크 값은 소스에 한 벌만 존재한다. 사본을 손으로 쓰지 않는다.

## `npm run check` — `scripts/check.mjs`

하나라도 실패하면 exit 1.

| # | 검사 | 실패 예 |
|---|---|---|
| 1 | 모든 `var(--x)` 참조가 정의된 토큰을 가리킨다 | `--color-info: var(--_hue-cyan-500)` (없는 램프) |
| 2 | 같은 블록 안에서 같은 이름을 두 번 정의하지 않는다 | 라이트 블록에 `--color-link` 두 번 |
| 3 | 라이트·다크 parity — 다크에 있는 이름은 라이트에도 있고, 라이트의 `--color-*` 는 다크에도 있다 | 다크 값 없는 새 색 토큰 |
| 4 | semantic 에 hex 가 없다 (primitive 만 값의 원본) | `--color-text: #171717` |
| 5 | 다크 블록은 정해진 꼴 하나뿐이고, 소스에 `[data-theme="dark"]` 정의 블록이 없다 | 소스에 수동 사본을 직접 씀 |
| 6 | `dist/tokens.css` 가 `build()` 결과와 같다 | 소스만 고치고 build 안 함 |
| 7 | WCAG 대비 | 아래 표 |

### 대비 기준 (7)

색을 hex 로 끝까지 풀어 라이트·다크 각각 계산한다.

| 전경 | 배경 | 최소 |
|---|---|---|
| `--color-on-{primary, secondary, tertiary, success, warning, danger, info}` | 같은 역할색 | 3.0 (큰 글자 AA) |
| `--color-text`, `--color-text-muted` | `--color-surface`, `--color-surface-1`, `--color-surface-2` | 4.5 (본문 AA) |
| `--color-text-subtle` | `--color-surface` | 3.0 |
| `--color-link` | `--color-surface` | 4.5 |
| `--color-code-fg` | `--color-code-bg` | 4.5 |
| `--color-text-inverse` | `--color-surface-inverse` | 4.5 |

`css/deprecated.css` 의 토큰은 parity·hex 검사 대상이 아니다.

## `prepublishOnly`

```json
"prepublishOnly": "npm run build && npm run check"
```

`npm publish` 직전에 build 와 check 가 돈다. 검사에 걸리면 게시되지 않는다. `dist/tokens.css` 는 `files` 에 포함되어 패키지에 실린다.

## 토큰을 추가·수정할 때

1. primitive 에 값을 두고 semantic 에서 참조한다. semantic 에 hex 를 쓰지 않는다.
2. 색 토큰은 라이트 블록과 `@media` 다크 블록 둘 다에 쓴다.
3. 이름을 없앨 때는 `css/deprecated.css` 에 새 이름을 가리키는 별칭을 남긴다. [설계 철학](/philosophy#이름-변경-금지-별칭-한-버전) 참고.
4. `npm run build && npm run check`.
5. `CHANGELOG.md` 에 적는다. `docs/reference/tokens.md` 는 `docs:build` 가 다시 생성한다.

## 문서 사이트

VitePress. `docs/` 아래 마크다운이 소스이고 `docs/reference/tokens.md` 만 `scripts/docs-tokens.mjs` 가 생성한다. `main` 에 push 하면 `.github/workflows/docs.yml` 이 GitHub Pages 에 배포한다.
