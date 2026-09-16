# 시작하기

## 설치

```bash
npm install @newtil/design-tokens
```

패키지에는 소스(`css/`)와 빌드 결과(`dist/tokens.css`)가 함께 들어 있다. 기본 export 는 `dist/tokens.css` 다.

## import 방식 3가지

### 1. 번들러 bare import (기본)

```css
@import "@newtil/design-tokens";
```

`dist/tokens.css` 가 들어온다. primitive → semantic → deprecated 별칭 순서로 이어 붙인 한 파일이며, 수동 테마 전환용 `[data-theme="dark"]` 사본까지 포함한다. Vite·webpack 등 bare specifier 를 해석하는 번들러가 필요하다. `@import "@newtil/design-tokens/tokens.css"` 도 같은 파일이다.

### 2. 브라우저 `<link>`

번들러 없이 쓰려면 `node_modules` 안의 파일 경로를 직접 링크한다.

```html
<link rel="stylesheet" href="node_modules/@newtil/design-tokens/dist/tokens.css">
```

### 3. 소스를 카테고리별로 import

`exports` 에 `./primitive/*`, `./semantic/*` 가 열려 있어 필요한 축만 가져올 수 있다.

```css
@import "@newtil/design-tokens/primitive/hue.css";
@import "@newtil/design-tokens/semantic/color.css";
@import "@newtil/design-tokens/primitive/scale.css";
@import "@newtil/design-tokens/semantic/spacing.css";
```

::: warning 소스 import 는 OS 다크만 동작한다
소스에는 다크 값이 `@media (prefers-color-scheme: dark)` 블록 한 벌만 있다. 수동 강제용 `[data-theme="dark"]` 사본은 `scripts/build.mjs` 가 만들어 `dist/tokens.css` 에만 넣는다. `data-theme` 으로 테마를 전환해야 하면 방식 1 또는 2 를 쓴다. 자세한 구조는 [다크모드](/dark-mode) 참고.
:::

semantic 파일은 primitive 를 참조하므로 짝이 되는 primitive 파일을 함께 가져와야 값이 풀린다.

| semantic | 참조하는 primitive |
|---|---|
| `semantic/color.css` | `primitive/hue.css` |
| `semantic/spacing.css` | `primitive/scale.css` |
| `semantic/radius.css` | `primitive/radius-scale.css` |
| `semantic/typography.css` | `primitive/font-scale.css` |
| `semantic/shadow.css` | `primitive/shadow-elev.css` |
| `semantic/border.css`, `opacity.css`, `transition.css`, `z-index.css` | 없음 (자체 값) |

소스 전체를 `@import` 묶음으로 가져오는 진입점 `@newtil/design-tokens/index.css` 도 있다. 이 역시 소스이므로 OS 다크만 동작한다.

## 첫 사용

```css
.card {
	background: var(--color-surface-1);
	color: var(--color-text);
	border: var(--border-width-1) solid var(--color-border);
	border-radius: var(--radius-3);
	padding: var(--space-5);
	box-shadow: var(--shadow-sm);
	font-size: var(--font-size-body);
}

.card:hover {
	background: var(--color-surface-hover);
}
```

`--_` 로 시작하는 primitive 는 직접 쓰지 않는다. 컴포넌트·앱 코드에서는 semantic 토큰만 쓴다. 전체 목록은 [토큰 레퍼런스](/reference/tokens).

## 다음 단계

- 브랜드색을 바꾸려면 [커스터마이징](/customizing)
- 0.2.0 에서 올라왔다면 [마이그레이션](/migration)
