# /init-landing

You are generating a complete landing page from scratch. Read everything carefully before writing a single file.

---

## Step 1 — Read and parse INTAKE.md

Read `INTAKE.md` fully. Extract and hold in working memory:

- **Tier** (1, 2, or 3) — determines how many assumptions you're allowed to make
- **Product**: name, tagline, description
- **Audience**: who, pain, goal
- **Value proposition**: main benefit, features list, differentiator
- **Sections**: which are checked [x]
- **Content hints**: pricing plans, FAQ questions, testimonials
- **Design direction**: mood, primary color, feel, typography vibe
- **Graphics strategy**: placeholder | svg-icons | inline-svg | provided
- **Technical**: CTA action, domain, analytics

**Tier rules:**
- Tier 1: INTAKE has very little info. Make bold assumptions on structure, copy, and design. Prioritize impact over accuracy. Document your assumptions at the end.
- Tier 2: INTAKE has partial info. Fill gaps intelligently using audience context and mood. No need to document assumptions.
- Tier 3: INTAKE is a full brief. Execute exactly. Do not add sections not listed, do not invent copy.

---

## Step 2 — Apply copywriting skill

Use your copywriting skill to:
- Write a punchy, benefit-driven headline for Hero (if INTAKE tagline is weak or missing)
- Write subheadline that addresses the audience's pain point
- Write feature descriptions (2-3 sentences each) that lead with benefit, not feature name
- Write CTA button text that implies action + value ("Start building free" not "Sign up")
- Write FAQ answers if questions were provided
- Write testimonial placeholders if "generate placeholders" was specified

Hold all copy in memory — do not write files yet.

---

## Step 3 — Apply frontend-design skill

Use your frontend-design skill to make these decisions based on INTAKE mood + audience:

**Color palette** (generate 6 values):
- `--color-primary`: main brand color (CTA buttons, hero accents)
- `--color-primary-hover`: 10% darker variant
- `--color-secondary`: complementary accent
- `--color-accent`: highlight / badge color
- `--color-background`: page background
- `--color-surface`: card / section alternate background

Derive `--color-text`, `--color-text-secondary`, `--color-text-muted`, `--color-border` from the palette.

**Typography** (pick Google Fonts pair):
- `--font-heading`: display/heading font — should match the mood
- `--font-sans`: body font — readable, harmonious with heading font
- Import both via `next/font/google` in `layout.tsx`

**Radius + shadows**: set values that match the mood
- minimal/technical → sharp, `--radius-sm: 4px`, subtle shadows
- playful/bold → rounder, `--radius-lg: 16px`, more pronounced shadows
- luxury → medium radius, `--shadow-lg` with soft spread

**Hero visual treatment**: decide based on mood and graphics strategy
- What goes in the background/right column of Hero?

Hold all decisions in memory — do not write files yet.

---

## Step 4 — Apply ui-ux-pro-max skill

Use your ui-ux-pro-max skill to design the component language for this project:

- **Button style**: shape, size, hover behavior, border vs filled vs ghost variants
- **Card style**: border vs shadow, padding, hover interaction
- **Badge style**: pill vs square, subtle vs bold
- **Section rhythm**: how much vertical padding, how sections transition into each other
- **Icon treatment**: size, stroke weight, color (primary vs muted)

These decisions define what the generated components look like — make them cohesive and appropriate for the audience.

---

## Step 5 — Apply web-design-guidelines skill

Validate your decisions against web design best practices:
- Contrast ratios — body text on background must meet WCAG AA (4.5:1)
- CTA button contrast — primary text on primary bg must be readable
- Font size minimum — body text ≥ 16px equivalent
- Touch targets — interactive elements ≥ 44px
- Flag any decision that would fail these checks and self-correct before proceeding

---

## Step 6 — Generate `src/content/landing.ts`

Write the complete typed landing content object.
Include only sections that are checked in INTAKE.
Use the copy from Step 2.

```ts
const landing = {
  meta: {
    title: "...",
    description: "...",
    ogImage: "/og-image.png",
  },
  hero: { ... },
  features: { items: [...] },
  // only sections that are checked
} as const;

export type Landing = typeof landing;
export default landing;
```

---

## Step 7 — Update `src/app/globals.css`

Replace the placeholder token values in `:root {}` with the actual values from Step 3.
Update `@theme inline {}` to include all new token names used in components.
Add font face references if using variable fonts.

---

## Step 8 — Update `src/app/layout.tsx`

- Add `import { FontName } from "next/font/google"` for both fonts decided in Step 3
- Apply font CSS variables to `<html>` className
- Update `export const metadata` with values from `landing.meta`

---

## Step 9 — Generate sections (in page order)

For each checked section, create `src/sections/SectionName/SectionName.tsx`.

Follow the section patterns in CLAUDE.md.
Apply the component language decisions from Step 4.
Apply the graphics strategy from INTAKE.

Generate sections in this order: Hero → LogoCloud → Features → HowItWorks → Pricing → Testimonials → FAQ → CTA → Footer

**For each section:**
- Import from `@/content/landing`
- No hardcoded copy
- No raw Tailwind palette colors
- All components (Button, Card, Badge, etc.) defined inline or imported from `@/components/`

If a component is reused across 2+ sections, create it as a shared component in `src/components/`.

---

## Step 10 — Update `src/app/page.tsx`

Import all generated sections and compose the page:

```tsx
import Hero from "@/sections/Hero/Hero";
// ... all sections

export default function Home() {
  return (
    <>
      <Hero />
      {/* all checked sections in order */}
    </>
  );
}
```

---

## Step 11 — Apply polish skill

Use your polish skill for a final pass:
- Hover states on all interactive elements
- Focus rings for keyboard navigation
- Spacing consistency — check that vertical rhythm feels even
- Mobile layout — mentally check at 375px width
- Micro-animations — `transition-all duration-200` on buttons, cards
- Check that section backgrounds alternate correctly

Apply fixes directly to the generated files.

---

## Step 12 — Validate

Run `npm run build`. If it fails:
- Read the error
- Fix the specific issue
- Re-run build
- Do not proceed until build passes

---

## Step 13 — Output summary

After successful build, print:

```
✓ Build passed

Generated sections: [list]
Design decisions:
  Primary color: [value] — [reasoning from mood]
  Fonts: [heading] + [body]
  Mood: [mood word]

Assumptions made: [list if Tier 1, otherwise "none"]

TODOs remaining:
  [list any placeholder images/illustrations that need real assets]
```
