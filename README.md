# @newtil/design-tokens

newtil 생태계가 공유하는 **CSS 디자인 토큰(변수)** 패키지.

색상, 간격(spacing), 사이즈, 그림자, 타이포그래피 등 모든 디자인 결정의 단일 진실 공급원(single source of truth).

## 설계 철학

이 패키지는 newtil 디자인 시스템의 **기반(foundation)** 입니다.

- `@newtil/ui` — 컴포넌트가 이 토큰을 참조함
- `@newtil/css` — utility 클래스가 이 토큰을 참조함

사용자는 이 토큰만 재정의하면 두 패키지의 모든 컴포넌트·유틸이 일관되게 변합니다.

## 설치

```bash
npm install @newtil/design-tokens
```

## 사용

```css
@import "@newtil/design-tokens";
```

이렇게 하면 `:root`에 모든 CSS 변수가 정의됩니다.

## 구조 — 2-레이어

- **Primitive** (`--_*` prefix): raw 값의 저장소. 내부용.
  - `--_scale-*` (길이 계단)
  - `--_hue-{name}-{shade}` (색상 팔레트)
  - `--_radius-scale-*`, `--_font-scale-*`, `--_shadow-elev-*`
- **Semantic**: 역할 기반. 사용자·컴포넌트가 쓰는 토큰.
  - Brand: `--color-primary`, `--color-secondary`, `--color-tertiary` (각 `-hover`/`-active`/`-subtle`/`-on-*`)
  - Status: `--color-success`, `--color-warning`, `--color-danger` (동일 패턴)
  - Surface/Text/Border: 역할 기반 (`--color-surface`, `--color-text`, `--color-border` 등)
  - 전경색: `--color-on-primary` 등 (Material Design `on-` prefix 관례)
  - `--space-*`, `--size-*`, `--radius-*`, `--border-width-*`
  - `--font-size-*` (역할 `body/heading-*` + 스케일 `sm/md/lg/xl` 둘 다)
  - `--z-*`, `--opacity-*`, `--shadow-*`, `--duration-*`, `--ease-*`

## 카테고리별 Import

특정 카테고리만 필요하면:

```css
@import "@newtil/design-tokens/semantic/color.css";
@import "@newtil/design-tokens/semantic/spacing.css";
```

## 커스터마이징

Semantic 오버라이드 (권장):

```css
@import "@newtil/design-tokens";

:root {
	--color-primary: #ff6b00;
	--space-4: 1.25rem;
}
```

Primitive 오버라이드 (고급 — 팔레트 전체 교체):

```css
:root {
	--_hue-green-500: #8cba35;
	--_hue-green-600: #6e9528;
	/* ... */
}
```

## 다크모드

- **시스템 자동**: `@media (prefers-color-scheme: dark)` 자동 반영 — 별도 코드 불필요.
- **수동 강제**: `<html data-theme="dark">` 또는 `<html data-theme="light">`.

## 출처

이 패키지는 `@newtil/css@0.4.0`에서 분리되어 나왔습니다.
원본 commit: `2f5cc313c563222ddfb7231b780cce6a384dabd9`

## 라이선스

MIT
