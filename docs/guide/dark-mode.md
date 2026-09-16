# 다크모드

색 토큰은 반드시 라이트·다크 두 값을 가진다. `scripts/check.mjs` 가 parity 를 강제하므로 다크 값이 없는 `--color-*` 는 게시되지 않는다. 테마와 무관한 축(간격·글꼴·모서리·그림자·층 등)은 한 값이다.

## 세 가지 사용법

### 시스템 자동

아무것도 안 해도 `prefers-color-scheme: dark` 를 따른다.

### 수동 강제

루트에 `data-theme` 을 붙인다. OS 설정을 무시한다.

```html
<html data-theme="dark">   <!-- 항상 다크 -->
<html data-theme="light">  <!-- 항상 라이트 -->
```

속성을 빼면 다시 시스템 자동으로 돌아간다. 이 방식은 `dist/tokens.css` 에서만 동작한다 (아래 [소스 vs dist](#소스-vs-dist) 참고).

### 부분 테마

루트가 아닌 요소에 붙이면 그 요소와 자손만 바뀐다. 라이트 페이지 안의 다크 사이드바, 다크 페이지 안의 라이트 미리보기 같은 경우다.

```html
<body>
	<aside data-theme="dark">…</aside>   <!-- 이 안만 다크 -->
	<main>…</main>
</body>
```

## color-scheme

두 테마 모두 `color-scheme` 을 선언한다. 라이트 블록은 `color-scheme: light`, 다크 블록은 `color-scheme: dark`. 네이티브 폼 컨트롤·스크롤바·`<select>` 팝업이 토큰과 같은 테마를 따른다. 부분 테마 요소 안에서도 마찬가지다.

## 셀렉터 구조와 특이성

`css/semantic/color.css` 의 구조다.

```css
/* 라이트 한 벌 */
:root,
[data-theme="light"] {
	color-scheme: light;
	--color-primary: var(--_hue-green-500);
	…
}

/* 다크 한 벌 — 시스템 자동 */
@media (prefers-color-scheme: dark) {
	:root:not([data-theme="light"]) {
		color-scheme: dark;
		--color-primary: var(--_hue-green-400);
		…
	}
}
```

`dist/tokens.css` 에는 빌드가 다크 블록에서 복사한 사본이 바로 뒤에 하나 더 붙는다.

```css
/* 다크 — 수동 강제. build 가 위 블록에서 생성 */
[data-theme="dark"] {
	color-scheme: dark;
	--color-primary: var(--_hue-green-400);
	…
}
```

| 셀렉터 | 특이성 | 언제 적용되나 |
|---|---|---|
| `:root` | 0,1,0 | 항상 (기본 라이트) |
| `[data-theme="light"]` | 0,1,0 | 그 요소를 강제 라이트 |
| `:root:not([data-theme="light"])` (미디어 쿼리 안) | 0,2,0 | OS 다크이고 루트가 강제 라이트가 아닐 때 |
| `[data-theme="dark"]` (dist 전용) | 0,1,0 | 그 요소를 강제 다크 |

다크 자동 블록이 `:root:not([data-theme="light"])` 인 이유는 두 가지다.

- `:not()` 이 있어서 `<html data-theme="light">` 이면 OS 가 다크여도 라이트를 유지한다.
- 특이성이 0,2,0 이라 `:root` 한 줄로 쓴 소비자 오버라이드(0,1,0)에 지지 않는다. 그래서 semantic 색을 직접 바꿀 때는 라이트·다크 셀렉터를 둘 다 써야 한다. 예시는 [커스터마이징](/customizing).

## 소스 vs dist

| | 소스 (`css/`) | `dist/tokens.css` |
|---|---|---|
| 다크 값 | `@media` 블록 한 벌 | 같은 블록 + `[data-theme="dark"]` 사본 |
| 시스템 자동 | 동작 | 동작 |
| `data-theme="dark"` 수동 강제 | **동작 안 함** | 동작 |
| `data-theme="light"` 수동 강제 | 동작 | 동작 |
| 부분 테마 | `light` 만 | `light` / `dark` 모두 |

다크 값을 소스에 한 벌만 두는 이유는 두 벌을 손으로 맞추다 어긋나는 사고를 없애기 위해서다. `scripts/check.mjs` 는 소스에 `[data-theme="dark"]` 블록이 있으면 실패시키고, `dist/tokens.css` 가 `build()` 결과와 다르면 실패시킨다.

카테고리별 소스 import 는 [시작하기](/getting-started#_3-소스를-카테고리별로-import) 참고.

## deprecated 별칭과 부분 테마

`css/deprecated.css` 의 별칭은 `:root, [data-theme="light"], [data-theme="dark"]` 세 셀렉터에 정의된다. CSS 변수는 정의된 요소에서 값이 풀리므로, `:root` 에만 `--color-on-surface: var(--color-text)` 를 두면 부분 테마 요소 안에서도 루트의 `--color-text` 값으로 굳어 버린다. `[data-theme]` 요소에서 별칭을 다시 정의해 그 요소의 값을 따르게 한 것이다.
