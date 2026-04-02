---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

**When used in this project (Next.js 15 + Tailwind CSS v4):** output design values as CSS custom properties that match the existing token names in `globals.css` — `--color-primary`, `--color-background`, `--color-surface`, `--color-text`, `--color-text-secondary`, `--color-border`, `--font-heading`, `--font-sans`, `--radius-sm/md/lg`, `--shadow-sm/md/lg`. These are mapped to Tailwind utilities via `@theme inline {}` — do not suggest inline styles or arbitrary Tailwind values.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

## Frontend Aesthetics Guidelines

- **Typography**: Avoid generic fonts (Arial, Inter, Roboto). Choose distinctive display + refined body pairings.
- **Color & Theme**: Commit to a cohesive aesthetic. Dominant colors with sharp accents outperform timid palettes.
- **Motion**: CSS-only where possible. One well-orchestrated page load with staggered reveals > scattered micro-interactions.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Generous negative space OR controlled density.
- **Backgrounds**: Atmosphere and depth — gradient meshes, noise textures, geometric patterns, layered transparencies.

NEVER: purple gradients on white, Space Grotesk, predictable card grids, cookie-cutter patterns.

Remember: commit fully to a distinctive vision. No two generations should look the same.
