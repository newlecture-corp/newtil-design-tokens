# Changelog

## 0.2.5 (2026-09-18) — 밝은 primary 위의 글자·손잡이는 같은 색의 진한 색

- `--color-on-primary`: primary 가 밝을 때(l ≥ 0.62) 무채색 검정(#262626) 대신 **같은 색상의 진한 색**(l 0.22, 채도 60%)으로. 연두·주황 같은 밝은 씨앗에서 버튼 글자·스위치 손잡이·배지·FAB·체크 표시가 브랜드색과 따로 놀던 것을 고친다. 어두운 씨앗(#398526 기본값 등)은 전처럼 흰색. 대비는 모든 씨앗에서 4.5 이상(#5cb35a 6.4, #8cba35 7.4, #f97316 6.2).
- `check.mjs`: clamp 안의 calc, 여러 줄로 쓴 값도 계산한다.
- 소비자: materials 는 dist 에 토큰 사본을 넣으므로 다시 빌드·게시해야 반영된다.

## 0.2.4 (2026-09-17) — 기본 씨앗색

- 기본 `--brand` 를 `#8cba35`(연두) → `#398526`(초록)으로. 연두는 흰 글자 대비가 2.3 이라 on-primary 가 검정이 되어 "초록 바탕에 검은 글자" 버튼이 기본이었다. 새 씨앗은 흰 글자 대비 4.6(AA). 스위치 손잡이·배지 글자도 함께 흰색이 된다. 브랜드 테마를 쓰는 소비자(NCafe·뉴렉처)는 영향 없다.
- 다크 surface 관계 정정: `--color-surface`(카드) gray-900, `--color-surface-1`(바닥) gray-950. 전엔 반대라 카드가 바닥보다 어두운 구멍처럼 보였다.

## 0.2.3 (2026-09-17) — 브랜드 씨앗 `--brand`

- green 램프(`--_hue-green-50…950`)를 씨앗 `--brand` 하나에서 oklch 상대 색 문법으로 계산한다. 테마는 `:root { --brand: #5c3d2e; }` 한 줄. 계수는 기존 green 램프와 NCafe 갈색 램프에 맞춰 뽑아 기본색 변화는 ΔE_ok×100 ≤ 3(육안 식별 경계 안). 특정 단계는 hex 로 덮을 수 있다.
- `--color-on-primary` 가 primary 밝기로 자동 선택된다(l ≥ 0.62 진회색 `oklch(0.15 0 0)`, 아니면 흰색). 진한 브랜드에서 테마가 흰색을 따로 지정하던 것이 필요 없어졌다. 다크는 400 단계 기준으로 따로 계산된다.
- `scripts/check.mjs` 가 `oklch(from …)` 계산식을 브라우저와 같은 변환으로 hex 로 풀어 대비를 잰다.
- 이름 변경 없음. 램프·의미 토큰 이름은 그대로.

## 0.2.2 (2026-09-16) — 문서

- 문서 사이트 신설(vitepress, GitHub Pages): 시작하기·철학·다크모드·커스터마이징·마이그레이션·개발 가이드와 소스에서 생성하는 토큰 레퍼런스(`scripts/docs-tokens.mjs`). README 를 공통 골격(설치·빠른 시작·문서·패밀리 표)으로 재작성.

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
