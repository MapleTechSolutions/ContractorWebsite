---
phase: 04-dark-theme-homepage
plan: "02"
subsystem: ui
tags: [dark-theme, header, mobile-menu, navigation, client-photos, next-image, always-dark]

# Dependency graph
requires:
  - 04-01 (dark body background established — header now builds on dark canvas, not overriding light)
  - 01-01 (brand color tokens: #0f1f2d, #F5A623, --font-montserrat)
provides:
  - Always-dark sticky header (bg-[#0f1f2d]/80 unscrolled, bg-[#0f1f2d]/95 scrolled — never white)
  - Dark full-screen mobile menu overlay (bg-[#0f1f2d] backdrop, white nav links, amber borders)
  - Three client photos staged in abc-roofing/public/images/ ready for next/image
affects: [04-03, 04-04, 04-05, 04-06 — hero and service pillars can now reference photo files]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Always-dark header: isScrolled only controls opacity (80% → 95%) and blur, not color scheme
    - White-on-dark nav: text-white/80 default, text-[#F5A623] active/hover — no scroll-conditional color flip
    - Dark mobile overlay: bg-[#0f1f2d] backdrop replaces bg-white; border-white/10 separators

key-files:
  created:
    - abc-roofing/public/images/hero-excavator.jpg
    - abc-roofing/public/images/excavation-pillar.jpg
    - abc-roofing/public/images/snow-pillar.jpg
  modified:
    - abc-roofing/src/components/Header.tsx

key-decisions:
  - "Header scroll state retained — isScrolled still controls opacity/blur only (not color). Subtle depth effect on scroll without any color scheme flip."
  - "Mobile menu font-black (900) applied to nav links — industrial weight matches brand direction"
  - "hero-excavator.jpg sourced from 'big country.jpg' (smaller, more branded shot); correctness of image placement verified in Plan 07 human checkpoint"

patterns-established:
  - "Always-dark header: never transparent to white — scroll only adjusts opacity/blur depth"
  - "Mobile overlay pattern: bg-[#0f1f2d] full-screen, border-white/10 separators, white text on dark"

# Metrics
duration: ~8min
completed: 2026-03-04
---

# Phase 4 Plan 02: Header Dark Rebuild + Photo Staging Summary

**Always-dark sticky header with bg-[#0f1f2d]/80-to-95 scroll transition, full-screen dark mobile overlay, and three client photos staged in public/images/ for next/image use**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-04T18:51:00Z
- **Completed:** 2026-03-04T18:59:00Z
- **Tasks:** 2
- **Files modified:** 4 (1 component, 3 photos created)

## Accomplishments

- Header rebuilt: no more transparent-to-white scroll transition — always `bg-[#0f1f2d]` with opacity varying from 80% (unscrolled) to 95% (scrolled)
- Desktop nav links simplified: eliminated isScrolled color fork — always `text-white/80 hover:text-[#F5A623]` (amber on active/hover)
- Mobile menu overlay changed from `bg-white` (glaring) to `bg-[#0f1f2d]` — full-screen dark panel with white nav links, amber active state, `border-white/10` separators, and `font-black` weight
- Mobile menu button: always white text, never dark-on-light — eliminates jarring contrast switch
- Three client photos staged: hero-excavator.jpg, excavation-pillar.jpg, snow-pillar.jpg — unblocks Plan 03 (Hero) and Plan 04 (ServicePillars)
- Build passes cleanly: 11 static pages, 0 TypeScript errors

## Task Commits

Each task was committed atomically (in abc-roofing inner git repository):

1. **Task 1: Stage client photos into public/images/** — `70dedd7` (chore)
2. **Task 2: Rebuild Header.tsx as always-dark with dark mobile overlay** — `9738bbf` (feat)

_Note: Commits are in abc-roofing inner git repository._

## Files Created/Modified

- `abc-roofing/public/images/hero-excavator.jpg` — Client photo (big country.jpg) for Hero background
- `abc-roofing/public/images/excavation-pillar.jpg` — Client photo (504077954) for Excavation service pillar
- `abc-roofing/public/images/snow-pillar.jpg` — Client photo (504342873) for Snow Removal service pillar
- `abc-roofing/src/components/Header.tsx` — Always-dark header, simplified nav color logic, dark mobile overlay

## Decisions Made

- Header scroll state retained: `isScrolled` still fires, only controls opacity (80% → 95%) and `backdrop-blur-sm` depth. No color scheme changes on scroll. This gives a subtle polished feel without ever revealing a light background.
- `font-black` (weight 900) applied to mobile nav links — matches the industrial heading weight established in brand direction (Blackrock Excavating aesthetic reference).
- Photo file mapping follows plan spec: `big country.jpg` → `hero-excavator.jpg`, long-number files → service pillars. Semantic correctness of image-to-section match is deferred to Plan 07 human checkpoint.

## Deviations from Plan

None — plan executed exactly as written. All className substitutions matched the plan's FROM/TO spec. Build passed first attempt.

## Issues Encountered

None. The `bg-white/10` occurrences found in verification grep are correct — they are transparent-white overlays on the dark background (mobile button hover, phone button bg), not light theme artifacts.

## User Setup Required

None.

## Next Phase Readiness

- Header is dark and stable — Plans 03 and 04 can build Hero and ServicePillars without worrying about header color conflicts
- Three photos are staged at exact paths referenced in Plans 03/04: `hero-excavator.jpg`, `excavation-pillar.jpg`, `snow-pillar.jpg`
- No blockers for Plan 04-03 (Hero section rebuild)

---
*Phase: 04-dark-theme-homepage*
*Completed: 2026-03-04*
