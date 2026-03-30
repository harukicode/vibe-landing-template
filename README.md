# Vibe Landing Template

A Next.js 15 + Tailwind CSS v4 template for generating complete landing pages with Claude Code — from a rough project description to a production-ready page in one automated pass.

---

## Why this exists

The usual flow when building a landing page for a client:

1. Manager drops a vague brief → you ask 10 clarifying questions
2. You sketch a structure → back to manager for approval
3. You build → realize the copy doesn't fit the layout
4. You iterate 3-4 times before anything looks right

This template collapses that into:

1. You dump everything you know about the project into a prompt → INTAKE.md gets filled
2. You run `/init-landing` → Claude generates the full page in one pass
3. You iterate only on what actually needs changing with `/regen-section`

**The key insight:** the bottleneck isn't writing code — it's the information gap between "rough brief" and "concrete design decisions." INTAKE.md is the bridge. Fill it once, generate everything from it.

---

## Stack

| Tool | Role |
|------|------|
| Next.js 15 (App Router) | Framework, SSG, RSC |
| Tailwind CSS v4 | Styling via CSS-first `@theme` |
| TypeScript (strict) | Type safety throughout |
| Lucide React | Icons |
| next/font/google | Typography, zero layout shift |
| next/image | Optimized images |

---

## How it works

```
INTAKE.md  ──→  /init-landing  ──→  Full landing page
   ↑                  ↓
You fill it      Claude runs 13 steps:
(once)           1. Parse INTAKE
                 2. Write copy (copywriting skill)
                 3. Pick colors + fonts (frontend-design skill)
                 4. Design components (ui-ux-pro-max skill)
                 5. Validate contrast/a11y (web-design-guidelines skill)
                 6. Generate landing.ts (all copy)
                 7. Generate globals.css (design tokens)
                 8. Update layout.tsx (fonts + metadata)
                 9. Generate all sections
                 10. Compose page.tsx
                 11. Polish pass (polish skill)
                 12. npm run build
                 13. Print summary + TODOs
```

Everything generated is isolated per project — buttons, cards, typography, color palette. A crypto trading platform and a fashion brand get completely different visual languages from the same template.

---

## Prerequisites

**1. Claude Code** with an active session in this project directory.

**2. Install skills** (run once per machine):

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting
npx skills add https://github.com/pbakaus/impeccable --skill polish
```

Skills are stored in `.claude/skills/` and are available to all commands automatically.

**3. Install dependencies:**

```bash
npm install
```

---

## Usage

### Step 1 — Fill INTAKE.md

You have two options:

#### Option A — Use the INTAKE fill prompt (recommended)

If you have a rough project description — a brain dump, a manager's message, a client email, anything — paste it into Claude Code along with this prompt:

---

**INTAKE Fill Prompt** — copy this, paste your project info after it, send to Claude:

```
Read INTAKE.md carefully to understand all the fields and their purpose.
Then read everything I've written below about the project.
Your job is to fill INTAKE.md completely and correctly based on my description.

Rules:
- Set the Tier based on how much information I've provided:
    Tier 1 if I gave you only a rough idea (< 5 sentences)
    Tier 2 if I described the product with some detail
    Tier 3 if I gave a full structured brief with copy, design, and technical requirements
- Fill every field you can derive from my text. Leave a field blank only if
  there is truly no way to infer it — do not invent facts, but do infer logically.
- For Sections: check [x] all sections that make sense for this type of product.
  A SaaS product typically needs Hero + Features + Pricing + FAQ + Footer.
  A physical product typically needs Hero + Features + Testimonials + CTA + Footer.
  Use your judgment based on the product type.
- For Design Direction: if I haven't mentioned colors or mood, infer from the
  audience and product type. A fintech product implies professional/minimal.
  A kids' education app implies playful/bold. Write your inference in the field.
- For Graphics Strategy: default to "svg-icons" unless I mentioned real images.
- After filling INTAKE.md, print a short summary of what you filled and flag
  any fields where you made a significant inference so I can review them.

Here is the project info:
[PASTE YOUR PROJECT DESCRIPTION HERE]
```

---

#### Option B — Fill manually

Open `INTAKE.md` and fill it in directly. The file has comments explaining every field.

Filling takes 5–60 minutes depending on how detailed your brief is:
- Tier 1 (rough idea): ~5 minutes, fill only required fields
- Tier 2 (described): ~20 minutes, fill most fields
- Tier 3 (full brief): ~60 minutes, fill everything including content hints

---

### Step 2 — Run generation

Once INTAKE.md is filled:

```
/init-landing
```

Claude will run all 13 steps automatically. Do not interrupt. The process ends with a build check and a summary of what was generated.

Expected output structure after generation:

```
src/
  app/
    globals.css        ← filled with your project's design tokens
    layout.tsx         ← updated with fonts + metadata
    page.tsx           ← all sections imported and composed
  sections/
    Hero/Hero.tsx
    Features/Features.tsx
    Pricing/Pricing.tsx
    ...                ← one file per checked section
  components/          ← shared components if needed (Button, Card, etc.)
  content/
    landing.ts         ← all copy for the entire page
```

---

### Step 3 — Review and iterate

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` and review.

**To regenerate a single section** (without touching the rest):

```
/regen-section Hero
/regen-section Features
/regen-section Pricing
```

The regen command reads existing tokens and copy — it only redesigns the visual layout of that section.

**To change copy** — edit `src/content/landing.ts` directly. It's just a TypeScript object.

**To adjust design tokens** — edit the `:root {}` block in `src/app/globals.css`. Changes propagate everywhere via Tailwind utilities.

---

## INTAKE.md field reference

| Field | Required | Notes |
|-------|----------|-------|
| Tier | yes | 1 = idea, 2 = described, 3 = full brief |
| Product name | yes | Used in metadata, logo, footer |
| Tagline | yes | Goes in Hero h1 or subheadline |
| Description | yes | Claude's main source for copy inference |
| Audience | yes | Drives tone, copy angle, design mood |
| Sections | yes | Check only what you need |
| Mood | no | Defaults inferred from audience if blank |
| Primary color | no | Claude picks from mood if blank |
| CTA action | no | Defaults to "#" if blank |

---

## Design system

All visual values live in `src/app/globals.css` as CSS custom properties.
Tailwind v4 maps them to utility classes via `@theme inline {}`.

```css
/* Generated by /init-landing */
:root {
  --color-primary: #6366f1;
  --color-surface: #f8f8ff;
  /* ... */
}

@theme inline {
  --color-primary: var(--color-primary);
  /* ... Tailwind now has bg-primary, text-primary, border-primary */
}
```

**Rules enforced by the agent:**
- No raw Tailwind palette classes (`bg-blue-500`) — use token utilities only
- No hardcoded copy in `.tsx` files — everything from `landing.ts`
- No pre-built components reused across projects — each project gets its own

---

## Project structure (complete)

```
.claude/
  commands/
    init-landing.md    ← /init-landing orchestrator (13 steps)
    regen-section.md   ← /regen-section SectionName
  skills/              ← installed skills live here (npx skills add)
src/
  app/
    globals.css        ← design tokens + Tailwind @theme
    layout.tsx         ← root layout, fonts, metadata (do not edit structure)
    page.tsx           ← section imports only (do not add logic here)
  sections/            ← generated per project
  components/          ← generated per project (no pre-builts)
  content/
    landing.ts         ← all copy (the only file you edit post-generation)
  lib/
    utils.ts           ← cn() and pure utils if needed
public/
  brand/               ← drop client assets here before running /init-landing
INTAKE.md              ← fill this first
CLAUDE.md              ← agent rules (do not edit)
```

---

## Sections available

| Section | What it generates |
|---------|------------------|
| `Hero` | h1, subheadline, CTA, background treatment |
| `LogoCloud` | "Trusted by" row with logo placeholders |
| `Features` | Icon grid or alternating layout depending on count |
| `HowItWorks` | Numbered steps, vertical or horizontal |
| `Pricing` | Plan cards with optional monthly/annual toggle |
| `Testimonials` | Quote cards with avatar initials |
| `FAQ` | Native `<details>` accordion, no JS |
| `CTA` | Full-width banner with contrasting background |
| `Footer` | Multi-column nav + social icons |

---

## FAQ

**Q: Can I use this without all 5 skills installed?**
Yes. The skills enhance output quality but the generation still works without them. Claude falls back to its base capabilities for steps that use missing skills.

**Q: What if my project changes after generation?**
Edit `src/content/landing.ts` for copy changes. Run `/regen-section` for layout changes. Re-run `/init-landing` only if the design direction changes fundamentally.

**Q: Can I add a custom section not in the list?**
Describe it in the INTAKE "Other" field: "Add a custom section called VideoDemo between Features and Pricing — fullscreen video embed with a headline and play button." The agent will generate it.

**Q: Why no pre-built Button or Card components?**
Because a crypto dashboard and a wedding planner need completely different buttons. Pre-built components create a gravitational pull toward sameness. Every project generates its own.

**Q: Does it work for multi-page sites?**
No. This template is designed for single-page landing pages only.
