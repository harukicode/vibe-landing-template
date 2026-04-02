# /init-landing

Generate a complete landing page from scratch based on `INTAKE.md`.

---

## Step 1 — Read INTAKE.md

Extract everything: product, audience, sections, design direction, mood, graphics strategy, technical notes.

Determine the tier:
- **Tier 1** (bare idea): make bold creative assumptions — document them at the end
- **Tier 2** (partial brief): fill gaps using mood + audience context
- **Tier 3** (full brief): execute exactly, no additions

---

## Step 2 — Write copy

All context is in INTAKE.md — do not ask questions, make decisions and proceed.

Write all user-facing text now, before touching any file:
- Headline that leads with outcome, not feature name
- Subheadline that speaks to the audience's pain
- Feature/step descriptions (benefit-first, 2–3 sentences)
- CTA text that implies action + value ("Start building free", not "Sign up")
- FAQ answers, testimonial copy, pricing plan names — anything from INTAKE hints

Use your copywriting skill if INTAKE is thin on copy direction. Pass it everything from INTAKE — it should not ask questions.

Hold copy in memory. Do not write files yet.

---

## Step 3 — Design decisions

Commit to a specific aesthetic before coding:
- **Color palette**: primary, primary-hover, secondary, accent, background, surface, text, text-secondary, text-muted, border — all as hex values
- **Font pair**: heading + body via Google Fonts, matching the mood
- **Radius + shadow scale**: sharp for minimal/technical, rounder for playful, soft for luxury
- **Hero visual treatment**: what fills the background or right column?
- **Component language**: what do buttons, cards, and badges look like for *this* product?

Use your frontend-design skill for color + typography. It produces CSS custom properties — make sure the output maps to the `@theme inline {}` token names already in `globals.css` (`--color-primary`, `--color-background`, `--font-heading`, etc.).

Constraint check (inline):
- Body text on background contrast ≥ 4.5:1 — self-correct if not
- Body font ≥ 16px equivalent
- Interactive targets ≥ 44px

Hold decisions in memory. Do not write files yet.

---

## Step 4 — Generate foundation files

Write in this order:

1. **`src/content/landing.ts`** — complete typed content object, only sections checked in INTAKE
2. **`src/app/globals.css`** — replace placeholder tokens with real values; update `@theme inline {}`
3. **`src/app/layout.tsx`** — add Google Font imports, apply CSS vars to `<html>`, update metadata from `landing.meta`

---

## Step 5 — Generate sections

For each checked section in order: Hero → LogoCloud → Features → HowItWorks → Pricing → Testimonials → FAQ → CTA → Footer

Each section file at `src/sections/SectionName/SectionName.tsx`:
- Imports from `@/content/landing` — no hardcoded copy
- Uses token-mapped utilities only — no raw palette classes
- Looks and feels right for *this* product's audience and mood — not generic
- Shared components (used 2+) go in `src/components/`

Build quality in as you write — don't plan a separate polish pass:
- Hover + focus states on every interactive element
- `transition-all duration-200` on buttons and cards
- Sections alternate `bg-background` / `bg-surface`
- Mobile-first: grids collapse at `md:`, headings scale down

---

## Step 6 — Compose, build, report

Update `src/app/page.tsx` with all section imports in order.

Run `npm run build`. If it fails, read the error, fix it, re-run. Do not finish until build passes.

Print:
