# Changelog

## 0.2.1 (2026-09-16) — 토큰 정리

이름 변경 없음. 제거된 이름은 전부 `css/deprecated.css` 별칭으로 남아 있고 다음 minor 에서 삭제한다.

### 구조
- 다크 값은 소스에 한 벌만 둔다: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`. 수동 강제용 `[data-theme="dark"]` 사본은 `scripts/build.mjs` 가 생성해 `dist/tokens.css` 에만 넣는다. 라이트는 `:root, [data-theme="light"]` 한 벌.
- 두 테마 모두 `color-scheme` 을 선언한다 (네이티브 폼·스크롤바가 테마를 따른다).
- `scripts/check.mjs` 추가: 미정의 참조, 중복 정의, 라이트·다크 parity, semantic 의 hex 직접 사용, dist 동기, WCAG 대비. `prepublishOnly` 가 build + check 를 돈다.
- primitive 에 `--_hue-white` 를 두고 semantic 의 `#ffffff` 를 전부 그것으로 바꿨다.

### 제거 (별칭으로 강등)
- `--color-on-surface`, `--color-on-surface-inverse` → `--color-text`, `--color-text-inverse` (라이트·다크 모두 같은 값이었다). 규칙: `on-` 은 유채색 역할 위 글자에만, 표면 위 글자는 `text`.
- `--size-0 … 14` → `--space-0 … 14` (같은 primitive).
- `--size-1-2 … 11-12`, `--size-screen-*`, `--size-full / half / auto` — 설계 결정이 없는 CSS 값. `@newtil/css` 생성기 리터럴로 이동.
- `--font-size-xs … 4xl` → 역할명 `caption / body-sm / body / body-lg / heading-sm / heading-md / heading-lg / display`.
- `--shadow-none`, `--opacity-25`, `--opacity-75`.

### 값 수정
- `--color-on-primary`, `--color-on-success` 라이트: 흰색 → gray-950 (대비 2.29 / 2.54 → 8.5 / 7.8).
- `--color-text-subtle`: 라이트 gray-400 → gray-500 (2.52 → 4.75), 다크 gray-600 → gray-500 (2.53 → 4.17).

### 추가
- 색: `--color-surface-hover / -active / -disabled`, `--color-text-disabled`, `--color-link / -hover`, `--color-code-bg / -fg / -border`, `--color-scrim`, `--color-info / -hover / -active / -subtle`, `--color-on-info`. info 는 새 primitive 램프 `--_hue-sky-*`.
- 글꼴: `--font-size-heading-xl`(40px; primitive `--_font-scale-8`, display 는 9 로 이동), `--font-family-sans / -mono`.
- 층: `--z-fixed`(250).

### 유지·미정
- `--color-tertiary-*` 는 warning 과 같은 값인 채로 둔다. 역할 자리는 유효하고 값만 미정.
- `--shadow-sm…2xl` 티셔츠명은 그대로 (숫자 통일은 이름 변경).
