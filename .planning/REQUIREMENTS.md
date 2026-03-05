# Requirements: Big Country Landscaping v3.1 — Mobile-First Presentation Polish

**Defined:** 2026-03-05
**Core Value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.

> **Milestone context:** v3.0 Phase 4 (dark theme + homepage) complete. v3.1 focuses on mobile experience quality — touch targets, fluid typography, no overflow, safe-area padding, form UX, and animation polish — to make the client demo on a phone spectacular.

---

## v1 Requirements

### Mobile Foundation (MFND)

- [ ] **MFND-01**: Viewport meta tag in layout.tsx uses `width=device-width, initial-scale=1.0, maximum-scale=5.0`
- [ ] **MFND-02**: theme-color meta tag set to `#0f1f2d` so browser chrome matches the dark site on mobile
- [ ] **MFND-03**: `globals.css` body sets `touch-action: manipulation` to eliminate 300ms tap delay site-wide
- [ ] **MFND-04**: `globals.css` sets `scroll-behavior: smooth` and `-webkit-tap-highlight-color: transparent` on root
- [ ] **MFND-05**: `globals.css` base styles are structured mobile-first — base rules for 0–479px, min-width media queries scale up

### Mobile Typography (MTYP)

- [ ] **MTYP-01**: Body text minimum font-size is 16px site-wide (prevents iOS auto-zoom when any input is focused)
- [ ] **MTYP-02**: Body text line-height minimum 1.5 site-wide for readability on small screens
- [ ] **MTYP-03**: Hero headings use `clamp()` for fluid scaling — minimum readable on 375px, maximum appropriate for desktop (e.g., `clamp(2.5rem, 8vw, 6rem)`)
- [ ] **MTYP-04**: Section headings (h2) across all pages use `clamp()` fluid scaling — proportionally smaller on mobile
- [ ] **MTYP-05**: All headings maintain Montserrat weight 800–900 and tight letter-spacing on mobile — no visual softening

### Mobile Layout (MLYT)

- [ ] **MLYT-01**: Zero horizontal scrolling on any page at 375px viewport width — verified with overflow-x audit
- [ ] **MLYT-02**: All containers have minimum 16px–20px horizontal padding on mobile so content never touches screen edges
- [ ] **MLYT-03**: No fixed-width elements (px-based width) wider than the mobile viewport remain in any component
- [ ] **MLYT-04**: All desktop side-by-side layouts (service pillars, why cards, process steps, CTA splits) stack vertically on mobile
- [ ] **MLYT-05**: Photo grids (services grid, why-cards) use CSS Grid with correct mobile column counts (1 col on mobile, 2 tablet, 3+ desktop)

### Mobile Navigation (MNAV)

- [ ] **MNAV-01**: Hamburger toggle button has minimum 44×44px tap target
- [ ] **MNAV-02**: Each mobile nav link has minimum 44px height tap target with at least 8px gap between items
- [ ] **MNAV-03**: Mobile menu opens/closes with smooth animation (slide-in or fade — no jarring instant swap)
- [ ] **MNAV-04**: Header "Get a Quote" button and phone CTA maintain minimum 44px height on mobile

### Mobile Images & Media (MIMG)

- [ ] **MIMG-01**: All `next/image` instances have correct `sizes` prop matching their actual rendered size at each breakpoint — no oversized image fetches
- [ ] **MIMG-02**: Hero image uses `sizes="100vw"` with `priority` for LCP optimization
- [ ] **MIMG-03**: All below-fold images use `loading="lazy"` (next/image default — verify no `priority` misuse)
- [ ] **MIMG-04**: Service page photo grids have explicit `aspect-ratio` on containers to prevent layout shift during image load
- [ ] **MIMG-05**: `<video>` elements (SnowRemovalPage) have `playsInline` attribute set for iOS autoplay compliance

### Mobile Buttons & Interactive (MBTN)

- [ ] **MBTN-01**: Every CTA button, filter button, nav link, and interactive element has minimum 44×44px touch target at 375px viewport
- [ ] **MBTN-02**: All buttons have minimum padding `py-3 px-6` (12px × 24px) — no undersized tap areas
- [ ] **MBTN-03**: Adjacent clickable elements have minimum 8px gap to prevent mis-taps
- [ ] **MBTN-04**: All interactive elements have visible `:active` / `active:` state — feedback on tap, not just hover

### Mobile Forms (MFRM)

- [ ] **MFRM-01**: All form inputs (hero quick-quote, contact form, service page CTA forms) are `w-full` on mobile
- [ ] **MFRM-02**: All form inputs have minimum `text-base` (16px) font-size — prevents iOS auto-zoom on focus
- [ ] **MFRM-03**: Phone number inputs use `type="tel"`, email inputs use `type="email"` — triggers correct mobile keyboards
- [ ] **MFRM-04**: Form field labels are stacked above their inputs on mobile (not inline/side-by-side)
- [ ] **MFRM-05**: Input fields have minimum `py-3` (12px) vertical padding for comfortable thumb interaction

### Mobile Performance (MPERF)

- [ ] **MPERF-01**: `touch-action: manipulation` applied to all buttons and links (eliminates 300ms tap delay on elements that override the global rule)
- [ ] **MPERF-02**: All CSS animations and transitions use only `transform` and `opacity` — no `width`, `height`, `top`, `left` transitions that trigger layout
- [ ] **MPERF-03**: `will-change` not present on any element that is not actively animating — no blanket `will-change: transform` on static cards

### Mobile Animations (MANIM)

- [ ] **MANIM-01**: All Framer Motion animations (SeasonalBar, ServicePillars crossfade, any entrance animations) respect `useReducedMotion()` — reduced-motion users see instant transitions
- [ ] **MANIM-02**: Testimonials slider and ServicePillars crossfade do not cause jank during momentum scroll on iOS
- [ ] **MANIM-03**: Marquee animation (globals.css `.animate-marquee`) pauses or disables under `prefers-reduced-motion: reduce`

### Mobile Enhancements (MENH)

- [ ] **MENH-01**: MobileStickyCTA bottom bar uses `padding-bottom: env(safe-area-inset-bottom)` for notched iPhones
- [ ] **MENH-02**: Fixed Header uses `padding-top: env(safe-area-inset-top)` for devices with tall status bars
- [ ] **MENH-03**: Service page carousels/project showcases (LandscapeConstruction, Excavation, SnowRemoval) use CSS `scroll-snap-type` for native swipe feel on mobile
- [ ] **MENH-04**: Any horizontally scrollable strip (marquee, thumbnail strip) is touch-scrollable with `-webkit-overflow-scrolling: touch`

---

## v2 Requirements

### Future Mobile Features

- **MOB-V2-01**: PWA manifest + service worker for offline viewing of gallery
- **MOB-V2-02**: Before/after photo swipe comparison slider
- **MOB-V2-03**: Push notifications for booking confirmations (requires backend)

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Redesigning visual aesthetic | Keep dark industrial brand established in v3.0 — mobile-first is polish, not rebrand |
| Gallery page (/gallery) | Deferred from v3.0 — v3.1 is mobile polish only; gallery is a separate feature build |
| Equipment Roster section | Deferred from v3.0 — same rationale |
| Backend/form submission | Static site, UI state only — out of scope per original PROJECT.md |
| Native app (iOS/Android) | Web-first; native is v5+ if ever |
| CSS framework change | Stay on Tailwind CSS v3 — no framework changes |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MFND-01 | Phase 5 | Pending |
| MFND-02 | Phase 5 | Pending |
| MFND-03 | Phase 5 | Pending |
| MFND-04 | Phase 5 | Pending |
| MFND-05 | Phase 5 | Pending |
| MTYP-01 | Phase 5 | Pending |
| MTYP-02 | Phase 5 | Pending |
| MTYP-03 | Phase 5 | Pending |
| MTYP-04 | Phase 5 | Pending |
| MTYP-05 | Phase 5 | Pending |
| MPERF-01 | Phase 5 | Pending |
| MLYT-01 | Phase 6 | Pending |
| MLYT-02 | Phase 6 | Pending |
| MLYT-03 | Phase 6 | Pending |
| MLYT-04 | Phase 6 | Pending |
| MLYT-05 | Phase 6 | Pending |
| MNAV-01 | Phase 6 | Pending |
| MNAV-02 | Phase 6 | Pending |
| MNAV-03 | Phase 6 | Pending |
| MNAV-04 | Phase 6 | Pending |
| MBTN-01 | Phase 6 | Pending |
| MBTN-02 | Phase 6 | Pending |
| MBTN-03 | Phase 6 | Pending |
| MBTN-04 | Phase 6 | Pending |
| MIMG-01 | Phase 7 | Pending |
| MIMG-02 | Phase 7 | Pending |
| MIMG-03 | Phase 7 | Pending |
| MIMG-04 | Phase 7 | Pending |
| MIMG-05 | Phase 7 | Pending |
| MENH-01 | Phase 7 | Pending |
| MENH-02 | Phase 7 | Pending |
| MFRM-01 | Phase 8 | Pending |
| MFRM-02 | Phase 8 | Pending |
| MFRM-03 | Phase 8 | Pending |
| MFRM-04 | Phase 8 | Pending |
| MFRM-05 | Phase 8 | Pending |
| MENH-03 | Phase 8 | Pending |
| MENH-04 | Phase 8 | Pending |
| MPERF-02 | Phase 9 | Pending |
| MPERF-03 | Phase 9 | Pending |
| MANIM-01 | Phase 9 | Pending |
| MANIM-02 | Phase 9 | Pending |
| MANIM-03 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 43 total
- Mapped to phases: 43
- Unmapped: 0

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 — traceability confirmed after ROADMAP.md creation*
