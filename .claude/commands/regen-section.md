# /regen-section

Regenerate a single section without touching anything else.

Usage: `/regen-section SectionName`

---

## Step 1 — Read context

Read these files before doing anything:
1. `INTAKE.md` — design direction, mood, graphics strategy
2. `src/content/landing.ts` — existing copy for ALL sections (do not modify copy for other sections)
3. `src/app/globals.css` — existing design tokens (do not change tokens)
4. The existing section file at `src/sections/$SECTION/$SECTION.tsx` (understand what's there)

---

## Step 2 — Identify what to regenerate

The argument is the section name (e.g. `Hero`, `Features`, `Pricing`).

If no argument is provided, ask: "Which section should I regenerate?"

---

## Step 3 — Apply skills scoped to this section

Use ui-ux-pro-max + frontend-design skills, but constrained to:
- Existing token values from `globals.css` (same colors, same fonts)
- Same overall mood as the rest of the page
- Only the content for this section from `landing.ts`

The goal is a fresh layout/visual treatment for this section, not a redesign of the whole page.

---

## Step 4 — Rewrite only the section file

Overwrite `src/sections/$SECTION/$SECTION.tsx` with the new implementation.

Rules:
- Do NOT modify `landing.ts`
- Do NOT modify `globals.css`
- Do NOT modify `page.tsx`
- Do NOT modify any other section
- If this section uses a shared component from `src/components/` that would need changes, create a new variant instead of modifying the shared one

---

## Step 5 — Apply polish skill

Quick polish pass on the regenerated section only:
- Hover states, focus rings, transitions
- Mobile layout at 375px
- Spacing consistency with adjacent sections

---

## Step 6 — Validate

Run `npm run build`. Fix any errors before finishing.
