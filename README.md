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

또는

```css
@import "@newtil/design-tokens/variables.css";
```

이렇게 하면 `:root`에 모든 CSS 변수가 정의됩니다.

## 커스터마이징

본인 프로젝트의 CSS에서 변수를 재정의:

```css
@import "@newtil/design-tokens";

:root {
	--color-main-1: #ff6b00;
	--space-4: 1.25rem;
}
```

## 출처

이 패키지는 `@newtil/css@0.4.0`에서 분리되어 나왔습니다.
원본 commit: `2f5cc313c563222ddfb7231b780cce6a384dabd9`

## 라이선스

MIT
