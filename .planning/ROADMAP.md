# Roadmap: Big Country Landscaping v3.1 — Mobile-First Presentation Polish

**Milestone:** v3.1 Mobile-First Presentation Polish
**Core value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.
**Depth:** Quick
**Coverage:** 43/43 v1 requirements mapped

---

## Milestone Context

v3.0 established the dark industrial brand, built all service pages, and delivered a pitch-ready site. v3.1 is a precision mobile audit — no visual redesign, no new pages. The work is finding and fixing gaps in the mobile experience: fluid typography, 44px touch targets, no horizontal scroll, safe-area padding for notched iPhones, forms that don't trigger iOS auto-zoom, and animation polish.

---

## Phase History

| Phase | Milestone | Goal | Status |
|-------|-----------|------|--------|
| 1 - Rebrand Foundation | v2.0 | Brand colors, logo, font, forms, seasonal bar live | Complete |
| 2 - Gallery Feature | v2.0 | Superseded by v3.0 | Absorbed |
| 3 - Equipment Roster + Polish | v2.0 | Superseded by v3.0 | Absorbed |
| 4 - Dark Theme Overhaul + Homepage Rebuild | v3.0 | Dark site, rebuilt hero, service pillars, nav, trust signals, CTA | Complete |

*Note: v3.0 Phases 5–6 (Gallery, Equipment, Services Polish) deferred. v3.1 mobile polish is higher priority for client demo. Those phases will be re-planned after v3.1 completes.*

---

## Phase 5: Global Foundation

**Goal:** Site-level mobile plumbing is correctly established in layout.tsx and globals.css so every subsequent phase builds on a solid base.

**Dependencies:** None (starting phase for v3.1)

**Requirements:** MFND-01, MFND-02, MFND-03, MFND-04, MFND-05, MTYP-01, MTYP-02, MTYP-03, MTYP-04, MTYP-05, MPERF-01

**Success Criteria:**

1. Opening the site on a 375px phone shows the browser chrome (status bar, address bar) in dark `#0f1f2d` — no jarring white or grey browser chrome on any page
2. Body text is at minimum 16px everywhere — tapping a form input in mobile Safari does not trigger viewport zoom
3. All headings scale fluidly between 375px and 1440px — a hero heading is large and bold on mobile and proportionally larger on desktop, with no fixed-size jumps at breakpoints
4. Tapping any button produces an instant tap response with no 300ms delay — rapid tapping confirms no lag
5. Scrolling any page vertically is smooth and anchor links animate to their target sections

---

## Phase 6: Navigation + Layout

**Goal:** Every navigation element has a comfortable tap target and no page produces horizontal scrolling at 375px viewport width.

**Dependencies:** Phase 5 (global touch-action and base styles must be in place)

**Requirements:** MLYT-01, MLYT-02, MLYT-03, MLYT-04, MLYT-05, MNAV-01, MNAV-02, MNAV-03, MNAV-04, MBTN-01, MBTN-02, MBTN-03, MBTN-04

**Success Criteria:**

1. On a 375px phone, dragging a finger horizontally anywhere on any page produces zero horizontal scroll — the page is locked to viewport width
2. The hamburger button, each mobile nav link, and the header "Get a Quote" button have tap targets of at least 44px — a thumb hits them without precision aiming
3. Opening and closing the mobile menu is animated — it slides or fades rather than snapping instantly open or closed
4. All page content has visible horizontal padding — no text, button, or image ever touches the left or right edge of the screen on mobile
5. Desktop side-by-side layouts (service pillars, why-cards, process steps, CTA splits) render as a single vertical column on a 375px phone

---

## Phase 7: Homepage Mobile Polish

**Goal:** The homepage is spectacular on a 375px phone — the hero loads fast, images are correctly sized, and safe-area padding works on notched iPhones.

**Dependencies:** Phase 6 (layout overflow must be clean before auditing components)

**Requirements:** MIMG-01, MIMG-02, MIMG-03, MIMG-04, MIMG-05, MENH-01, MENH-02

**Success Criteria:**

1. On a notched iPhone (iPhone 14 or 15), the MobileStickyCTA bar sits fully above the home indicator — no button is clipped by the device's safe area
2. On a notched iPhone, the fixed header does not overlap the status bar — content begins below the top safe area
3. The hero image is the first visible content and loads without layout shift — the page does not reflow as the hero photo arrives
4. Below-fold images (service pillar photos, why-cards) load lazily — they are visibly absent in DevTools network trace until scrolled into view
5. Service photo grid containers maintain their aspect ratio before images load — no height-zero collapse followed by expansion

---

## Phase 8: Service Pages Polish

**Goal:** All three service pages (Landscape Construction, Excavation, Snow Removal) have forms that work correctly on iOS and carousels with a native swipe feel.

**Dependencies:** Phase 6 (layout overflow clean), Phase 7 (image patterns established)

**Requirements:** MFRM-01, MFRM-02, MFRM-03, MFRM-04, MFRM-05, MENH-03, MENH-04

**Success Criteria:**

1. On iOS Safari, focusing any form input on any service page does not trigger viewport zoom — the page stays stable
2. Tapping a phone number field opens the numeric/phone keyboard on iOS; tapping the email field opens the email keyboard
3. Form labels appear stacked above their inputs on a 375px phone — no label sits beside its input in a cramped side-by-side arrangement
4. Swiping horizontally through the project showcase carousel on any service page snaps cleanly to each slide — no partial-slide state visible after releasing a swipe
5. Any horizontally scrollable strip (marquee, thumbnail row) responds to touch drag and scrolls smoothly — no dead zones where drag is ignored

---

## Phase 9: Performance + Animations

**Goal:** All CSS and Framer Motion animations are jank-free, use only compositor-safe properties, and respect the user's reduced-motion preference.

**Dependencies:** Phases 5–8 complete (full site as built is the audit target)

**Requirements:** MPERF-02, MPERF-03, MANIM-01, MANIM-02, MANIM-03

**Success Criteria:**

1. With OS "Reduce Motion" enabled, all carousels (ServicePillars crossfade, Testimonials slider) and entrance animations switch to instant transitions — no slide or fade motion plays
2. The marquee strip pauses or hides under `prefers-reduced-motion: reduce` — verified by toggling OS accessibility setting
3. Scrolling the homepage while ServicePillars crossfade and Testimonials auto-advance run shows no visible jank — scroll stays fluid at 60fps on a mid-range phone
4. No static, non-animating element in any component file has `will-change: transform` — a codebase search confirms no stray will-change on cards or containers
5. All CSS transitions animate only `transform` or `opacity` — no `width`, `height`, `top`, or `left` transitions remain in any component or globals.css

---

## Requirement Coverage Map

| Requirement | Phase | Status |
|-------------|-------|--------|
| MFND-01 | 5 | Pending |
| MFND-02 | 5 | Pending |
| MFND-03 | 5 | Pending |
| MFND-04 | 5 | Pending |
| MFND-05 | 5 | Pending |
| MTYP-01 | 5 | Pending |
| MTYP-02 | 5 | Pending |
| MTYP-03 | 5 | Pending |
| MTYP-04 | 5 | Pending |
| MTYP-05 | 5 | Pending |
| MPERF-01 | 5 | Pending |
| MLYT-01 | 6 | Pending |
| MLYT-02 | 6 | Pending |
| MLYT-03 | 6 | Pending |
| MLYT-04 | 6 | Pending |
| MLYT-05 | 6 | Pending |
| MNAV-01 | 6 | Pending |
| MNAV-02 | 6 | Pending |
| MNAV-03 | 6 | Pending |
| MNAV-04 | 6 | Pending |
| MBTN-01 | 6 | Pending |
| MBTN-02 | 6 | Pending |
| MBTN-03 | 6 | Pending |
| MBTN-04 | 6 | Pending |
| MIMG-01 | 7 | Pending |
| MIMG-02 | 7 | Pending |
| MIMG-03 | 7 | Pending |
| MIMG-04 | 7 | Pending |
| MIMG-05 | 7 | Pending |
| MENH-01 | 7 | Pending |
| MENH-02 | 7 | Pending |
| MFRM-01 | 8 | Pending |
| MFRM-02 | 8 | Pending |
| MFRM-03 | 8 | Pending |
| MFRM-04 | 8 | Pending |
| MFRM-05 | 8 | Pending |
| MENH-03 | 8 | Pending |
| MENH-04 | 8 | Pending |
| MPERF-02 | 9 | Pending |
| MPERF-03 | 9 | Pending |
| MANIM-01 | 9 | Pending |
| MANIM-02 | 9 | Pending |
| MANIM-03 | 9 | Pending |

**Total v1 requirements:** 43
**Mapped:** 43
**Unmapped:** 0

---

*Roadmap created: 2026-03-05*
*Milestone: v3.1 Mobile-First Presentation Polish*
*Supersedes: v3.0 ROADMAP.md phases 5–6 (deferred to post-v3.1)*
