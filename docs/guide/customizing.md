# 커스터마이징

오버라이드는 항상 토큰 `@import` **뒤에** 쓴다. 어느 층을 바꾸느냐에 따라 셀렉터가 다르다.

| 바꾸려는 것 | 셀렉터 | 이유 |
|---|---|---|
| 브랜드색 (primitive 램프) | `:root` 한 줄 | primitive 는 테마 블록 밖 `:root` 에만 있다 |
| semantic 색 (`--color-*`) | 라이트 1 + 다크 2 = 3 셀렉터 | 다크 블록 특이성이 0,2,0 |
| 테마 무관 토큰 (`--space-*`, `--radius-*` …) | `:root` 한 줄 | 다크 블록이 없다 |

## 브랜드색 교체 (권장)

씨앗 `--brand` 하나를 준다. 0.2.3 부터 green 램프(50~950)는 씨앗에서 oklch 로 계산되고, `--color-on-primary` 는 primary 의 밝기(l ≥ 0.62 면 진회색, 아니면 흰색)로 자동 선택된다. 라이트(500)·다크(400)·hover·active·subtle 이 모두 따라온다.

```css
@import "@newtil/design-tokens";

:root { --brand: #5c3d2e; }   /* NCafe 갈색 */
```

계산 규칙: 밝은 단계는 `l + (1 - l) × k`(50: 0.95 … 400: 0.4), 어두운 단계는 `l × k`(600: 0.86 … 950: 0.38), 채도는 단계별 계수(양 끝으로 갈수록 줄어든다), 색상(h)은 그대로. 계수는 손으로 고른 기존 램프 두 벌에 맞춰 뽑았다(ΔE_ok×100 ≤ 3). 브라우저의 상대 색 문법(`oklch(from …)`)을 쓰므로 Chrome 119 · Safari 16.4 · Firefox 128 이상이 필요하다.

특정 단계를 직접 정하고 싶으면 그 단계만 hex 로 덮는다. 계산식보다 우선한다.

```css
:root {
	--brand: #2f80ed;
	--_hue-green-100: #e3f0ff;   /* subtle 만 손으로 */
}
```

`css/semantic/color.css` 에서 primary 가 램프의 어느 단을 쓰는지는 다음과 같다.

| 토큰 | 라이트 | 다크 |
|---|---|---|
| `--color-primary` | `--_hue-green-500` (= `--brand`) | `--_hue-green-400` |
| `--color-primary-hover` | `--_hue-green-600` | `--_hue-green-300` |
| `--color-primary-active` | `--_hue-green-700` | `--_hue-green-200` |
| `--color-primary-subtle` | `--_hue-green-100` | `--_hue-green-900` |
| `--color-on-primary` | primary 밝기로 자동 | primary 밝기로 자동 |

같은 방식으로 `--_hue-blue-*` 는 secondary·link·focus-ring, `--_hue-red-*` 는 danger, `--_hue-amber-*` 는 warning(과 tertiary), `--_hue-emerald-*` 는 success, `--_hue-sky-*` 는 info, `--_hue-gray-*` 는 surface·text·border 를 움직인다.

::: tip 대비 확인
`--color-on-primary` 는 자동이지만 hover·active 단계 위의 글자, 그리고 `--brand` 가 중간 밝기(l 0.55~0.7)일 때는 대비가 3.0 근처가 될 수 있다. 이 패키지의 `npm run check` 는 소스만 검사하므로 소비자 오버라이드는 직접 확인해야 한다. 기준은 on-X 대 X ≥ 3.0, text 대 surface ≥ 4.5.
:::

## 램프를 바꿨으면 `on-*` 도 확인한다

`--color-on-primary`, `--color-on-secondary` 같은 전경색은 램프에서 계산되지 않는 **고정값**이다. 기본값은 밝은 primary(연두 `#8cba35`)를 전제로 라이트·다크 모두 `gray-950`(검정)이다.

primary 램프를 진한 색(갈색·남색 등)으로 바꾸면 라이트 `on-primary` 를 흰색으로 함께 정해야 한다. 안 하면 진한 버튼 위에 검정 글자가 뜬다.

```css
:root {
  --_hue-green-500: #5c3d2e;   /* 진한 갈색 primary */
  --_hue-green-600: #462d21;
  --_hue-green-700: #35211a;
}
:root, [data-theme="light"] { --color-on-primary: #ffffff; }
/* 다크 primary(400)가 여전히 밝다면 다크 on-primary 는 기본(검정) 그대로 */
```

`npm run check` 는 패키지 기본값의 `on-X` 대 `X` 대비만 잰다. 사용자 오버라이드는 검사 밖이므로 램프를 바꾼 뒤 버튼 하나를 눈으로 확인하는 것이 가장 빠르다.

## semantic 직접 변경 — 3 셀렉터

역할의 값을 팔레트 밖 색으로 바꾸거나 다른 램프로 옮길 때다. 라이트 한 벌과 다크 두 벌(시스템 자동 + 수동 강제)을 **모두** 써야 한다.

```css
@import "@newtil/design-tokens";

/* 라이트 */
:root,
[data-theme="light"] {
	--color-link: #0b57d0;
}

/* 다크 — 시스템 자동 */
@media (prefers-color-scheme: dark) {
	:root:not([data-theme="light"]) {
		--color-link: #a8c7fa;
	}
}

/* 다크 — 수동 강제 (dist/tokens.css 를 쓸 때) */
[data-theme="dark"] {
	--color-link: #a8c7fa;
}
```

::: danger `:root` 한 줄로는 다크에서 적용되지 않는다
`:root { --color-link: #0b57d0; }` 만 쓰면 라이트에서는 먹지만, OS 다크에서는 토큰의 다크 블록 `:root:not([data-theme="light"])`(특이성 0,2,0)이 `:root`(0,1,0)를 이겨 원래 다크 값이 남는다. 구조는 [다크모드](/dark-mode#셀렉터-구조와-특이성) 참고.
:::

팔레트 안에서 옮기는 것이라면 hex 대신 primitive 를 참조하는 편이 낫다. 나중에 램프를 바꿔도 같이 따라온다.

```css
:root,
[data-theme="light"] {
	--color-primary: var(--_hue-blue-600);
	--color-on-primary: var(--_hue-white);
}
@media (prefers-color-scheme: dark) {
	:root:not([data-theme="light"]) {
		--color-primary: var(--_hue-blue-400);
		--color-on-primary: var(--_hue-gray-950);
	}
}
[data-theme="dark"] {
	--color-primary: var(--_hue-blue-400);
	--color-on-primary: var(--_hue-gray-950);
}
```

## 테마 무관 토큰 — `:root` 한 줄

간격·모서리·글꼴·그림자·선 굵기·불투명도·시간·층은 다크 블록이 없다. `:root` 한 줄이면 된다.

```css
:root {
	--radius-3: 0.375rem;                       /* 카드 모서리를 8px → 6px 로 */
	--font-family-sans: "Pretendard", system-ui, sans-serif;
	--duration-normal: 200ms;
}
```

`--font-family-sans` / `--font-family-mono` 는 시스템 스택 기본값이며 호스트가 덮어쓰는 것을 전제로 한다.

## 부분 테마 안에서의 오버라이드

`data-theme` 을 루트 외 요소에 붙여 부분 테마를 만든 경우, 위 3 셀렉터 방식이 그대로 그 요소에도 적용된다. `[data-theme="dark"]` 셀렉터가 요소를 가리지 않기 때문이다. 특정 영역만 바꾸려면 셀렉터를 좁힌다.

```css
aside[data-theme="dark"] {
	--color-surface: var(--_hue-gray-900);
}
```
