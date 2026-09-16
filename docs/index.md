---
layout: home
hero:
  name: "@newtil/design-tokens"
  text: "newtil 패밀리의 바닥"
  tagline: 색·간격·글꼴·모서리·그림자·층을 CSS 변수 한 벌로. 다크모드 내장. 사용자는 색만 정한다.
  actions:
    - theme: brand
      text: 시작하기
      link: /guide/getting-started
    - theme: alt
      text: 토큰 레퍼런스
      link: /reference/tokens
    - theme: alt
      text: GitHub
      link: https://github.com/newlecture-corp/newtil-design-tokens
features:
  - title: 2-레이어 토큰
    details: primitive(--_*) 는 값의 원본, semantic 은 역할 이름. semantic 은 hex 를 직접 쓰지 않는다. 브랜드색은 primitive 램프 한 곳만 바꾸면 라이트·다크가 같이 따라온다.
  - title: 다크모드 내장
    details: 아무것도 안 해도 OS 다크를 따른다. data-theme="dark" / "light" 로 수동 강제, 루트가 아닌 요소에 붙이면 부분 테마. 두 테마 모두 color-scheme 을 선언해 네이티브 폼·스크롤바도 따라온다.
  - title: 검사로 지키는 정합성
    details: 미정의 참조·중복·라이트/다크 parity·semantic 의 hex 사용·dist 동기·WCAG 대비를 npm run check 가 검사한다. 검사에 걸리면 게시되지 않는다.
---

## 가이드

- [시작하기](/guide/getting-started) — 설치, import 방식 3가지
- [설계 철학](/guide/philosophy) — 2-레이어, 이름 규칙, 숫자 스케일
- [다크모드](/guide/dark-mode) — 자동·수동·부분 테마, 셀렉터 구조
- [커스터마이징](/guide/customizing) — 브랜드색 교체, semantic 직접 변경
- [마이그레이션](/guide/migration) — 0.2.0 → 0.2.1 별칭 표
- [개발](/guide/development) — build·check·docs 스크립트

## 레퍼런스

- [토큰 전체 목록](/reference/tokens) — 소스에서 생성한 카테고리별 표 (라이트·다크 값, 설명)
