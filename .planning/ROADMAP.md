# Roadmap: Big Country Landscaping v3.0 Industrial Redesign

**Milestone:** v3.0 Industrial Redesign
**Core value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.
**Total phases:** 3 (Phases 4–6, continuing from v2.0 Phase 1 complete)
**Total plans:** TBD — determined per phase during planning

---

## Phase History (v2.0)

| Phase | Goal | Status |
|-------|------|--------|
| 1 - Rebrand Foundation | Brand colors, logo, font, forms, seasonal bar live | Complete ✓ |
| 2 - Gallery Feature | Superseded by v3.0 Phase 5 | Absorbed |
| 3 - Equipment Roster + Polish | Superseded by v3.0 Phases 5–6 | Absorbed |

---

## Phase 4: Dark Theme Overhaul + Homepage Rebuild

**Goal:** Every visitor to the homepage sees a dark, machine-forward site — near-black backgrounds throughout, a full-bleed hero with bold white headline and yellow CTA, two service pillars with dedicated photos, a numbered trust section, testimonials on dark, a final CTA banner, and a redesigned sticky nav — the site no longer looks light or generic.

**Dependencies:** Phase 1 (v2.0) complete — brand color tokens, Montserrat font, logo, and SeasonalBar are already in place. This phase rebuilds on top of that foundation.

**Requirements:** VSRL-01, VSRL-02, VSRL-03, VSRL-04, VSRL-05, NAV-01, NAV-02, HOME-01, HOME-02, HOME-03, HOME-06, HOME-07, CONV-01, CONV-02, CONV-03, CONV-04, CONV-05, CONT-03

**Plans:** 7 plans

Plans:
- [ ] 04-01-PLAN.md — Global dark foundation (globals.css body flip, layout.tsx colorScheme)
- [ ] 04-02-PLAN.md — Header always-dark rebuild + photo staging to public/images/
- [ ] 04-03-PLAN.md — Hero photo background + trust badge pill upgrade
- [ ] 04-04-PLAN.md — ServicePillars.tsx new component (photo pillar cards)
- [ ] 04-05-PLAN.md — WhyBigCountry.tsx + CTABanner.tsx new components
- [ ] 04-06-PLAN.md — Testimonials.tsx dark reskin
- [ ] 04-07-PLAN.md — page.tsx wiring + MobileStickyCTA dark colors + human verify

### Success Criteria

- [ ] Opening the site on any page shows a dark near-black background as the dominant surface — no white or light-grey content areas remain as the primary background on any page
- [ ] The hero section fills the viewport edge-to-edge with a machine photo, a dark overlay, a white headline at weight 800+, a yellow "Get a Quote" CTA button, and a "Call Now" tel: link — no soft background or light card visible in the hero
- [ ] The sticky header is a dark bar showing the Big Country logo, max 6 nav links, a tappable phone number, and a "Get a Quote" button — all visible on scroll on both desktop and a 390px phone
- [ ] The homepage scrolls through two equal service pillar sections (Excavation and Snow Removal), a numbered "Why Big Country" section with accent-colored numbers 01–04, a dark-background testimonials section, and a final CTA banner before the footer — all present in order, no placeholder content
- [ ] Submitting the hero quick-quote form or the contact form shows a loading state followed by a success confirmation — and trust badges (WCB Alberta, Licensed & Insured, 24/7 Available) are visible on the homepage

---

## Phase 5: Gallery + Equipment Roster

**Goal:** Visitors can browse real project photos on a dedicated gallery page with category filters and full-screen lightbox navigation, an Equipment Roster section on the homepage shows key machines with photo slots, a gallery preview section appears on the homepage, and Gallery is wired into both the desktop nav and mobile menu.

**Dependencies:** Phase 4 must be complete — gallery and roster components inherit the dark theme established in Phase 4, and the Gallery nav link extends the Phase 4 header redesign.

**Requirements:** NAV-03, HOME-04, HOME-05, GALL-01, GALL-02, GALL-03, GALL-04, GALL-05, ROST-01, ROST-02, ROST-03

### Success Criteria

- [ ] Visiting /gallery shows a responsive grid of project cards (1 column on 390px mobile, 2 on tablet, 3 on desktop) with filter buttons for All, Excavation, Snow Removal, and Site Prep — the Gallery link is present in both the desktop nav bar and the mobile menu
- [ ] Clicking a filter button shows only matching cards and hides the rest; selecting a category with no photos shows a clear empty-state message; clicking All restores the full grid
- [ ] Clicking any gallery photo opens a full-screen lightbox with visible close, previous, and next controls; swiping left or right on a phone navigates photos; pressing ESC or arrow keys on desktop also navigates
- [ ] The homepage shows an Equipment Roster section with a card for each machine (at least 4 entries) displaying the machine name, type badge, description, and a correctly sized photo slot
- [ ] A "See Our Work" gallery preview section is visible on the homepage above the footer with 3–6 sample project photos and a link through to /gallery

---

## Phase 6: Services Deep Dive + Content + Polish

**Goal:** The services page gives commercial clients full detail on Excavation and Snow Removal offerings with dedicated hero photos and sub-service lists, the about page tells Big Country's commercial story, all page copy is free of residential language, and the full site passes a mobile and accessibility audit — 48px touch targets, reduced-motion compliance, ARIA labels, zero plain img tags, and zero legacy hex values.

**Dependencies:** Phases 4 and 5 must be complete — the services page inherits the dark theme and interactive patterns (gallery, nav) established in earlier phases; the accessibility audit must cover all components including gallery and lightbox.

**Requirements:** SERV-01, SERV-02, SERV-03, CONT-01, CONT-02, MOBI-01, MOBI-02, MOBI-03, MOBI-04, MOBI-05

### Success Criteria

- [ ] The services page has two clearly separated sections — Excavation & Site Work and Snow & Ice Removal — each with a dedicated hero photo, a paragraph description, a full sub-service list, and a "Call for a Quote" CTA
- [ ] Every page on the site uses commercial contractor framing — no residential lawn service language ("yard", "lawn", "homeowner", etc.) appears anywhere in the visible copy
- [ ] Every interactive element across the full site (nav links, gallery filter buttons, CTA buttons, lightbox controls, form inputs, mobile sticky CTA) presents a minimum 48px touch target verified on a 390px viewport
- [ ] Loading the site with prefers-reduced-motion enabled produces no animated gallery grid reflows or card entrance animations — gallery filters still work but transitions are instant; all gallery filter buttons expose label and selected state via ARIA; lightbox traps focus while open and returns focus to the triggering card on close
- [ ] A final codebase audit finds zero plain img tags and zero hardcoded legacy hex values remaining in any component or page file

---

## Progress

| Phase | Goal | Plans | Requirements | Status |
|-------|------|-------|--------------|--------|
| 4 - Dark Theme Overhaul + Homepage Rebuild | Dark site, rebuilt hero, service pillars, nav, trust signals, CTA banner | 7 plans | VSRL-01..05, NAV-01..02, HOME-01..03, HOME-06..07, CONV-01..05, CONT-03 | Planned |
| 5 - Gallery + Equipment Roster | Gallery page with filters + lightbox, equipment roster, homepage preview, nav link | TBD | NAV-03, HOME-04..05, GALL-01..05, ROST-01..03 | Pending |
| 6 - Services Deep Dive + Content + Polish | Services page rebuilt, about updated, full mobile + accessibility audit | TBD | SERV-01..03, CONT-01..02, MOBI-01..05 | Pending |

**Coverage:** 37/37 v1 requirements mapped across Phases 4–6 — no orphans.

---
*Roadmap created: 2026-03-04*
*Milestone: v3.0 Industrial Redesign*
*Supersedes: v2.0 Phases 2–3 (unbuilt, absorbed into v3.0)*
