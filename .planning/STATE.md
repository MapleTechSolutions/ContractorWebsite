# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-04)

**Core value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.
**Current focus:** Phase 4 - Dark Theme Overhaul + Homepage Rebuild

## Current Position

Phase: 4 of 6 (Dark Theme Overhaul + Homepage Rebuild)
Plan: 1 of TBD in current phase
Status: In progress — 04-01 complete (dark body bg + colorScheme)
Last activity: 2026-03-04 — Completed 04-01-PLAN.md (global dark theme foundation)

Progress: [████......] ~22% (Phase 1 of 6 complete + Plan 04-01; 4 plans done total)

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: ~8 min
- Total execution time: ~0.53 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-rebrand-foundation | 3/3 | ~27 min | ~9 min |
| 04-dark-theme-homepage | 1/TBD | ~5 min | ~5 min |
| 05-gallery-equipment | 0/TBD | — | — |
| 06-services-content-polish | 0/TBD | — | — |

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Install: framer-motion, lucide-react, yet-another-react-lightbox, sharp (all installed in v2.0 Phase 1)
- Lightbox: Use yet-another-react-lightbox (NOT react-image-lightbox — abandoned in 2022, breaks on React 18)
- Forms: UI state only — NO Formspree, no real backend (per 01-01 key decisions)
- Font: Montserrat loaded via next/font/google with --font-montserrat CSS variable (DONE in 01-01)
- Color tokens: Define in tailwind.config.ts extend.colors NOT @theme{} — this is Tailwind v3 (DONE in 01-01)
- Brand colors confirmed: brand-dark #0f1f2d, brand-mid #2d4f64, brand-light #3d6882, brand-accent #F5A623, brand-surface #f7f4ef
- abc-roofing/ is a nested git repository — commit source code changes in inner repo, planning docs in outer repo
- SeasonalBar: sticky top-0 z-[60], scrolls away naturally, fixed Header z-50 persists below it (D-301)
- Hero formStatus shared between desktop and mobile forms — both never show simultaneously (D-302)
- Contact handleSubmit preserved verbatim — intentional fake setTimeout, no backend (D-303)
- v2.0 Phases 2–3 (Gallery Feature, Equipment Roster + Polish) absorbed into v3.0 — redesign touches those components anyway, no point building on light theme first
- Dark theme is near-black (#0f1f2d or darker) as the dominant background — not dark-grey, not charcoal, near-black
- Typography: headings at weight 800 or 900, tight letter-spacing — industrial, not soft
- Competitor reference for dark aesthetic: Blackrock Excavating
- Client photos on hand: Kobelco excavator on job site, mini-ex with worker, Deere track loader doing night snow removal

- body background set to raw CSS `background: #0f1f2d` (not Tailwind class) — fires at CSS parse time, eliminates white flash before hydration (D-401)
- sticky-cta-mobile uses `border-white/10` for subtle separator on dark bg (D-402)
- Dark canvas is now default — Phase 4 component changes build on dark, not override light (D-403)

### Pending Todos

None.

### Blockers/Concerns

None. v3.0 roadmap established. Phase 4 (Dark Theme Overhaul + Homepage Rebuild) ready to plan.

## Session Continuity

Last session: 2026-03-04
Stopped at: Completed 04-01-PLAN.md — global dark theme foundation (body bg + colorScheme)
Resume file: None
Next action: Execute 04-02-PLAN.md
