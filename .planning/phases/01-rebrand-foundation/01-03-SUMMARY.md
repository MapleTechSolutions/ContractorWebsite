---
phase: "01"
plan: "03"
name: "Forms and Seasonal Bar"
subsystem: "ui-components"
tags: ["seasonal-bar", "hero", "contact", "forms", "ui-state", "brand-content"]

dependency-graph:
  requires: ["01-01"]
  provides:
    - "SeasonalBar component with sessionStorage dismiss"
    - "seasonal.ts data file (active spring 2026 message)"
    - "Hero.tsx fully rewritten with Big Country content and form submit state"
    - "Contact.tsx with correct identity, service options, and contact info"
  affects: ["02-gallery", "02-services"]

tech-stack:
  added: []
  patterns:
    - "Client Component with useEffect/sessionStorage for SSR-safe state"
    - "Shared formStatus state ('idle' | 'loading' | 'success') across responsive form layouts"
    - "Data file pattern for CMS-switchable content (seasonal.ts)"

key-files:
  created:
    - "abc-roofing/src/data/seasonal.ts"
    - "abc-roofing/src/components/SeasonalBar.tsx"
  modified:
    - "abc-roofing/src/app/layout.tsx"
    - "abc-roofing/src/components/Hero.tsx"
    - "abc-roofing/src/components/Contact.tsx"

decisions:
  - id: "D-301"
    decision: "SeasonalBar uses sticky top-0 z-[60] (not fixed) so it scrolls away naturally while fixed Header z-50 persists"
    rationale: "No JS or CSS offset needed — simpler implementation, correct UX"
  - id: "D-302"
    decision: "formStatus state is shared between Hero desktop and mobile forms (single useState)"
    rationale: "Both forms are never visible simultaneously (responsive breakpoints) so shared state is correct and simpler"
  - id: "D-303"
    decision: "Contact.tsx handleSubmit preserved verbatim — no backend, fake setTimeout is intentional"
    rationale: "Project requirement: UI state only, no real form submission"

metrics:
  duration: "5 min"
  tasks-completed: 3
  completed: "2026-03-04"
---

# Phase 1 Plan 03: Forms and Seasonal Bar Summary

**One-liner:** Amber sessionStorage-dismissable SeasonalBar live above header, Hero rewritten with Big Country punch headline and 800ms form submit state, Contact updated with (587) 555-1234 and excavation/snow service options.

## What Was Built

### Task 1 — SeasonalBar Component and Data File (commit: f706c0e)

Created `src/data/seasonal.ts` as the single source of truth for the announcement bar content. Created `src/components/SeasonalBar.tsx` as a Client Component that:
- Starts hidden (state `false`) to avoid SSR hydration mismatch
- Reads sessionStorage in `useEffect` (client-only) and shows bar if not dismissed
- Dismisses via X button, sets `DISMISS_KEY` in sessionStorage
- Returns `null` when not visible — no layout shift
- `sticky top-0 z-[60]` amber (`#F5A623`) bar with dark text (`#0f1f2d`)

Activated SeasonalBar import and JSX in `layout.tsx`, replacing the `TODO: Plan 01-03` comment slot left by Plan 01-01.

### Task 2 — Hero.tsx Rewrite (commit: 672d4cd)

Full content and brand replacement:
- Headline: "Big Country Work." / "Professional Results." (amber second line)
- Subtext: commercial excavation and snow removal across Big Country, Alberta
- Badge: "Now Booking Commercial Contracts"
- Trust badges: WCB Alberta Compliant, Alberta One-Call Certified, Free Site Estimates
- Stats: 15+ Years, Commercial Contracts, 24/7 Snow Response, Alberta One-Call
- Phone: `tel:+15875551234` / (587) 555-1234
- Service options: Excavation, Snow Removal, Site Prep, Other

Form state added:
- `formStatus: 'idle' | 'loading' | 'success'`
- `handleSubmit`: `e.preventDefault()` + 800ms setTimeout → success
- Desktop form and mobile expandable form both have `onSubmit={handleSubmit}`
- Loading: animated spinner + "Sending..."
- Success: amber checkmark circle + "Request Received" + one business day copy
- All legacy hex values replaced (`#094026` → `#0f1f2d`, `#FCB215` → `#F5A623`, etc.)

### Task 3 — Contact.tsx Updates (commit: e046f58)

Content updates only (handleSubmit logic preserved):
- Phone: `tel:+15875551234` / (587) 555-1234
- Email: `info@bigcountrylandscaping.ca`
- Heading: "Request a Site Estimate"
- Intro: free site estimate for excavation or commercial snow removal
- Service dropdown: Excavation, Snow Removal, Site Prep, Other
- Hours: Mon-Fri 7AM-6PM + On-Call for Snow
- "Free Site Estimates" label
- Success: "Request Received" + "within one business day"
- Submit button: "Send Request"
- All legacy hex values replaced

## Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| D-301 | SeasonalBar sticky (not fixed) | Scrolls away naturally, no JS offset needed |
| D-302 | Shared formStatus across both Hero forms | Responsive — both never visible simultaneously |
| D-303 | Contact handleSubmit preserved verbatim | Intentional fake timeout, no backend required |

## Verification Results

- `src/data/seasonal.ts` exports `seasonalMessage` with `active: true`
- `src/components/SeasonalBar.tsx` has `"use client"` directive
- `layout.tsx` imports SeasonalBar above Header (comment slot activated)
- Hero headline markup: `<span className="block">Big Country Work.</span>` + amber second line
- Hero phone: `href="tel:+15875551234"`
- No legacy hex `#094026` or `#FCB215` in Hero.tsx or Contact.tsx
- No `info@company.com` or `5551234567` in Contact.tsx
- Contact service dropdown: Excavation, Snow Removal, Site Prep, Other only

## Deviations from Plan

None — plan executed exactly as written.

## Next Phase Readiness

Plan 01-03 completes the Phase 1 "Rebrand Foundation" wave 2 tasks. All three Phase 1 plans (01-01, 01-02, 01-03) are now complete. Phase 2 (Gallery and Portfolio) can begin.

Key things Phase 2 should know:
- SeasonalBar renders above all page content — Phase 2 page layouts will account for sticky bar height
- Hero form success state resets via page navigation — no explicit reset needed in Phase 2
- Contact.tsx service options locked to: Excavation, Snow Removal, Site Prep, Other
