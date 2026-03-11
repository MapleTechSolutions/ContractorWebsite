---
phase: "01"
plan: "02"
name: "content-pass"
subsystem: "content"
tags: ["content", "rebrand", "components", "metadata", "seo"]
status: complete

dependency-graph:
  requires: ["01-01"]
  provides: ["big-country-content-identity", "correct-page-metadata", "bigcountrylandscaping.ca-sitemap"]
  affects: ["01-03"]

tech-stack:
  added: []
  patterns: ["inline-data-arrays", "tsx-component-content-replacement"]

file-tracking:
  key-files:
    created: []
    modified:
      - abc-roofing/src/components/ServicesPreview.tsx
      - abc-roofing/src/components/WhyChooseUs.tsx
      - abc-roofing/src/components/CTASection.tsx
      - abc-roofing/src/components/MobileStickyCTA.tsx
      - abc-roofing/src/components/TestimonialsPreview.tsx
      - abc-roofing/src/components/AboutPreview.tsx
      - abc-roofing/src/components/Services.tsx
      - abc-roofing/src/components/About.tsx
      - abc-roofing/src/app/about/page.tsx
      - abc-roofing/src/app/services/page.tsx
      - abc-roofing/src/app/contact/page.tsx
      - abc-roofing/src/app/reviews/page.tsx
      - abc-roofing/src/app/sitemap.ts
      - abc-roofing/src/app/robots.ts

decisions:
  - id: "D-01-02-01"
    summary: "ServicesPreview uses 2-column grid at md breakpoint"
    rationale: "Only 2 services — 2 columns renders better than lg:grid-cols-3 would with an empty slot"
  - id: "D-01-02-02"
    summary: "TestimonialsPreview uses md:grid-cols-2 lg:grid-cols-4"
    rationale: "4 testimonials require 4-column layout on wide screens; 2-column on tablet is clean"
  - id: "D-01-02-03"
    summary: "AboutPreview visual placeholder updated with excavator icon and 'Moving Earth Since 2009' text"
    rationale: "Plan specified the label replacement; used excavator SVG path to reinforce heavy equipment identity"

metrics:
  duration: "7 min"
  tasks-completed: 3
  files-modified: 14
  completed: "2026-03-04"
---

# Phase 01 Plan 02: Content Pass Summary

**One-liner:** Full content replacement across all 14 site components and pages — Big Country excavation/snow removal identity, WCB/One-Call trust signals, commercial testimonials, and bigcountrylandscaping.ca domain throughout.

## What Was Built

Every visible string on the site now reads Big Country Landscaping. Generic contractor placeholder content (roofing, residential renovation, "(555) 123-4567", "yourcompany.com") has been replaced across all components and pages.

### Task 1 — Homepage Section Components: ServicesPreview, WhyChooseUs, CTASection, MobileStickyCTA
Commit: `2ff22fa`

- **ServicesPreview**: 6 generic service cards replaced with 2 cards — "Excavation" and "Snow Removal" — each with sub-item bullet lists and new icons. Grid moved to `md:grid-cols-2`.
- **WhyChooseUs**: reasons array replaced with 6 Big Country trust reasons (WCB Alberta, Alberta One-Call, Commercial Equipment, 24/7 Snow, Free Estimates, 15+ Years). CTA banner heading and phone updated to `tel:+15875551234` / `(587) 555-1234`.
- **CTASection**: heading and copy updated for commercial identity; phone updated; trust badges replaced with "Free Site Estimates", "WCB Alberta Compliant", "Alberta One-Call Certified".
- **MobileStickyCTA**: phone → `tel:+15875551234`; CTA label → "Get a Quote"; hex tokens all replaced with brand colors.

### Task 2 — Homepage Section Components: TestimonialsPreview, AboutPreview
Commit: `6b609cb`

- **TestimonialsPreview**: 3 homeowner testimonials replaced with 4 commercial-voice testimonials (Dave K. / Strathmore Commercial Properties, Rob M. / Prairie Build Ltd., Carla B. / Drumheller Mall, Tyler J. / Foothills Land Corp). Grid updated to `md:grid-cols-2 lg:grid-cols-4`. Section header updated to "What Commercial Clients Say".
- **AboutPreview**: heading → "Heavy Equipment. Reliable Service."; paragraphs rewritten for Big Country commercial identity; feature badges replaced with WCB Alberta Registered, Fully Insured, Big Country Region AB, Alberta One-Call Certified; visual placeholder text → "Moving Earth Since 2009"; CTA → "About Big Country".

### Task 3 — Services.tsx, About.tsx, Page Metadata, Sitemap, Robots
Commit: `039bf82`

- **Services.tsx**: 5-service array replaced with 2 — "excavation" and "snow-removal" — with accurate features lists. Default active state → `"excavation"`. Section header → "The Work We Do".
- **About.tsx**: full content replacement for commercial identity; floating badge → "Commercial Fleet" / "Since 2009"; client count → "50+" / "Commercial Contracts"; CTA → "Get a Site Estimate".
- **app/about/page.tsx**: metadata updated; page header → "About Big Country"; gradient → brand-dark/brand-mid.
- **app/services/page.tsx**: metadata updated; page header → "Our Services".
- **app/contact/page.tsx**: metadata updated; page header → "Request a Site Estimate"; map placeholder → "Serving Big Country Region, Alberta" / "Drumheller, Hanna, Stettler, and surrounding communities".
- **app/reviews/page.tsx**: metadata updated; page header → "Client Reviews".
- **sitemap.ts**: `baseUrl` → `https://bigcountrylandscaping.ca`.
- **robots.ts**: sitemap URL → `https://bigcountrylandscaping.ca/sitemap.xml`.

## Verification Results

| Check | Result |
|-------|--------|
| ServicesPreview shows exactly 2 services: Excavation and Snow Removal | PASS |
| ServicesPreview Excavation lists Site Clearing, Utility Trenching | PASS |
| WhyChooseUs reason 01 = "WCB Alberta Compliant" | PASS |
| WhyChooseUs CTA button = "Get a Quote" | PASS |
| CTASection phone href = `tel:+15875551234` | PASS |
| CTASection trust badges include WCB and One-Call | PASS |
| MobileStickyCTA href = `tel:+15875551234` | PASS |
| TestimonialsPreview shows 4 testimonials (Dave K., Rob M., Carla B., Tyler J.) | PASS |
| First testimonial references "Strathmore Commercial Properties" | PASS |
| AboutPreview heading contains "Heavy Equipment" | PASS |
| About.tsx mentions "Big Country region of Alberta" | PASS |
| Services.tsx `services` array length = 2 | PASS |
| Services.tsx Excavation features include "Utility Trenching" | PASS |
| Services.tsx Snow Removal features include "24/7 Storm Response" | PASS |
| app/about/page.tsx metadata title contains "Big Country Landscaping" | PASS |
| app/services/page.tsx metadata description mentions "excavation" and "snow removal" | PASS |
| sitemap.ts contains `bigcountrylandscaping.ca` — zero `yourcompany.com` | PASS |
| robots.ts sitemap URL references `bigcountrylandscaping.ca` | PASS |
| Grep for `#094026` across all modified files → 0 results | PASS |

## Deviations from Plan

None — plan executed exactly as written.

## Decisions Made

| ID | Decision | Where Applied |
|----|----------|---------------|
| D-01-02-01 | ServicesPreview uses `md:grid-cols-2` (not 3) | `ServicesPreview.tsx` |
| D-01-02-02 | TestimonialsPreview uses `md:grid-cols-2 lg:grid-cols-4` | `TestimonialsPreview.tsx` |
| D-01-02-03 | Visual placeholder updated with excavator icon | `AboutPreview.tsx` |

## What Plan 01-03 Needs to Know

- All CTA phone links now consistently use `tel:+15875551234` / `(587) 555-1234`
- All CTA button text is "Get a Quote" (not "Free Estimate" — that label is gone)
- Page header gradients are now `from-[#0f1f2d] via-[#2d4f64] to-[#0f1f2d]` (Hero.tsx will need same treatment)
- No legacy hex `#094026`, `#FCB215`, `#063d22`, `#0a5530` remain in any modified file

## Next Phase Readiness

Plan 01-03 (Hero + Contact + SeasonalBar) can proceed. The content identity is stable — all supporting sections reference the correct company, services, phone number, and trust credentials. Hero.tsx and Contact.tsx remain untouched as specified.
