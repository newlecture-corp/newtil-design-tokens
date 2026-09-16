import { defineConfig } from "vitepress";

const BASE_PATH = "/newtil-design-tokens/";

export default defineConfig({
	ignoreDeadLinks: true,
	base: BASE_PATH,
	title: "@newtil/design-tokens",
	description: "newtil 패밀리가 공유하는 CSS 디자인 토큰 — 색·간격·글꼴·모서리·그림자·층",
	appearance: true,
	lang: "ko",

	themeConfig: {
		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/newlecture-corp/newtil-design-tokens",
			},
		],

		search: {
			provider: "local",
		},

		nav: [
			{ text: "홈", link: "/" },
			{ text: "가이드", link: "/guide/getting-started" },
			{ text: "토큰 레퍼런스", link: "/reference/tokens" },
		],

		sidebar: [
			{
				text: "가이드",
				base: "/guide",
				items: [
					{ text: "시작하기", link: "/getting-started" },
					{ text: "설계 철학", link: "/philosophy" },
					{ text: "다크모드", link: "/dark-mode" },
					{ text: "커스터마이징", link: "/customizing" },
					{ text: "마이그레이션 (0.2.0 → 0.2.1)", link: "/migration" },
					{ text: "개발", link: "/development" },
				],
			},
			{
				text: "레퍼런스",
				base: "/reference",
				items: [{ text: "토큰 전체 목록", link: "/tokens" }],
			},
		],

		outline: {
			label: "목차",
		},

		footer: {
			copyright: "Copyright © 2026 newlecture",
		},
	},
});
