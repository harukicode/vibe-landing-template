# CLAUDE.md — Vibe Landing Agent Rules

This is a Next.js 15 + Tailwind CSS v4 landing page template.
The agent generates the full project by reading `INTAKE.md` and these rules.

---

## Stack

- **Next.js 15** — App Router, React Server Components
- **Tailwind CSS v4** — CSS-first config via `@theme` in `globals.css`
- **TypeScript** strict mode
- **Lucide React** for icons, **next/font/google** for typography, **next/image** for images

## Project structure

src/
app/
layout.tsx ← shell only: update metadata + font imports
page.tsx ← imports sections, zero logic
globals.css ← design tokens (@theme) + base reset
sections/ ← one file per section, e.g. Hero/Hero.tsx
components/ ← shared components generated fresh per project
content/
landing.ts ← single source of truth for ALL copy
public/
brand/ ← client assets (logo, screenshots)

## Non-negotiable rules

These exist to keep the architecture intact — not to constrain visual design.

**Copy**
- All user-facing text lives in `src/content/landing.ts` — never hardcode strings in `.tsx`
- Single typed export: `const landing = { ... } as const; export default landing;`
- Every section imports and destructures from `landing` at the top

**Design tokens**
- All design values in `globals.css` `:root {}` as CSS custom properties
- `@theme inline {}` maps them to Tailwind utilities
- **Forbidden**: raw Tailwind palette classes (`bg-blue-500`, `text-gray-100`) — they bypass the design system
- Use token-mapped utilities: `bg-primary`, `text-text-secondary`, `bg-surface`, `border-border`

**HTML & performance**
- One `<h1>` per page — Hero section only
- Wrap every section in `<section id="...">` with a unique id
- Never `<img>` — use `<Image>` from `next/image`
- All components are React Server Components by default
- `"use client"` only when strictly required (e.g. pricing toggle) — justify it with a comment

**Accessibility**
- Every interactive element keyboard-focusable
- Icon-only buttons need `aria-label`
- Skip link in `layout.tsx` — do not remove it

---

## Files the agent must NOT modify

- `src/app/layout.tsx` structure — only update metadata and font imports
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`

---

## Quality checklist (verify after generation)

- [ ] No raw Tailwind palette colors anywhere
- [ ] No hardcoded copy in `.tsx` — all text from `landing.ts`
- [ ] Single `<h1>` on the page
- [ ] All `<Image>` tags have `alt` attributes
- [ ] `"use client"` usages commented and justified
- [ ] `metadata` in `layout.tsx` populated from `landing.ts`
- [ ] `npm run build` passes with zero errors
