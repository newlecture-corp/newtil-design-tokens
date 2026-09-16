# @newtil/design-tokens

newtil 생태계가 공유하는 **CSS 디자인 토큰(변수)** 패키지. 색·간격·글꼴·모서리·그림자·층 등 모든 디자인 결정의 단일 출처.

## 설계 철학

- 사용자는 **색만** 정한다. 나머지는 이 토큰 위에 선 패키지(`@newtil/css`, `@newtil/components`, `@newtil/materials`, `@newtil/editor`)가 일관되게 처리한다.
- 2-레이어: **primitive**(`--_*`, 값의 원본, 내부용) → **semantic**(역할 이름, 소비자가 쓰는 것). semantic 은 hex 를 직접 쓰지 않는다.
- 다크모드는 기본 내장. 색 토큰은 반드시 라이트·다크 두 값을 가진다 (`npm run check` 가 강제).

## 설치·사용

```bash
npm install @newtil/design-tokens
```

```css
@import "@newtil/design-tokens";            /* = dist/tokens.css. 수동 테마 전환 포함 */
```

브라우저에서 직접 쓰려면 `node_modules/@newtil/design-tokens/dist/tokens.css` 를 `<link>` 한다 (bare specifier 는 번들러가 필요).

소스를 카테고리별로 가져올 수도 있다. 단, 소스에는 `[data-theme="dark"]` 사본이 없어 **OS 다크만** 동작한다.

```css
@import "@newtil/design-tokens/semantic/color.css";
@import "@newtil/design-tokens/semantic/spacing.css";
```

## 토큰 목록 (semantic 140)

| 축 | 토큰 |
|---|---|
| 역할색 | `--color-{primary, secondary, tertiary, success, warning, danger, info}` 와 각각의 `-hover / -active / -subtle` |
| 역할색 위 글자 | `--color-on-{primary, secondary, tertiary, success, warning, danger, info}` |
| 표면 | `--color-surface`, `--color-surface-1 … 4`(elevation), `--color-surface-inverse`, `--color-surface-hover / -active / -disabled` |
| 글자 | `--color-text`, `--color-text-muted / -subtle / -inverse / -disabled` |
| 링크 | `--color-link`, `--color-link-hover` |
| 테두리 | `--color-border`, `--color-border-strong / -subtle` |
| 코드 상자 | `--color-code-bg / -fg / -border` |
| 가림막·포커스 | `--color-scrim`, `--color-focus-ring` |
| 간격·크기 | `--space-0 … 14` (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px) |
| 글꼴 크기 | `--font-size-{caption, body-sm, body, body-lg, heading-sm, heading-md, heading-lg, heading-xl, display}` (12 … 48px) |
| 글꼴 | `--font-family-{sans, mono}`, `--font-weight-{regular, medium, semibold, bold}`, `--line-height-{tight, normal, loose}`, `--letter-spacing-{tight, normal, wide}` |
| 모서리 | `--radius-0 … 6` (0 … 24px), `--radius-full` |
| 그림자 | `--shadow-{sm, md, lg, xl, 2xl}` |
| 선 굵기 | `--border-width-0 … 4` (0, 1, 2, 4, 8px) |
| 불투명도 | `--opacity-{0, 10, 20, …, 90, 100}` |
| 시간·가속 | `--duration-{fast, normal, slow}`, `--ease-{linear, in, out, in-out}` |
| 층 | `--z-{base, dropdown, sticky, fixed, overlay, modal, popover, toast, tooltip}` |

`tertiary` 는 역할 자리만 있고 값은 미정(현재 warning 과 동일). 표면 위 글자는 `text` 를 쓴다. `on-` 은 유채색 역할 위에만 쓴다.

### 제거된 이름 (`css/deprecated.css` 별칭, 다음 minor 에서 삭제)

`--color-on-surface(-inverse)` → `--color-text(-inverse)` · `--size-N` → `--space-N` · `--size-1-2` 등 분수·`--size-screen-*`·`--size-full/half/auto` → CSS 값 그대로 · `--font-size-xs…4xl` → 역할명 · `--shadow-none`, `--opacity-25/75`.

## 다크모드

- **시스템 자동**: 아무것도 안 해도 `prefers-color-scheme: dark` 를 따른다.
- **수동 강제**: `<html data-theme="dark">` 또는 `data-theme="light"`. 루트가 아닌 요소에 붙이면 그 부분만 바뀐다.
- 두 테마 모두 `color-scheme` 을 선언하므로 네이티브 폼·스크롤바도 따라온다.

## 커스터마이징

**브랜드색 교체 (권장)** — primitive 램프를 바꾼다. 라이트·다크가 같이 따라온다.

```css
@import "@newtil/design-tokens";

:root {
	--_hue-green-400: #9dd3ff;   /* 다크 primary */
	--_hue-green-500: #2f80ed;   /* 라이트 primary */
	--_hue-green-600: #1c6dd0;   /* hover */
	--_hue-green-700: #155aa8;   /* active */
	--_hue-green-100: #e3f0ff;   /* subtle */
}
```

**semantic 직접 변경** — 라이트·다크 셀렉터를 **둘 다** 써야 한다. `:root { --color-primary: … }` 하나만 쓰면 다크 블록(특이성 0,2,0)에 져서 다크에서 적용되지 않는다.

```css
:root, [data-theme="light"] { --color-link: #0b57d0; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --color-link: #a8c7fa; } }
[data-theme="dark"] { --color-link: #a8c7fa; }
```

테마와 무관한 토큰(`--space-*`, `--radius-*` 등)은 `:root` 한 줄로 충분하다.

## 개발

```bash
npm run build   # css/ → dist/tokens.css ([data-theme="dark"] 사본 생성)
npm run check   # 미정의 참조·중복·라이트/다크 parity·hex·dist 동기·WCAG 대비
```

다크 값은 소스에 한 벌(`@media … { :root:not([data-theme="light"]) { … } }`)만 쓴다. 수동 강제 사본은 빌드가 만든다. `prepublishOnly` 가 build 와 check 를 돌리므로 검사에 걸리면 게시되지 않는다.

## 라이선스

MIT
