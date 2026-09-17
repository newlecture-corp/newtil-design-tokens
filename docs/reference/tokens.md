---
outline: [2, 3]
---

<!-- scripts/docs-tokens.mjs 가 css/ 에서 생성한다. 직접 수정하지 마세요. -->

<style>
.tk-swatch { display: inline-block; width: 0.9em; height: 0.9em; border-radius: 3px; border: 1px solid rgba(128,128,128,0.45); vertical-align: -0.1em; }
.vp-doc table { font-size: 0.85em; }
.vp-doc td small code { font-size: 0.9em; opacity: 0.75; }
</style>

# 토큰 레퍼런스

`css/primitive` 와 `css/semantic` 소스에서 생성한 전체 목록이다. semantic 141개, primitive 114개.

- **값** 열은 참조(`var(--_…)`)를 끝까지 풀어 실제 hex·rem 을 보여준다. 참조로 정의된 토큰은 원래 참조를 작은 글씨로 함께 적었다.
- **다크 값** 열은 `@media (prefers-color-scheme: dark)` 블록의 값이다. 다크 블록이 없는 축(간격·글꼴·모서리 등)은 테마와 무관하게 한 값이다.
- `--_` 로 시작하는 primitive 는 내부 저장소다. 앱·컴포넌트 코드에서는 semantic 토큰을 쓰고, primitive 는 [브랜드색 교체](/guide/customizing) 때만 덮어쓴다.
- 제거된 옛 이름의 별칭은 [마이그레이션](/guide/migration)에 있다.

# Semantic

## Spacing — 간격·크기

소스: `css/semantic/spacing.css` · 15개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--space-0` | `0`<br><small>`var(--_scale-0)`</small> | 0 |
| `--space-1` | `0.125rem`<br><small>`var(--_scale-1)`</small> | 2px |
| `--space-2` | `0.25rem`<br><small>`var(--_scale-2)`</small> | 4px |
| `--space-3` | `0.5rem`<br><small>`var(--_scale-3)`</small> | 8px |
| `--space-4` | `0.75rem`<br><small>`var(--_scale-4)`</small> | 12px |
| `--space-5` | `1rem`<br><small>`var(--_scale-5)`</small> | 16px |
| `--space-6` | `1.25rem`<br><small>`var(--_scale-6)`</small> | 20px |
| `--space-7` | `1.5rem`<br><small>`var(--_scale-7)`</small> | 24px |
| `--space-8` | `2rem`<br><small>`var(--_scale-8)`</small> | 32px |
| `--space-9` | `2.5rem`<br><small>`var(--_scale-9)`</small> | 40px |
| `--space-10` | `3rem`<br><small>`var(--_scale-10)`</small> | 48px |
| `--space-11` | `4rem`<br><small>`var(--_scale-11)`</small> | 64px |
| `--space-12` | `5rem`<br><small>`var(--_scale-12)`</small> | 80px |
| `--space-13` | `6rem`<br><small>`var(--_scale-13)`</small> | 96px |
| `--space-14` | `8rem`<br><small>`var(--_scale-14)`</small> | 128px |

## Color — 색

소스: `css/semantic/color.css` · 59개 (다크 값 59개)

### Brand — Primary

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-primary` | <span class="tk-swatch" style="background:#8cba35"></span> `#8cba35`<br><small>`var(--_hue-green-500)`</small> | `oklch(from #8cba35 calc(l + (1 - l) * 0.4)  calc(c * 1.1)  h)`<br><small>`var(--_hue-green-400)`</small> |  |
| `--color-primary-hover` | `oklch(from #8cba35 calc(l * 0.86) calc(c * 0.95) h)`<br><small>`var(--_hue-green-600)`</small> | `oklch(from #8cba35 calc(l + (1 - l) * 0.58) calc(c * 0.95) h)`<br><small>`var(--_hue-green-300)`</small> |  |
| `--color-primary-active` | `oklch(from #8cba35 calc(l * 0.71) calc(c * 0.75) h)`<br><small>`var(--_hue-green-700)`</small> | `oklch(from #8cba35 calc(l + (1 - l) * 0.75) calc(c * 0.7)  h)`<br><small>`var(--_hue-green-200)`</small> |  |
| `--color-primary-subtle` | `oklch(from #8cba35 calc(l + (1 - l) * 0.88) calc(c * 0.32) h)`<br><small>`var(--_hue-green-100)`</small> | `oklch(from #8cba35 calc(l * 0.55) calc(c * 0.58) h)`<br><small>`var(--_hue-green-900)`</small> |  |
| `--color-on-primary` | `oklch(from #8cba35 clamp(0.15, calc((0.62 - l) * 1000), 1) 0 0)`<br><small>`oklch(from var(--color-primary) clamp(0.15, calc((0.62 - l) * 1000), 1) 0 0)`</small> | `oklch(from oklch(from #8cba35 calc(l + (1 - l) * 0.4)  calc(c * 1.1)  h) clamp(0.15, calc((0.62 - l) * 1000), 1) 0 0)`<br><small>`oklch(from var(--color-primary) clamp(0.15, calc((0.62 - l) * 1000), 1) 0 0)`</small> |  |

### Brand — Secondary

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-secondary` | <span class="tk-swatch" style="background:#3b82f6"></span> `#3b82f6`<br><small>`var(--_hue-blue-500)`</small> | <span class="tk-swatch" style="background:#60a5fa"></span> `#60a5fa`<br><small>`var(--_hue-blue-400)`</small> |  |
| `--color-secondary-hover` | <span class="tk-swatch" style="background:#2563eb"></span> `#2563eb`<br><small>`var(--_hue-blue-600)`</small> | <span class="tk-swatch" style="background:#93c5fd"></span> `#93c5fd`<br><small>`var(--_hue-blue-300)`</small> |  |
| `--color-secondary-active` | <span class="tk-swatch" style="background:#1d4ed8"></span> `#1d4ed8`<br><small>`var(--_hue-blue-700)`</small> | <span class="tk-swatch" style="background:#bfdbfe"></span> `#bfdbfe`<br><small>`var(--_hue-blue-200)`</small> |  |
| `--color-secondary-subtle` | <span class="tk-swatch" style="background:#dbeafe"></span> `#dbeafe`<br><small>`var(--_hue-blue-100)`</small> | <span class="tk-swatch" style="background:#1e3a8a"></span> `#1e3a8a`<br><small>`var(--_hue-blue-900)`</small> |  |
| `--color-on-secondary` | <span class="tk-swatch" style="background:#ffffff"></span> `#ffffff`<br><small>`var(--_hue-white)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> | 대비 3.68 — 큰 글자 AA. 본문 AA 가 필요하면 secondary 를 600 으로 |

### Brand — Tertiary

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-tertiary` | <span class="tk-swatch" style="background:#f59e0b"></span> `#f59e0b`<br><small>`var(--_hue-amber-500)`</small> | <span class="tk-swatch" style="background:#fbbf24"></span> `#fbbf24`<br><small>`var(--_hue-amber-400)`</small> |  |
| `--color-tertiary-hover` | <span class="tk-swatch" style="background:#d97706"></span> `#d97706`<br><small>`var(--_hue-amber-600)`</small> | <span class="tk-swatch" style="background:#fcd34d"></span> `#fcd34d`<br><small>`var(--_hue-amber-300)`</small> |  |
| `--color-tertiary-active` | <span class="tk-swatch" style="background:#b45309"></span> `#b45309`<br><small>`var(--_hue-amber-700)`</small> | <span class="tk-swatch" style="background:#fde68a"></span> `#fde68a`<br><small>`var(--_hue-amber-200)`</small> |  |
| `--color-tertiary-subtle` | <span class="tk-swatch" style="background:#fef3c7"></span> `#fef3c7`<br><small>`var(--_hue-amber-100)`</small> | <span class="tk-swatch" style="background:#78350f"></span> `#78350f`<br><small>`var(--_hue-amber-900)`</small> |  |
| `--color-on-tertiary` | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> |  |

### Surface

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-surface` | <span class="tk-swatch" style="background:#ffffff"></span> `#ffffff`<br><small>`var(--_hue-white)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> |  |
| `--color-surface-1` | <span class="tk-swatch" style="background:#fafafa"></span> `#fafafa`<br><small>`var(--_hue-gray-50)`</small> | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> |  |
| `--color-surface-2` | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> | <span class="tk-swatch" style="background:#262626"></span> `#262626`<br><small>`var(--_hue-gray-800)`</small> |  |
| `--color-surface-3` | <span class="tk-swatch" style="background:#e5e5e5"></span> `#e5e5e5`<br><small>`var(--_hue-gray-200)`</small> | <span class="tk-swatch" style="background:#404040"></span> `#404040`<br><small>`var(--_hue-gray-700)`</small> |  |
| `--color-surface-4` | <span class="tk-swatch" style="background:#d4d4d4"></span> `#d4d4d4`<br><small>`var(--_hue-gray-300)`</small> | <span class="tk-swatch" style="background:#525252"></span> `#525252`<br><small>`var(--_hue-gray-600)`</small> |  |
| `--color-surface-inverse` | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> | <span class="tk-swatch" style="background:#fafafa"></span> `#fafafa`<br><small>`var(--_hue-gray-50)`</small> |  |
| `--color-surface-hover` | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> | <span class="tk-swatch" style="background:#262626"></span> `#262626`<br><small>`var(--_hue-gray-800)`</small> |  |
| `--color-surface-active` | <span class="tk-swatch" style="background:#e5e5e5"></span> `#e5e5e5`<br><small>`var(--_hue-gray-200)`</small> | <span class="tk-swatch" style="background:#404040"></span> `#404040`<br><small>`var(--_hue-gray-700)`</small> |  |
| `--color-surface-disabled` | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> | <span class="tk-swatch" style="background:#262626"></span> `#262626`<br><small>`var(--_hue-gray-800)`</small> |  |

### Text

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-text` | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> |  |
| `--color-text-muted` | <span class="tk-swatch" style="background:#525252"></span> `#525252`<br><small>`var(--_hue-gray-600)`</small> | <span class="tk-swatch" style="background:#a3a3a3"></span> `#a3a3a3`<br><small>`var(--_hue-gray-400)`</small> |  |
| `--color-text-subtle` | <span class="tk-swatch" style="background:#737373"></span> `#737373`<br><small>`var(--_hue-gray-500)`</small> | <span class="tk-swatch" style="background:#737373"></span> `#737373`<br><small>`var(--_hue-gray-500)`</small> | 0.2.1: 400(대비 2.52) → 500(4.75) / 다크: 0.2.1: 600(대비 2.53) → 500(4.17) |
| `--color-text-inverse` | <span class="tk-swatch" style="background:#ffffff"></span> `#ffffff`<br><small>`var(--_hue-white)`</small> | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> |  |
| `--color-text-disabled` | <span class="tk-swatch" style="background:#a3a3a3"></span> `#a3a3a3`<br><small>`var(--_hue-gray-400)`</small> | <span class="tk-swatch" style="background:#525252"></span> `#525252`<br><small>`var(--_hue-gray-600)`</small> |  |

### Link

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-link` | <span class="tk-swatch" style="background:#2563eb"></span> `#2563eb`<br><small>`var(--_hue-blue-600)`</small> | <span class="tk-swatch" style="background:#60a5fa"></span> `#60a5fa`<br><small>`var(--_hue-blue-400)`</small> | blue-500 은 흰 바탕 대비 3.68 로 본문 AA 미달 |
| `--color-link-hover` | <span class="tk-swatch" style="background:#1d4ed8"></span> `#1d4ed8`<br><small>`var(--_hue-blue-700)`</small> | <span class="tk-swatch" style="background:#93c5fd"></span> `#93c5fd`<br><small>`var(--_hue-blue-300)`</small> |  |

### Border

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-border` | <span class="tk-swatch" style="background:#e5e5e5"></span> `#e5e5e5`<br><small>`var(--_hue-gray-200)`</small> | <span class="tk-swatch" style="background:#262626"></span> `#262626`<br><small>`var(--_hue-gray-800)`</small> |  |
| `--color-border-strong` | <span class="tk-swatch" style="background:#a3a3a3"></span> `#a3a3a3`<br><small>`var(--_hue-gray-400)`</small> | <span class="tk-swatch" style="background:#525252"></span> `#525252`<br><small>`var(--_hue-gray-600)`</small> |  |
| `--color-border-subtle` | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> |  |

### Code

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-code-bg` | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> |  |
| `--color-code-fg` | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5`<br><small>`var(--_hue-gray-100)`</small> |  |
| `--color-code-border` | <span class="tk-swatch" style="background:#262626"></span> `#262626`<br><small>`var(--_hue-gray-800)`</small> | <span class="tk-swatch" style="background:#262626"></span> `#262626`<br><small>`var(--_hue-gray-800)`</small> |  |

### Scrim

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-scrim` | <span class="tk-swatch" style="background:color-mix(in srgb, #0a0a0a 32%, transparent)"></span> `color-mix(in srgb, #0a0a0a 32%, transparent)`<br><small>`color-mix(in srgb, var(--_hue-gray-950) 32%, transparent)`</small> | <span class="tk-swatch" style="background:color-mix(in srgb, #0a0a0a 60%, transparent)"></span> `color-mix(in srgb, #0a0a0a 60%, transparent)`<br><small>`color-mix(in srgb, var(--_hue-gray-950) 60%, transparent)`</small> |  |

### Status — Success

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-success` | <span class="tk-swatch" style="background:#10b981"></span> `#10b981`<br><small>`var(--_hue-emerald-500)`</small> | <span class="tk-swatch" style="background:#34d399"></span> `#34d399`<br><small>`var(--_hue-emerald-400)`</small> |  |
| `--color-success-hover` | <span class="tk-swatch" style="background:#059669"></span> `#059669`<br><small>`var(--_hue-emerald-600)`</small> | <span class="tk-swatch" style="background:#6ee7b7"></span> `#6ee7b7`<br><small>`var(--_hue-emerald-300)`</small> |  |
| `--color-success-active` | <span class="tk-swatch" style="background:#047857"></span> `#047857`<br><small>`var(--_hue-emerald-700)`</small> | <span class="tk-swatch" style="background:#a7f3d0"></span> `#a7f3d0`<br><small>`var(--_hue-emerald-200)`</small> |  |
| `--color-success-subtle` | <span class="tk-swatch" style="background:#d1fae5"></span> `#d1fae5`<br><small>`var(--_hue-emerald-100)`</small> | <span class="tk-swatch" style="background:#064e3b"></span> `#064e3b`<br><small>`var(--_hue-emerald-900)`</small> |  |
| `--color-on-success` | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> | 0.2.1: 흰색(대비 2.54) → 검정(7.8) |

### Status — Warning

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-warning` | <span class="tk-swatch" style="background:#f59e0b"></span> `#f59e0b`<br><small>`var(--_hue-amber-500)`</small> | <span class="tk-swatch" style="background:#fbbf24"></span> `#fbbf24`<br><small>`var(--_hue-amber-400)`</small> |  |
| `--color-warning-hover` | <span class="tk-swatch" style="background:#d97706"></span> `#d97706`<br><small>`var(--_hue-amber-600)`</small> | <span class="tk-swatch" style="background:#fcd34d"></span> `#fcd34d`<br><small>`var(--_hue-amber-300)`</small> |  |
| `--color-warning-active` | <span class="tk-swatch" style="background:#b45309"></span> `#b45309`<br><small>`var(--_hue-amber-700)`</small> | <span class="tk-swatch" style="background:#fde68a"></span> `#fde68a`<br><small>`var(--_hue-amber-200)`</small> |  |
| `--color-warning-subtle` | <span class="tk-swatch" style="background:#fef3c7"></span> `#fef3c7`<br><small>`var(--_hue-amber-100)`</small> | <span class="tk-swatch" style="background:#78350f"></span> `#78350f`<br><small>`var(--_hue-amber-900)`</small> |  |
| `--color-on-warning` | <span class="tk-swatch" style="background:#171717"></span> `#171717`<br><small>`var(--_hue-gray-900)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> |  |

### Status — Danger

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-danger` | <span class="tk-swatch" style="background:#ef4444"></span> `#ef4444`<br><small>`var(--_hue-red-500)`</small> | <span class="tk-swatch" style="background:#f87171"></span> `#f87171`<br><small>`var(--_hue-red-400)`</small> |  |
| `--color-danger-hover` | <span class="tk-swatch" style="background:#dc2626"></span> `#dc2626`<br><small>`var(--_hue-red-600)`</small> | <span class="tk-swatch" style="background:#fca5a5"></span> `#fca5a5`<br><small>`var(--_hue-red-300)`</small> |  |
| `--color-danger-active` | <span class="tk-swatch" style="background:#b91c1c"></span> `#b91c1c`<br><small>`var(--_hue-red-700)`</small> | <span class="tk-swatch" style="background:#fecaca"></span> `#fecaca`<br><small>`var(--_hue-red-200)`</small> |  |
| `--color-danger-subtle` | <span class="tk-swatch" style="background:#fee2e2"></span> `#fee2e2`<br><small>`var(--_hue-red-100)`</small> | <span class="tk-swatch" style="background:#7f1d1d"></span> `#7f1d1d`<br><small>`var(--_hue-red-900)`</small> |  |
| `--color-on-danger` | <span class="tk-swatch" style="background:#ffffff"></span> `#ffffff`<br><small>`var(--_hue-white)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> | 대비 3.76 — 큰 글자 AA |

### Status — Info

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-info` | <span class="tk-swatch" style="background:#0ea5e9"></span> `#0ea5e9`<br><small>`var(--_hue-sky-500)`</small> | <span class="tk-swatch" style="background:#38bdf8"></span> `#38bdf8`<br><small>`var(--_hue-sky-400)`</small> |  |
| `--color-info-hover` | <span class="tk-swatch" style="background:#0284c7"></span> `#0284c7`<br><small>`var(--_hue-sky-600)`</small> | <span class="tk-swatch" style="background:#7dd3fc"></span> `#7dd3fc`<br><small>`var(--_hue-sky-300)`</small> |  |
| `--color-info-active` | <span class="tk-swatch" style="background:#0369a1"></span> `#0369a1`<br><small>`var(--_hue-sky-700)`</small> | <span class="tk-swatch" style="background:#bae6fd"></span> `#bae6fd`<br><small>`var(--_hue-sky-200)`</small> |  |
| `--color-info-subtle` | <span class="tk-swatch" style="background:#e0f2fe"></span> `#e0f2fe`<br><small>`var(--_hue-sky-100)`</small> | <span class="tk-swatch" style="background:#0c4a6e"></span> `#0c4a6e`<br><small>`var(--_hue-sky-900)`</small> |  |
| `--color-on-info` | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a`<br><small>`var(--_hue-gray-950)`</small> |  |

### Focus ring

| 토큰 | 라이트 값 | 다크 값 | 설명 |
|---|---|---|---|
| `--color-focus-ring` | <span class="tk-swatch" style="background:#60a5fa"></span> `#60a5fa`<br><small>`var(--_hue-blue-400)`</small> | <span class="tk-swatch" style="background:#93c5fd"></span> `#93c5fd`<br><small>`var(--_hue-blue-300)`</small> |  |

## Radius — 모서리

소스: `css/semantic/radius.css` · 8개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--radius-0` | `0`<br><small>`var(--_radius-scale-0)`</small> |  |
| `--radius-1` | `0.125rem`<br><small>`var(--_radius-scale-1)`</small> |  |
| `--radius-2` | `0.25rem`<br><small>`var(--_radius-scale-2)`</small> |  |
| `--radius-3` | `0.5rem`<br><small>`var(--_radius-scale-3)`</small> |  |
| `--radius-4` | `0.75rem`<br><small>`var(--_radius-scale-4)`</small> |  |
| `--radius-5` | `1rem`<br><small>`var(--_radius-scale-5)`</small> |  |
| `--radius-6` | `1.5rem`<br><small>`var(--_radius-scale-6)`</small> |  |
| `--radius-full` | `9999px` |  |

## Border width — 선 굵기

소스: `css/semantic/border.css` · 5개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--border-width-0` | `0` |  |
| `--border-width-1` | `0.0625rem` | 1px |
| `--border-width-2` | `0.125rem` | 2px |
| `--border-width-3` | `0.25rem` | 4px |
| `--border-width-4` | `0.5rem` | 8px |

## Typography — 글꼴

소스: `css/semantic/typography.css` · 21개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--font-size-caption` | `0.75rem`<br><small>`var(--_font-scale-1)`</small> | 12px |
| `--font-size-body-sm` | `0.875rem`<br><small>`var(--_font-scale-2)`</small> | 14px |
| `--font-size-body` | `1rem`<br><small>`var(--_font-scale-3)`</small> | 16px |
| `--font-size-body-lg` | `1.125rem`<br><small>`var(--_font-scale-4)`</small> | 18px |
| `--font-size-heading-sm` | `1.25rem`<br><small>`var(--_font-scale-5)`</small> | 20px |
| `--font-size-heading-md` | `1.5rem`<br><small>`var(--_font-scale-6)`</small> | 24px |
| `--font-size-heading-lg` | `2rem`<br><small>`var(--_font-scale-7)`</small> | 32px |
| `--font-size-heading-xl` | `2.5rem`<br><small>`var(--_font-scale-8)`</small> | 40px |
| `--font-size-display` | `3rem`<br><small>`var(--_font-scale-9)`</small> | 48px |
| `--font-family-sans` | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif` |  |
| `--font-family-mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` |  |
| `--font-weight-regular` | `400` |  |
| `--font-weight-medium` | `500` |  |
| `--font-weight-semibold` | `600` |  |
| `--font-weight-bold` | `700` |  |
| `--line-height-tight` | `1.2` |  |
| `--line-height-normal` | `1.5` |  |
| `--line-height-loose` | `1.75` |  |
| `--letter-spacing-tight` | `-0.02em` |  |
| `--letter-spacing-normal` | `0` |  |
| `--letter-spacing-wide` | `0.02em` |  |

## Z-index — 층

소스: `css/semantic/z-index.css` · 9개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--z-base` | `0` |  |
| `--z-dropdown` | `100` |  |
| `--z-sticky` | `200` |  |
| `--z-fixed` | `250` |  |
| `--z-overlay` | `300` |  |
| `--z-modal` | `400` |  |
| `--z-popover` | `500` |  |
| `--z-toast` | `600` |  |
| `--z-tooltip` | `700` |  |

## Opacity — 불투명도

소스: `css/semantic/opacity.css` · 11개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--opacity-0` | `0` |  |
| `--opacity-10` | `0.1` |  |
| `--opacity-20` | `0.2` |  |
| `--opacity-30` | `0.3` |  |
| `--opacity-40` | `0.4` |  |
| `--opacity-50` | `0.5` |  |
| `--opacity-60` | `0.6` |  |
| `--opacity-70` | `0.7` |  |
| `--opacity-80` | `0.8` |  |
| `--opacity-90` | `0.9` |  |
| `--opacity-100` | `1` |  |

## Shadow — 그림자

소스: `css/semantic/shadow.css` · 5개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--shadow-sm` | `0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)`<br><small>`var(--_shadow-elev-1)`</small> |  |
| `--shadow-md` | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)`<br><small>`var(--_shadow-elev-2)`</small> |  |
| `--shadow-lg` | `0 0.25rem 0.5rem rgba(0, 0, 0, 0.12)`<br><small>`var(--_shadow-elev-3)`</small> |  |
| `--shadow-xl` | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`<br><small>`var(--_shadow-elev-4)`</small> |  |
| `--shadow-2xl` | `0 1rem 2rem rgba(0, 0, 0, 0.2)`<br><small>`var(--_shadow-elev-5)`</small> |  |

## Transition — 시간·가속

소스: `css/semantic/transition.css` · 7개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--duration-fast` | `150ms` |  |
| `--duration-normal` | `250ms` |  |
| `--duration-slow` | `400ms` |  |
| `--ease-linear` | `linear` |  |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |  |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |  |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |  |

# Primitive

## Scale — 길이 계단

소스: `css/primitive/scale.css` · 15개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--_scale-0` | `0` |  |
| `--_scale-1` | `0.125rem` | 2px |
| `--_scale-2` | `0.25rem` | 4px |
| `--_scale-3` | `0.5rem` | 8px |
| `--_scale-4` | `0.75rem` | 12px |
| `--_scale-5` | `1rem` | 16px |
| `--_scale-6` | `1.25rem` | 20px |
| `--_scale-7` | `1.5rem` | 24px |
| `--_scale-8` | `2rem` | 32px |
| `--_scale-9` | `2.5rem` | 40px |
| `--_scale-10` | `3rem` | 48px |
| `--_scale-11` | `4rem` | 64px |
| `--_scale-12` | `5rem` | 80px |
| `--_scale-13` | `6rem` | 96px |
| `--_scale-14` | `8rem` | 128px |

## Hue — 색상 팔레트

소스: `css/primitive/hue.css` · 79개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--_hue-gray-50` | <span class="tk-swatch" style="background:#fafafa"></span> `#fafafa` |  |
| `--_hue-gray-100` | <span class="tk-swatch" style="background:#f5f5f5"></span> `#f5f5f5` |  |
| `--_hue-gray-200` | <span class="tk-swatch" style="background:#e5e5e5"></span> `#e5e5e5` |  |
| `--_hue-gray-300` | <span class="tk-swatch" style="background:#d4d4d4"></span> `#d4d4d4` |  |
| `--_hue-gray-400` | <span class="tk-swatch" style="background:#a3a3a3"></span> `#a3a3a3` |  |
| `--_hue-gray-500` | <span class="tk-swatch" style="background:#737373"></span> `#737373` |  |
| `--_hue-gray-600` | <span class="tk-swatch" style="background:#525252"></span> `#525252` |  |
| `--_hue-gray-700` | <span class="tk-swatch" style="background:#404040"></span> `#404040` |  |
| `--_hue-gray-800` | <span class="tk-swatch" style="background:#262626"></span> `#262626` |  |
| `--_hue-gray-900` | <span class="tk-swatch" style="background:#171717"></span> `#171717` |  |
| `--_hue-gray-950` | <span class="tk-swatch" style="background:#0a0a0a"></span> `#0a0a0a` |  |
| `--brand` | <span class="tk-swatch" style="background:#8cba35"></span> `#8cba35` |  |
| `--_hue-green-50` | `oklch(from #8cba35 calc(l + (1 - l) * 0.95) calc(c * 0.2)  h)`<br><small>`oklch(from var(--brand) calc(l + (1 - l) * 0.95) calc(c * 0.2)  h)`</small> |  |
| `--_hue-green-100` | `oklch(from #8cba35 calc(l + (1 - l) * 0.88) calc(c * 0.32) h)`<br><small>`oklch(from var(--brand) calc(l + (1 - l) * 0.88) calc(c * 0.32) h)`</small> |  |
| `--_hue-green-200` | `oklch(from #8cba35 calc(l + (1 - l) * 0.75) calc(c * 0.7)  h)`<br><small>`oklch(from var(--brand) calc(l + (1 - l) * 0.75) calc(c * 0.7)  h)`</small> |  |
| `--_hue-green-300` | `oklch(from #8cba35 calc(l + (1 - l) * 0.58) calc(c * 0.95) h)`<br><small>`oklch(from var(--brand) calc(l + (1 - l) * 0.58) calc(c * 0.95) h)`</small> |  |
| `--_hue-green-400` | `oklch(from #8cba35 calc(l + (1 - l) * 0.4)  calc(c * 1.1)  h)`<br><small>`oklch(from var(--brand) calc(l + (1 - l) * 0.4)  calc(c * 1.1)  h)`</small> |  |
| `--_hue-green-500` | <span class="tk-swatch" style="background:#8cba35"></span> `#8cba35`<br><small>`var(--brand)`</small> |  |
| `--_hue-green-600` | `oklch(from #8cba35 calc(l * 0.86) calc(c * 0.95) h)`<br><small>`oklch(from var(--brand) calc(l * 0.86) calc(c * 0.95) h)`</small> |  |
| `--_hue-green-700` | `oklch(from #8cba35 calc(l * 0.71) calc(c * 0.75) h)`<br><small>`oklch(from var(--brand) calc(l * 0.71) calc(c * 0.75) h)`</small> |  |
| `--_hue-green-800` | `oklch(from #8cba35 calc(l * 0.62) calc(c * 0.65) h)`<br><small>`oklch(from var(--brand) calc(l * 0.62) calc(c * 0.65) h)`</small> |  |
| `--_hue-green-900` | `oklch(from #8cba35 calc(l * 0.55) calc(c * 0.58) h)`<br><small>`oklch(from var(--brand) calc(l * 0.55) calc(c * 0.58) h)`</small> |  |
| `--_hue-green-950` | `oklch(from #8cba35 calc(l * 0.38) calc(c * 0.4)  h)`<br><small>`oklch(from var(--brand) calc(l * 0.38) calc(c * 0.4)  h)`</small> |  |
| `--_hue-blue-50` | <span class="tk-swatch" style="background:#eff6ff"></span> `#eff6ff` |  |
| `--_hue-blue-100` | <span class="tk-swatch" style="background:#dbeafe"></span> `#dbeafe` |  |
| `--_hue-blue-200` | <span class="tk-swatch" style="background:#bfdbfe"></span> `#bfdbfe` |  |
| `--_hue-blue-300` | <span class="tk-swatch" style="background:#93c5fd"></span> `#93c5fd` |  |
| `--_hue-blue-400` | <span class="tk-swatch" style="background:#60a5fa"></span> `#60a5fa` |  |
| `--_hue-blue-500` | <span class="tk-swatch" style="background:#3b82f6"></span> `#3b82f6` |  |
| `--_hue-blue-600` | <span class="tk-swatch" style="background:#2563eb"></span> `#2563eb` |  |
| `--_hue-blue-700` | <span class="tk-swatch" style="background:#1d4ed8"></span> `#1d4ed8` |  |
| `--_hue-blue-800` | <span class="tk-swatch" style="background:#1e40af"></span> `#1e40af` |  |
| `--_hue-blue-900` | <span class="tk-swatch" style="background:#1e3a8a"></span> `#1e3a8a` |  |
| `--_hue-blue-950` | <span class="tk-swatch" style="background:#172554"></span> `#172554` |  |
| `--_hue-red-50` | <span class="tk-swatch" style="background:#fef2f2"></span> `#fef2f2` |  |
| `--_hue-red-100` | <span class="tk-swatch" style="background:#fee2e2"></span> `#fee2e2` |  |
| `--_hue-red-200` | <span class="tk-swatch" style="background:#fecaca"></span> `#fecaca` |  |
| `--_hue-red-300` | <span class="tk-swatch" style="background:#fca5a5"></span> `#fca5a5` |  |
| `--_hue-red-400` | <span class="tk-swatch" style="background:#f87171"></span> `#f87171` |  |
| `--_hue-red-500` | <span class="tk-swatch" style="background:#ef4444"></span> `#ef4444` |  |
| `--_hue-red-600` | <span class="tk-swatch" style="background:#dc2626"></span> `#dc2626` |  |
| `--_hue-red-700` | <span class="tk-swatch" style="background:#b91c1c"></span> `#b91c1c` |  |
| `--_hue-red-800` | <span class="tk-swatch" style="background:#991b1b"></span> `#991b1b` |  |
| `--_hue-red-900` | <span class="tk-swatch" style="background:#7f1d1d"></span> `#7f1d1d` |  |
| `--_hue-red-950` | <span class="tk-swatch" style="background:#450a0a"></span> `#450a0a` |  |
| `--_hue-amber-50` | <span class="tk-swatch" style="background:#fffbeb"></span> `#fffbeb` |  |
| `--_hue-amber-100` | <span class="tk-swatch" style="background:#fef3c7"></span> `#fef3c7` |  |
| `--_hue-amber-200` | <span class="tk-swatch" style="background:#fde68a"></span> `#fde68a` |  |
| `--_hue-amber-300` | <span class="tk-swatch" style="background:#fcd34d"></span> `#fcd34d` |  |
| `--_hue-amber-400` | <span class="tk-swatch" style="background:#fbbf24"></span> `#fbbf24` |  |
| `--_hue-amber-500` | <span class="tk-swatch" style="background:#f59e0b"></span> `#f59e0b` |  |
| `--_hue-amber-600` | <span class="tk-swatch" style="background:#d97706"></span> `#d97706` |  |
| `--_hue-amber-700` | <span class="tk-swatch" style="background:#b45309"></span> `#b45309` |  |
| `--_hue-amber-800` | <span class="tk-swatch" style="background:#92400e"></span> `#92400e` |  |
| `--_hue-amber-900` | <span class="tk-swatch" style="background:#78350f"></span> `#78350f` |  |
| `--_hue-amber-950` | <span class="tk-swatch" style="background:#451a03"></span> `#451a03` |  |
| `--_hue-emerald-50` | <span class="tk-swatch" style="background:#ecfdf5"></span> `#ecfdf5` |  |
| `--_hue-emerald-100` | <span class="tk-swatch" style="background:#d1fae5"></span> `#d1fae5` |  |
| `--_hue-emerald-200` | <span class="tk-swatch" style="background:#a7f3d0"></span> `#a7f3d0` |  |
| `--_hue-emerald-300` | <span class="tk-swatch" style="background:#6ee7b7"></span> `#6ee7b7` |  |
| `--_hue-emerald-400` | <span class="tk-swatch" style="background:#34d399"></span> `#34d399` |  |
| `--_hue-emerald-500` | <span class="tk-swatch" style="background:#10b981"></span> `#10b981` |  |
| `--_hue-emerald-600` | <span class="tk-swatch" style="background:#059669"></span> `#059669` |  |
| `--_hue-emerald-700` | <span class="tk-swatch" style="background:#047857"></span> `#047857` |  |
| `--_hue-emerald-800` | <span class="tk-swatch" style="background:#065f46"></span> `#065f46` |  |
| `--_hue-emerald-900` | <span class="tk-swatch" style="background:#064e3b"></span> `#064e3b` |  |
| `--_hue-emerald-950` | <span class="tk-swatch" style="background:#022c22"></span> `#022c22` |  |
| `--_hue-white` | <span class="tk-swatch" style="background:#ffffff"></span> `#ffffff` |  |
| `--_hue-sky-50` | <span class="tk-swatch" style="background:#f0f9ff"></span> `#f0f9ff` |  |
| `--_hue-sky-100` | <span class="tk-swatch" style="background:#e0f2fe"></span> `#e0f2fe` |  |
| `--_hue-sky-200` | <span class="tk-swatch" style="background:#bae6fd"></span> `#bae6fd` |  |
| `--_hue-sky-300` | <span class="tk-swatch" style="background:#7dd3fc"></span> `#7dd3fc` |  |
| `--_hue-sky-400` | <span class="tk-swatch" style="background:#38bdf8"></span> `#38bdf8` |  |
| `--_hue-sky-500` | <span class="tk-swatch" style="background:#0ea5e9"></span> `#0ea5e9` |  |
| `--_hue-sky-600` | <span class="tk-swatch" style="background:#0284c7"></span> `#0284c7` |  |
| `--_hue-sky-700` | <span class="tk-swatch" style="background:#0369a1"></span> `#0369a1` |  |
| `--_hue-sky-800` | <span class="tk-swatch" style="background:#075985"></span> `#075985` |  |
| `--_hue-sky-900` | <span class="tk-swatch" style="background:#0c4a6e"></span> `#0c4a6e` |  |
| `--_hue-sky-950` | <span class="tk-swatch" style="background:#082f49"></span> `#082f49` |  |

## Radius scale — 모서리 계단

소스: `css/primitive/radius-scale.css` · 7개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--_radius-scale-0` | `0` |  |
| `--_radius-scale-1` | `0.125rem` | 2px |
| `--_radius-scale-2` | `0.25rem` | 4px |
| `--_radius-scale-3` | `0.5rem` | 8px |
| `--_radius-scale-4` | `0.75rem` | 12px |
| `--_radius-scale-5` | `1rem` | 16px |
| `--_radius-scale-6` | `1.5rem` | 24px |

## Font scale — 글꼴 크기 계단

소스: `css/primitive/font-scale.css` · 9개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--_font-scale-1` | `0.75rem` | 12px |
| `--_font-scale-2` | `0.875rem` | 14px |
| `--_font-scale-3` | `1rem` | 16px |
| `--_font-scale-4` | `1.125rem` | 18px |
| `--_font-scale-5` | `1.25rem` | 20px |
| `--_font-scale-6` | `1.5rem` | 24px |
| `--_font-scale-7` | `2rem` | 32px |
| `--_font-scale-8` | `2.5rem` | 40px |
| `--_font-scale-9` | `3rem` | 48px |

## Shadow elevation — 그림자 계단

소스: `css/primitive/shadow-elev.css` · 5개

| 토큰 | 값 | 설명 |
|---|---|---|
| `--_shadow-elev-1` | `0 0.0625rem 0.125rem rgba(0, 0, 0, 0.05)` | y=1px, blur=2px |
| `--_shadow-elev-2` | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.1)` | y=2px, blur=4px |
| `--_shadow-elev-3` | `0 0.25rem 0.5rem rgba(0, 0, 0, 0.12)` | y=4px, blur=8px |
| `--_shadow-elev-4` | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)` | y=8px, blur=16px |
| `--_shadow-elev-5` | `0 1rem 2rem rgba(0, 0, 0, 0.2)` | y=16px, blur=32px |
