# 마이그레이션 0.2.0 → 0.2.1

0.2.1 은 **이름 변경 0건**이다. 제거된 이름은 전부 `css/deprecated.css` 에 새 이름을 가리키는 별칭으로 남아 있어 코드를 고치지 않아도 값은 같다. 별칭은 **다음 minor 에서 삭제**하므로 그 전에 새 이름으로 옮긴다.

`dist/tokens.css` 와 `index.css` 에는 별칭이 포함된다. 소스를 카테고리별로 import 하는 경우에만 `@newtil/design-tokens/deprecated.css` 를 따로 가져와야 별칭이 붙는다.

## 별칭 표 (옛 이름 → 새 이름)

### 표면 위 글자

`on-` 은 유채색 역할 위 글자에만 쓴다. 표면 위 글자는 `text`. 라이트·다크 모두 같은 값이었다.

| 옛 이름 | 새 이름 |
|---|---|
| `--color-on-surface` | `--color-text` |
| `--color-on-surface-inverse` | `--color-text-inverse` |

### 크기 → 간격

`--size-N` 과 `--space-N` 은 같은 primitive(`--_scale-N`)를 가리켰다.

| 옛 이름 | 새 이름 |
|---|---|
| `--size-0` … `--size-14` | `--space-0` … `--space-14` (같은 번호) |

### 분수·뷰포트·키워드 → CSS 값

설계 결정이 없는 CSS 값이라 토큰에서 뺐다. 별칭의 값이 곧 대체 리터럴이다. 유틸 클래스는 `@newtil/css` 생성기가 리터럴로 만든다.

| 옛 이름 | 대체 값 |
|---|---|
| `--size-1-2` | `50%` |
| `--size-1-3` | `33.333333%` |
| `--size-2-3` | `66.666667%` |
| `--size-1-4` | `25%` |
| `--size-3-4` | `75%` |
| `--size-1-5` | `20%` |
| `--size-2-5` | `40%` |
| `--size-3-5` | `60%` |
| `--size-4-5` | `80%` |
| `--size-1-6` | `16.666667%` |
| `--size-5-6` | `83.333333%` |
| `--size-1-12` | `8.333333%` |
| `--size-5-12` | `41.666667%` |
| `--size-7-12` | `58.333333%` |
| `--size-11-12` | `91.666667%` |
| `--size-screen-w-25` | `25vw` |
| `--size-screen-w-50` | `50vw` |
| `--size-screen-w-75` | `75vw` |
| `--size-screen-w` | `100vw` |
| `--size-screen-h-25` | `25vh` |
| `--size-screen-h-50` | `50vh` |
| `--size-screen-h-75` | `75vh` |
| `--size-screen-h` | `100vh` |
| `--size-full` | `100%` |
| `--size-half` | `50%` |
| `--size-auto` | `auto` |

### 글꼴 크기 티셔츠명 → 역할명

같은 값의 두 번째 이름이었다. 역할명 한 벌만 남긴다.

| 옛 이름 | 새 이름 | 값 |
|---|---|---|
| `--font-size-xs` | `--font-size-caption` | 12px |
| `--font-size-sm` | `--font-size-body-sm` | 14px |
| `--font-size-md` | `--font-size-body` | 16px |
| `--font-size-lg` | `--font-size-body-lg` | 18px |
| `--font-size-xl` | `--font-size-heading-sm` | 20px |
| `--font-size-2xl` | `--font-size-heading-md` | 24px |
| `--font-size-3xl` | `--font-size-heading-lg` | 32px |
| `--font-size-4xl` | `--font-size-display` | 48px |

### CSS 값

| 옛 이름 | 대체 값 |
|---|---|
| `--shadow-none` | `none` |
| `--opacity-25` | `0.25` (램프는 10 단위 — `--opacity-20` / `--opacity-30`) |
| `--opacity-75` | `0.75` (`--opacity-70` / `--opacity-80`) |

## 값이 바뀐 토큰 3개

이름은 그대로지만 렌더링 결과가 달라진다. WCAG 대비 미달을 고친 것이다.

| 토큰 | 테마 | 0.2.0 | 0.2.1 | 대비 |
|---|---|---|---|---|
| `--color-on-primary` | 라이트 | 흰색 | `--_hue-gray-950` | 2.29 → 8.5 |
| `--color-on-success` | 라이트 | 흰색 | `--_hue-gray-950` | 2.54 → 7.8 |
| `--color-text-subtle` | 라이트 | `--_hue-gray-400` | `--_hue-gray-500` | 2.52 → 4.75 |
| `--color-text-subtle` | 다크 | `--_hue-gray-600` | `--_hue-gray-500` | 2.53 → 4.17 |

primary·success 버튼 위 글자가 흰색에서 검정으로 바뀐다. 흰 글자를 유지하려면 [semantic 직접 변경](/customizing#semantic-직접-변경-—-3-셀렉터)으로 되돌리되 대비를 확인한다.

## 추가된 토큰 19개

| 축 | 토큰 |
|---|---|
| 표면 상태 | `--color-surface-hover`, `--color-surface-active`, `--color-surface-disabled` |
| 글자 | `--color-text-disabled` |
| 링크 | `--color-link`, `--color-link-hover` |
| 코드 상자 | `--color-code-bg`, `--color-code-fg`, `--color-code-border` |
| 가림막 | `--color-scrim` |
| Info | `--color-info`, `--color-info-hover`, `--color-info-active`, `--color-info-subtle`, `--color-on-info` (새 primitive 램프 `--_hue-sky-*`) |
| 글꼴 | `--font-size-heading-xl` (40px), `--font-family-sans`, `--font-family-mono` |
| 층 | `--z-fixed` (250 — sticky 위, overlay 아래) |

## 구조 변경 (소비자 영향)

- 다크 값이 소스에 한 벌만 남았다. 소스를 직접 import 하면 `data-theme="dark"` 수동 강제가 동작하지 않는다. `dist/tokens.css`(기본 export)를 쓴다. [다크모드](/dark-mode#소스-vs-dist) 참고.
- 두 테마 모두 `color-scheme` 을 선언한다. 네이티브 폼·스크롤바 색이 바뀔 수 있다.
- primitive `--_font-scale-8` 이 48px 에서 40px 로 바뀌고 48px 는 `--_font-scale-9` 가 됐다. primitive 를 직접 참조하던 코드만 영향받는다.
- primitive 에 `--_hue-white` 가 생겼다. semantic 의 `#ffffff` 는 전부 이것을 참조한다.

전체 변경 기록은 저장소의 `CHANGELOG.md`.
