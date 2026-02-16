# Gallery Feature — Contractor Website

## What This Is

A gallery/portfolio page for an existing contractor website that showcases past work to build trust with potential clients. Visitors can browse completed projects by category, view them in a lightbox, and some projects feature before/after comparison. Built as a new page within an existing Next.js 14 App Router site with a dark green + gold theme.

## Core Value

Visitors see proof of quality work — the gallery builds enough trust that they request a quote.

## Requirements

### Validated

- ✓ Next.js 14 App Router site with Tailwind CSS 3 — existing
- ✓ Dark green (#094026) + gold (#FCB215) color scheme — existing
- ✓ Responsive mobile-first design — existing
- ✓ Header with nav links + Footer — existing
- ✓ Custom utility classes (section-padding, container-custom, btn-*) — existing

### Active

- [ ] Gallery page at /gallery with responsive grid (1/2/3 columns)
- [ ] Category filter buttons to filter projects (animated transitions)
- [ ] Lightbox modal with keyboard navigation (ESC, arrow keys)
- [ ] Before/after comparison for select projects
- [ ] Framer Motion animations (fade, scale, layout transitions)
- [ ] Placeholder card design (colored backgrounds with icons, swappable for real images later)
- [ ] Navigation link added to Header for Gallery page
- [ ] Mobile-optimized touch interactions matching existing site patterns
- [ ] Accessibility (ARIA labels, focus management, keyboard support)

### Out of Scope

- Real project images — placeholders now, images added later
- Image upload/CMS functionality — static data for now
- Video content — photos only
- Comments or social sharing — this is a showcase, not social

## Context

- Existing site is a generic contractor template deployed to Vercel
- Uses Tailwind CSS v3 (config-based, NOT v4 CSS-based)
- Currently no framer-motion or lucide-react installed — need to add
- All current icons are inline SVGs — reference file uses lucide-react
- Components use flat directory structure (src/components/)
- Reference implementation provided in GALLERY_FEATURE_INSTRUCTIONS.md
- Site designed for 70%+ mobile traffic — gallery must be touch-friendly
- Current nav: Home, Services, About, Reviews, Contact — Gallery needs to be added

## Constraints

- **Tech stack**: Must use existing Next.js 14 + Tailwind CSS 3 setup — no framework changes
- **Theme**: Must match existing dark green + gold color scheme exactly
- **Performance**: Mobile-first, reduced animations for mobile, 48px touch targets
- **Dependencies**: framer-motion and lucide-react need to be installed
- **Compatibility**: Must work with existing Header, Footer, layout patterns

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use framer-motion for animations | Reference file uses it, enables smooth filter/lightbox transitions | — Pending |
| Use lucide-react for icons | Reference file uses it, cleaner than inline SVGs | — Pending |
| Placeholder cards instead of real images | No images available yet, colored cards with icons as interim | — Pending |
| Before/after as optional per-project | Not all projects need before/after, data model supports both | — Pending |

---
*Last updated: 2026-02-16 after initialization*
