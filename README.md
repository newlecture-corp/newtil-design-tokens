# @newtil/design-tokens

newtil 패밀리가 공유하는 CSS 디자인 토큰(변수) — 색·간격·글꼴·모서리·그림자·층.

모든 newtil 패키지의 바닥이다. `@newtil/css`, `@newtil/components`, `@newtil/materials`, `@newtil/editor`, `@newtil/drawing` 은 자기 값을 갖지 않고 이 토큰만 참조한다. 2-레이어(primitive `--_*` = 값의 원본, semantic = 역할 이름)로 정의하며 다크모드가 기본 내장되어 색 토큰은 반드시 라이트·다크 두 값을 가진다. 사용자는 **색만** 정하면 나머지는 위에 선 패키지들이 일관되게 처리한다.

## 설치

```bash
npm install @newtil/design-tokens
```

## 빠른 시작

```css
@import "@newtil/design-tokens";   /* = dist/tokens.css. 수동 테마 전환 포함 */
```

브랜드색은 씨앗 하나로 바꾼다. 램프(50~950)와 `--color-on-primary`(글자색) 가 계산되어 라이트·다크가 같이 따라온다.

```css
:root { --brand: #5c3d2e; }
```

특정 단계를 손으로 정하고 싶으면 그 단계를 hex 로 덮는다(`--_hue-green-100: #f2eae4;`). 계산식보다 우선한다.

다크모드는 아무것도 안 해도 OS 를 따른다. 수동 강제는 `<html data-theme="dark">` / `"light"`, 루트가 아닌 요소에 붙이면 그 부분만 바뀐다. 다른 import 방식(브라우저 `<link>`, 소스 카테고리별 import)과 semantic 직접 변경 규칙은 문서 참고.

## 문서

- 가이드: https://newlecture-corp.github.io/newtil-design-tokens/
- 토큰 레퍼런스: https://newlecture-corp.github.io/newtil-design-tokens/reference/tokens
- 변경 기록: [CHANGELOG.md](./CHANGELOG.md)

## 토큰 한눈에

semantic 140개. 전체 값은 토큰 레퍼런스에.

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

`tertiary` 는 역할 자리만 있고 값은 미정(현재 warning 과 동일). 표면 위 글자는 `text`, `on-` 은 유채색 역할 위에만 쓴다. 0.2.1 에서 제거된 이름(`--color-on-surface`, `--size-*`, `--font-size-xs…4xl` 등)은 `css/deprecated.css` 별칭으로 남아 있고 다음 minor 에서 삭제한다 — 문서의 마이그레이션 페이지 참고.

## newtil 패밀리

| 패키지 | 설명 | 문서 |
|---|---|---|
| [@newtil/design-tokens](https://www.npmjs.com/package/@newtil/design-tokens) | CSS 변수(토큰) — 색·간격·글꼴·모서리·그림자·층. 모든 패키지의 바닥 | https://newlecture-corp.github.io/newtil-design-tokens/ |
| [@newtil/css](https://www.npmjs.com/package/@newtil/css) | 실제 CSS 속성명 기반 유틸리티 클래스 + JIT | https://newlecture-corp.github.io/newtil-css/ |
| [@newtil/components](https://www.npmjs.com/package/@newtil/components) | n- 접두사 기본 컴포넌트 — prose·table·layout·resize-handle | https://newlecture-corp.github.io/newtil-components/ |
| [@newtil/materials](https://www.npmjs.com/package/@newtil/materials) | Material Design 3 구현 m3- 컴포넌트 | https://newlecture-corp.github.io/newtil-materials/ |
| [@newtil/editor](https://www.npmjs.com/package/@newtil/editor) | 마크다운↔HTML 양방향 편집기 웹 컴포넌트(React/Vue 래퍼) | https://newlecture-corp.github.io/newtil-editor/ |
| [@newtil/drawing](https://www.npmjs.com/package/@newtil/drawing) | 캡처 위에 화살표·상자·글자를 그리는 그림판(PNG+JSON) | https://newlecture-corp.github.io/newtil-drawing/ |

## 개발

```bash
npm run build         # css/ → dist/tokens.css ([data-theme="dark"] 사본 생성)
npm run check         # 미정의 참조·중복·라이트/다크 parity·hex·dist 동기·WCAG 대비
npm run docs:tokens   # css/ → docs/reference/tokens.md
npm run docs:dev      # 문서 개발 서버
npm run docs:build    # 문서 빌드
```

다크 값은 소스에 한 벌(`@media … { :root:not([data-theme="light"]) { … } }`)만 쓴다. 수동 강제 사본은 빌드가 만든다. `prepublishOnly` 가 build 와 check 를 돌리므로 검사에 걸리면 게시되지 않는다.

## 라이선스

MIT
