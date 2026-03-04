---
phase: 04-dark-theme-homepage
plan: "04"
subsystem: ui
tags: [dark-theme, service-pillars, next-image, server-component, photo-backgrounds, conversion]

# Dependency graph
requires:
  - 04-02 (photos staged: excavation-pillar.jpg, snow-pillar.jpg exist in public/images/)
  - 01-01 (brand color tokens: #0f1f2d, #F5A623, btn-primary, section-padding, container-custom)
provides:
  - ServicePillars server component with two photo-backed pillar cards in md:grid-cols-2 layout
  - 24/7 Storm Response amber pill badge on Snow Removal pillar (CONV-03)
affects: [04-05, 04-06 — homepage page.tsx wires ServicePillars in place of ServicesPreview]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Photo pillar pattern: relative container + Image fill + gradient-to-t overlay + absolute bottom-anchored content
    - Gradient legibility: from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20 — heavy bottom taper preserves photo texture at top
    - Conversion badge: bg-[#F5A623] text-[#0f1f2d] pill on Snow pillar — amber-on-dark for immediate visibility
    - Responsive sizing: sizes="(min-width: 768px) 50vw, 100vw" on both images — correct half-width hint on desktop

key-files:
  created:
    - abc-roofing/src/components/ServicePillars.tsx
  modified: []

key-decisions:
  - "ServicePillars is a new server component — ServicesPreview kept intact for /services page reuse"
  - "Data defined inline in component — no separate data file needed for two static pillars"
  - "em dash (—) used as amber bullet marker — industrial feel without SVG overhead"
  - "min-h-[420px] mobile / min-h-[560px] desktop — ensures tall pillar cards that show off photos"

patterns-established:
  - "Photo pillar: relative overflow-hidden card + Image fill object-cover + gradient overlay + absolute flex-col justify-end content"
  - "Conversion badge placement: above h3 inside pillar content area, amber solid pill on dark"

# Metrics
duration: ~5min
completed: 2026-03-04
---

# Phase 4 Plan 04: ServicePillars Component Summary

**Server component with two photo-backed pillar cards (excavation + snow removal), gradient overlays, sub-service lists, amber 24/7 Storm Response badge, and Learn More CTAs — replacing ServicesPreview on the homepage**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-04T19:05:00Z
- **Completed:** 2026-03-04T19:10:00Z
- **Tasks:** 1
- **Files created:** 1

## Accomplishments

- Created `ServicePillars.tsx` as a pure server component (no `"use client"`, no state, no effects)
- Excavation pillar: `excavation-pillar.jpg` fill image, gradient overlay, 5 sub-service items anchored bottom-left, Learn More CTA
- Snow Removal pillar: `snow-pillar.jpg` fill image, gradient overlay, amber `24/7 Storm Response` pill badge (CONV-03), 5 sub-service items, Learn More CTA
- Both images use `sizes="(min-width: 768px) 50vw, 100vw"` — correct responsive optimization for half-width desktop layout
- Gradient pattern `from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20` ensures text legibility while preserving photo texture at top
- Build passes cleanly: 11 static pages, 0 TypeScript errors

## Task Commits

Committed atomically in abc-roofing inner git repository:

1. **Task 1: Create ServicePillars.tsx as a server component** — `3ff9424` (feat)

_Note: Commits are in abc-roofing inner git repository._

## Files Created/Modified

- `abc-roofing/src/components/ServicePillars.tsx` — Two-pillar server component with photo backgrounds, gradient overlays, sub-service lists, 24/7 badge, Learn More CTAs

## Decisions Made

- `ServicePillars` is a new, separate component. `ServicesPreview` is left untouched — it remains usable on the `/services` page without modification.
- Service data (titles, items, badge) defined inline rather than in a separate data file. Two static pillars don't justify an external data module.
- Em dash (`—`) used as the amber bullet marker for each sub-service item — simple, industrial, avoids SVG import overhead.
- `min-h-[420px]` on mobile, `md:min-h-[560px]` on desktop — ensures pillar cards are tall enough to showcase the client photos meaningfully.

## Deviations from Plan

None — plan executed exactly as written. Component structure matches the plan's JSX spec verbatim. Build passed first attempt.

## Issues Encountered

None.

## User Setup Required

None. Photos were staged in Plan 04-02. Component references existing paths.

## Next Phase Readiness

- `ServicePillars` is ready to be imported and wired into the homepage `page.tsx` (Plan 04-05 or 04-06)
- No blockers for remaining Phase 4 plans

---
*Phase: 04-dark-theme-homepage*
*Completed: 2026-03-04*
