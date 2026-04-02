# /regen-section

Regenerate a single section without touching anything else.

Usage: `/regen-section SectionName`

If no argument provided, ask: "Which section should I regenerate?"

---

## Step 1 — Read context

1. `INTAKE.md` — mood, design direction, graphics strategy
2. `src/content/landing.ts` — copy for this section (do NOT modify)
3. `src/app/globals.css` — existing tokens (do NOT change)
4. `src/sections/$SECTION/$SECTION.tsx` — what's currently there

---

## Step 2 — Redesign

Decide on a fresh visual approach for this section — different layout, different component style, new visual interest. Stay within the existing tokens (colors, fonts) and overall page mood.

Use frontend-design skill if helpful for layout or component decisions.

---

## Step 3 — Rewrite and validate

Overwrite `src/sections/$SECTION/$SECTION.tsx` with the new implementation.

Hard rules:
- Do NOT touch `landing.ts`, `globals.css`, `page.tsx`, or any other section
- No hardcoded copy, no raw palette classes
- Hover + focus states, transitions on interactive elements
- If a shared component needs a change, create a variant in `src/components/` instead

Run `npm run build`. Fix any errors before finishing.
