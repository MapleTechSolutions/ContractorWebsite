---
phase: 04-dark-theme-homepage
plan: "03"
subsystem: ui
tags: [next-image, hero, trust-badges, conversion, lcp, photo-background]

# Dependency graph
requires:
  - phase: 04-02
    provides: hero-excavator.jpg staged at public/images/, always-dark header in place
provides:
  - Full-bleed machine photo hero background using next/image fill + priority (LCP element)
  - Dark overlay (bg-[#0f1f2d]/70) ensuring text legibility over photo
  - Three pill trust badges: Licensed & Insured, WCB Alberta, 24/7 Available
  - tel: link on Call Now button (CONV-01)
affects: [05-gallery-equipment, 06-services-content-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "next/image fill + priority + sizes=100vw for full-bleed LCP hero backgrounds"
    - "Dark overlay pattern: absolute inset-0 bg-[#0f1f2d]/70 over photo for text legibility"
    - "Trust pill badges: bg-white/10 border border-white/10 px-3 py-2 rounded-lg with accent icon"

key-files:
  created: []
  modified:
    - abc-roofing/src/components/Hero.tsx

key-decisions:
  - "next/image fill used with sizes=100vw — correct for full-bleed viewport-width images (D-407)"
  - "Overlay at 70% opacity (#0f1f2d/70) — dark enough for legibility, photo still visible beneath (D-408)"
  - "gradient-to-t from-[#0f1f2d]/40 added for bottom legibility — footer area of hero reads cleanest (D-409)"
  - "Trust badges replaced plain flex items — pill shape with bg-white/10 border adds visual weight without competing with CTA (D-410)"
  - "tel: link was already present from prior work — CONV-01 satisfied without additional change (D-411)"

patterns-established:
  - "LCP hero pattern: Image fill + priority + bg fallback on section — zero white flash, fast perceived load"
  - "Trust pill pattern: bg-white/10 + border-white/10 + rounded-lg + accent icon — reusable for any section needing trust indicators"

# Metrics
duration: 7min
completed: 2026-03-04
---

# Phase 4 Plan 03: Hero Photo Background + Trust Badges Summary

**Full-bleed machine photo hero via next/image fill (LCP priority), dark overlay for legibility, and three pill trust badges (Licensed & Insured, WCB Alberta, 24/7 Available)**

## Performance

- **Duration:** ~7 min
- **Started:** 2026-03-04T00:00:00Z
- **Completed:** 2026-03-04T00:07:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Replaced CSS gradient + blur orb divs with next/image fill using hero-excavator.jpg as LCP background
- Added dark overlay (bg-[#0f1f2d]/70) and subtle gradient-to-t for consistent text legibility across photo
- Replaced three plain text trust indicators with pill badge components (Licensed & Insured, WCB Alberta, 24/7 Available) satisfying CONV-02 and CONV-03
- Confirmed CONV-01 (Call Now tel: link) was already present — no regression

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace gradient background with photo + overlay** - `ed31eb7` (feat)
2. **Task 2: Upgrade trust indicators to pill badges** - `84c3cfa` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `abc-roofing/src/components/Hero.tsx` - Full-bleed photo background via next/image fill, dark overlay, pill trust badges

## Decisions Made

- next/image fill used with `sizes="100vw"` — correct sizing hint for full-viewport-width images; avoids unnecessary responsive image calculations
- Overlay at 70% opacity (`bg-[#0f1f2d]/70`) — dark enough that white text passes contrast requirements, light enough that the machine photo remains clearly visible
- `bg-gradient-to-t from-[#0f1f2d]/40 to-transparent` added alongside the flat overlay — bottom portion of hero reads cleanest with two layers
- Trust pills use `bg-white/10 border-white/10 rounded-lg` rather than a high-contrast background — visually elevated above bare text but don't compete with primary CTA
- `tel:` link confirmed already present from previous plan — CONV-01 satisfied, no change needed

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Hero section is now production-ready: real machine photo, dark overlay, three trust badges, tel link, form logic intact
- Plan 04-04 (remaining homepage sections or social proof) is unblocked
- Photo is staged as `/images/hero-excavator.jpg` — semantic correctness (which photo maps to which section) deferred to Plan 07 human checkpoint per D-406

---
*Phase: 04-dark-theme-homepage*
*Completed: 2026-03-04*
