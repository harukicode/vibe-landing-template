# CLAUDE.md — Vibe Landing Agent Rules

This is a Next.js 15 + Tailwind CSS v4 landing page template.
The agent generates the full project by reading `INTAKE.md` and these rules.

---

## Stack

- **Next.js 15** — App Router, React Server Components, zero client JS by default
- **Tailwind CSS v4** — CSS-first config via `@theme` in `globals.css`
- **TypeScript** strict mode
- **Lucide React** (`lucide-react`) for icons
- **next/font/google** for typography — loaded in `layout.tsx`
- **next/image** for all images

---

## Project structure

```
src/
  app/
    layout.tsx       ← shell only, agent updates metadata & font imports
    page.tsx         ← imports sections, zero logic
    globals.css      ← design tokens (@theme) + base reset
  sections/          ← one folder per section, e.g. Hero/Hero.tsx
  components/        ← all components generated fresh per project (no pre-builts)
  content/
    landing.ts       ← single source of truth for ALL copy (generated)
  lib/
    utils.ts         ← cn() helper and other pure utils (generated if needed)
public/
  brand/             ← client assets (logo, fonts, screenshots)
```

---

## Non-negotiable rules

### Copy

- **All user-facing text lives in `src/content/landing.ts`** — never hardcode strings in `.tsx` files
- `landing.ts` exports a single typed `const landing` object
- Every section imports and destructures from `landing` at the top of the file

```ts
// src/content/landing.ts
const landing = {
  hero: { headline: "...", subheadline: "...", cta: { text: "...", href: "..." } },
  features: { ... },
  // ...
} as const;

export type Landing = typeof landing;
export default landing;
```

### Design tokens

- **All design values defined in `globals.css` `:root {}`** as CSS custom properties
- **`@theme inline {}` maps them to Tailwind utilities** (`bg-primary`, `text-text-secondary`, etc.)
- **Allowed Tailwind classes**: anything that references CSS vars (`bg-primary`, `text-text-secondary`, `border-border`) + standard layout/spacing (`flex`, `grid`, `gap-4`, `p-8`, `rounded-lg`, `w-full`, `max-w-3xl`, etc.)
- **Forbidden**: raw Tailwind palette classes — `bg-blue-500`, `text-gray-100`, `border-indigo-300`. These bypass the design system.
- In `className` strings, use token-mapped utilities: `bg-primary`, `text-text-secondary`, `bg-surface`, `border-border`
- In inline CSS or `style={{}}`, use `var(--color-primary)` directly

### Components

- **No pre-built components** — generate every component fresh for the project
- Component visual style (shape of buttons, cards, badges) follows the INTAKE mood and design direction
- A crypto project and a fashion platform get completely different buttons — this is correct behavior

### HTML semantics

- **One `<h1>` per page** — always in Hero section
- Section headings are `<h2>`, card/feature titles are `<h3>`
- Wrap every section in a `<section>` tag with a unique `id`
- Use a `<Container>` component (generated, handles `max-w-*` + horizontal padding) inside each section
- **Never use raw `<img>`** — use `<Image>` from `next/image`

### Accessibility

- Every interactive element must be keyboard-focusable
- Icon-only buttons need `aria-label`
- Decorative images get `alt=""`
- Skip link already in `layout.tsx` — do not remove it

### Performance

- All components are React Server Components by default
- Add `"use client"` only when browser APIs or interactivity are strictly required (e.g. pricing toggle)
- When client JS is needed, use minimal vanilla logic inside `useEffect` or event handlers — no extra libraries
- Prefer CSS transitions/animations over JS
- Images below the fold: `loading="lazy"` prop on `<Image>`

---

## Section patterns

Default layout decisions — follow unless INTAKE explicitly requests otherwise.

### Hero
- One `<h1>`, subheadline `<p>`, primary CTA button, optional secondary CTA link
- Optional: Badge component above headline ("New", "Beta", "v2.0")
- **Layout**: centered text by default. If a product screenshot/image exists → split layout (text left, image right)
- **Background**: use a gradient, color block, or geometric SVG shapes — never leave empty white space
- **Responsive**: stack vertically on mobile, center-align text

### Features
- 3 items → 3-column grid. 4 items → 2×2. 5–6 items → 3×2
- Each item: Lucide icon + `<h3>` + short description
- If INTAKE has detailed descriptions → alternating layout (text block + visual, flipping sides)
- Responsive: single column on mobile

### HowItWorks
- Numbered steps with title + description
- Step numbers as large styled numerals or circles
- Layout: vertical timeline or horizontal row
- Responsive: always vertical on mobile

### Pricing
- ≤3 plans → side-by-side cards, visually highlight recommended plan
- Monthly/annual toggle → `"use client"` exception, minimal state
- Each plan: name, price, period, feature list with checkmarks, CTA button
- Responsive: stack on mobile

### Testimonials
- 1–3 quotes → single row or stacked cards
- Each: blockquote, person name, role/company, avatar (colored circle with initials)
- Responsive: single column on mobile

### FAQ
- Use native `<details>` / `<summary>` — no JS needed
- 4–10 questions
- Style summary as clickable row with CSS chevron indicator

### LogoCloud
- Heading + row of logos or company names
- Text placeholders with `{/* TODO: replace with actual logo */}` comments
- Grayscale treatment by default

### CTA (banner)
- Full-width section, contrasting background (primary color or dark)
- Headline + single CTA button
- Max 2 lines of text

### Footer
- Multi-column layout: nav link groups + social icons (`lucide-react`) with `aria-label`
- Bottom row: copyright text
- Responsive: stack columns on mobile

---

## Visual design rules

### Color distribution
- **Primary color**: CTA buttons, key links, active states, hero accents — sparingly
- **Secondary / accent**: badges, decorative elements
- **Neutral scale**: body text, borders, backgrounds, cards
- **Section backgrounds**: alternate between `bg-background` and `bg-surface` for visual rhythm
- Max 2 colorful elements per viewport — restraint feels premium

### Typography hierarchy
- `h1` (Hero): large, `font-weight: 800`, drops 1–2 sizes on mobile
- `h2` (section headings): `font-weight: 700`, center-aligned for symmetrical sections
- `h3` (card titles): `font-weight: 600`
- Body text: `text-text-secondary` (not pure black), comfortable line-height
- Section subtitles (under h2): `text-text-secondary`, `max-w-xl mx-auto`, centered

### Spacing rhythm
- Between content blocks (cards, feature items): `gap-8` or `gap-6`
- Inside cards: `p-6` or `p-8`
- Section heading → content gap: `mt-12` or `mt-16`
- Primary CTA buttons: minimum `py-3 px-8`

### Responsive
- All grids collapse to single column below `md:` breakpoint
- Headings drop 1–2 size steps on mobile using `md:text-5xl`
- Test mentally at 375px — nothing should overflow
- Use `md:` prefix: `md:grid-cols-3`, `md:flex-row`

### Polish
- Cards: `shadow-sm` or `shadow-md` + rounded corners matching `--radius-lg`
- Hover on interactive cards: `hover:-translate-y-1 hover:shadow-md transition-all duration-200`
- Centered text blocks: `max-w-2xl mx-auto` or `max-w-3xl mx-auto`

---

## Graphics decision tree

1. **No image needed** — color blocks, gradients, CSS shapes, typography alone (preferred)
2. **Icons** — `lucide-react` for feature icons, nav, social links
3. **Illustrations** — inline SVG or `{/* TODO: replace with illustration */}`
4. **Photos/screenshots** — colored `<div>` placeholder with `{/* TODO: replace with actual image */}`
5. **Brand assets** — reference from `public/brand/` via `<Image>`

---

## Section file template

```tsx
// src/sections/SectionName/SectionName.tsx
import landing from "@/content/landing";

const { sectionName } = landing;

export default function SectionName() {
  return (
    <section id="section-name" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* markup */}
      </div>
    </section>
  );
}
```

---

## Files the agent must NOT modify

- `src/app/layout.tsx` structure — only update metadata and font imports
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`

---

## Quality checklist (verify after generation)

- [ ] No raw Tailwind palette colors in any component file
- [ ] No hardcoded copy in `.tsx` files — all text from `landing.ts`
- [ ] Single `<h1>` on the page (Hero only)
- [ ] All `<Image>` tags have `alt` attributes
- [ ] All `"use client"` usages are justified
- [ ] `metadata` in `layout.tsx` is populated from `landing.ts`
- [ ] `npm run build` passes with zero errors
