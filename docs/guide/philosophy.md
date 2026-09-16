# 설계 철학

## 사용자는 색만 정한다

이 패키지는 newtil 패밀리(`@newtil/css`, `@newtil/components`, `@newtil/materials`, `@newtil/editor`, `@newtil/drawing`)가 공유하는 모든 디자인 결정의 단일 출처다. 위에 선 패키지는 자기 값을 갖지 않고 이 토큰만 참조한다.

그래서 사용자가 정하는 것은 **색**뿐이다. 브랜드색 램프 하나를 바꾸면 모든 패키지의 버튼·링크·포커스 링이 함께 바뀌고, 간격·글꼴·모서리·그림자는 손대지 않아도 일관된다.

## 2-레이어: primitive → semantic

| 층 | 접두사 | 역할 | 누가 쓰나 |
|---|---|---|---|
| **primitive** | `--_` | 값의 원본. hue × shade 팔레트, 4px 길이 계단, 글꼴 계단, 그림자 계단 | 내부. 사용자는 [브랜드색 교체](/customizing) 때만 덮어쓴다 |
| **semantic** | 없음 | 역할 이름. `--color-primary`, `--space-5`, `--font-size-body` … | 컴포넌트·앱 코드 |

semantic 은 hex 를 직접 쓰지 않는다. `--color-primary: var(--_hue-green-500)` 처럼 반드시 primitive 를 참조한다. `scripts/check.mjs` 가 semantic 안의 hex 를 찾아 실패시킨다.

이 분리 덕에 값과 역할을 따로 바꿀 수 있다.

- 팔레트의 초록이 마음에 안 들면 `--_hue-green-500` 을 바꾼다. primary 를 쓰는 모든 곳이 따라온다.
- primary 를 초록이 아닌 파랑으로 옮기고 싶으면 `--color-primary` 를 `var(--_hue-blue-500)` 으로 바꾼다. 팔레트는 그대로다.

## 색 이름 규칙

`css/semantic/color.css` 의 규칙이다.

- **Brand**: `primary` / `secondary` / `tertiary`
- **Status**: `success` / `warning` / `danger` / `info`
- **역할 기반**: `surface` / `text` / `border` / `link` / `code` / `scrim` / `focus-ring`
- **상호작용 변형**: `-hover`, `-active`. 옅은 버전 `-subtle`. 비활성 `-disabled`
- **`on-` 접두사**: 유채색 역할 **위에** 올리는 글자·아이콘 (`--color-on-primary`, `--color-on-danger` …)
- **표면 위 글자는 `text`**: `--color-text`, `--color-text-muted`, `--color-text-subtle`. `on-surface` 는 쓰지 않는다 (0.2.1 에서 별칭으로 내려갔다)

`tertiary` 는 역할 자리만 있고 값은 미정이다. 현재 warning(amber) 과 완전히 같으므로 warning 대용으로 쓰면 안 된다.

## 이름 변경 금지, 별칭 한 버전

토큰 이름은 위 패키지들과 앱 코드가 그대로 참조하는 API 다. 한번 나간 이름은 바꾸지 않는다.

이름을 없애야 할 때는 이렇게 한다.

1. 새 이름을 추가한다.
2. 옛 이름은 `css/deprecated.css` 에 **새 이름을 가리키는 별칭**으로 내린다. 값은 같으니 소비자 코드가 깨지지 않는다.
3. 다음 minor 에서 별칭을 삭제한다.

0.2.1 이 이 규칙의 첫 적용이다. 이름 변경 0건, 별칭 강등만 있다. 목록은 [마이그레이션](/migration).

primitive 는 내부 번호라 이 규칙 밖이다. 0.2.1 에서 `--_font-scale-8` 이 48px 에서 40px 로 바뀌고 48px 는 `-9` 로 밀렸지만, semantic `--font-size-display` 는 그대로 48px 다.

## 숫자 스케일

길이·모서리·표면·불투명도·층은 이름 대신 **숫자**를 쓴다. 티셔츠명(sm, md, lg)은 사이에 단계를 끼워 넣을 수 없고, 무엇이 더 큰지 이름으로 알 수 없기 때문이다.

| 축 | 스케일 | 값 |
|---|---|---|
| `--space-N` | 0 … 14 | 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px (4px 그리드) |
| `--radius-N` | 0 … 6, `full` | 0, 2, 4, 8, 12, 16, 24px |
| `--border-width-N` | 0 … 4 | 0, 1, 2, 4, 8px |
| `--color-surface-N` | (없음), 1 … 4 | elevation. 다크에서는 높을수록 밝아진다 |
| `--opacity-N` | 0, 10, 20 … 100 | 10 단위 램프 |
| `--z-*` | 100 단위 | base 0, dropdown 100, sticky 200, fixed 250, overlay 300, modal 400, popover 500, toast 600, tooltip 700 |

예외 두 가지.

- **글꼴 크기**는 역할명이다: `caption` / `body-sm` / `body` / `body-lg` / `heading-sm` / `heading-md` / `heading-lg` / `heading-xl` / `display`. 글꼴은 "얼마나 큰가"보다 "어디에 쓰는가"가 먼저다.
- **그림자**는 `--shadow-{sm, md, lg, xl, 2xl}` 티셔츠명이 남아 있다. 숫자로 통일하는 것은 이름 변경이라 보류했다.

## 단위는 rem

길이·모서리·글꼴·그림자·선 굵기는 모두 rem 이다 (1rem = 16px 기본). 루트 `font-size` 를 바꾸면 시스템 전체가 비례 확대된다. 1px 선도 `0.0625rem` 이다.

## 설계 결정이 없는 값은 토큰이 아니다

`50%`, `100vw`, `auto`, `none` 같은 값은 디자인 결정이 아니라 CSS 값이다. 0.2.1 에서 `--size-1-2`, `--size-screen-w`, `--size-auto`, `--shadow-none` 등을 토큰에서 뺐다. 유틸 클래스(`w:1-2`, `h:screen-h`)는 `@newtil/css` 생성기가 리터럴로 만든다.
