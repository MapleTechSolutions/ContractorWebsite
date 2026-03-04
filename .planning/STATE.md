# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-04)

**Core value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.
**Current focus:** Phase 4 - Dark Theme Overhaul + Homepage Rebuild

## Current Position

Phase: 4 of 6 (Dark Theme Overhaul + Homepage Rebuild)
Plan: 0 of TBD in current phase
Status: Phase 1 verified ✓ — v3.0 roadmap created — Phase 4 ready to plan
Last activity: 2026-03-04 — v3.0 milestone started; ROADMAP.md and STATE.md written for Phases 4–6

Progress: [███.......] ~17% (Phase 1 of 6 complete; 3 plans done total)

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: ~9 min
- Total execution time: ~0.45 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-rebrand-foundation | 3/3 | ~27 min | ~9 min |
| 04-dark-theme-homepage | 0/TBD | — | — |
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

### Pending Todos

None.

### Blockers/Concerns

None. v3.0 roadmap established. Phase 4 (Dark Theme Overhaul + Homepage Rebuild) ready to plan.

## Session Continuity

Last session: 2026-03-04
Stopped at: v3.0 roadmap created — Phases 4, 5, 6 defined with success criteria and requirement mappings
Resume file: None
Next action: Run /gsd:plan-phase 4
