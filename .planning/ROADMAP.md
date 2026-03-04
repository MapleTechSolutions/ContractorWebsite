# Roadmap: Big Country Landscaping v2.0 Rebrand

**Milestone:** v2.0 Big Country Rebrand
**Core value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.
**Total phases:** 3
**Total plans:** 7

---

## Phase 1: Rebrand Foundation

**Goal:** The site looks and reads like Big Country Landscaping — correct brand colors, logo, and font are live, all placeholder content is replaced with real company identity, both forms are capturing leads via Formspree, and a seasonal booking bar is active above the header.
**Dependencies:** None — this phase is the foundation all subsequent phases build on top of.
**Requirements:** BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, CONT-09, FORM-01, FORM-02, SEAS-01, SEAS-02, MOBI-02

### Plans

| Plan | Name | Description |
|------|------|-------------|
| 01-01 | Color, Font, Logo, Layout | Define brand color tokens in tailwind.config.ts, replace all hardcoded legacy hex values codebase-wide, migrate to next/font/google for Montserrat, copy logo files to public/, integrate logo into Header and Footer, add SeasonalBar slot to layout.tsx |
| 01-02 | Content Pass | Rewrite every existing component and page with Big Country identity — Hero headline and CTA, ServicesPreview (Excavation + Snow Removal), WhyChooseUs trust badges (WCB Alberta, Alberta One-Call compliance), TestimonialsPreview, CTASection, AboutPreview, About page, Services page, Reviews page, Contact page, all metadata and OG tags, phone number as tel: links in header, hero, footer, and MobileStickyCTA |
| 01-03 | Forms and Seasonal Bar | Build SeasonalBar component with session-dismissable Framer Motion animation and message sourced from src/data/seasonal.ts, connect hero quick-quote form to Formspree, connect contact page form to Formspree, replace all fake submit handlers with real submission and error state handling |

### Success Criteria

- [ ] The Big Country Landscaping logo renders in the header and footer on every page — no generic placeholder icon or inline SVG house icon remains anywhere in the codebase
- [ ] Every page displays "Big Country Landscaping & Maintenance Ltd" as the company name and (587) 555-1234 as a tappable tel: link in the sticky header, hero, footer, and mobile sticky CTA
- [ ] Submitting the hero quick-quote form shows a loading spinner then a success confirmation — form UI state works correctly, no real backend required for demo
- [ ] Submitting the contact page form shows a loading spinner then a success confirmation — form UI state works correctly, no real backend required for demo
- [ ] A seasonal announcement bar appears above the sticky header on every page load showing the current booking message from seasonal.ts, and dismisses for the rest of the browser session when the user closes it

---

## Phase 2: Gallery Feature

**Goal:** Visitors can browse real project photos organized by service category on a dedicated gallery page and view any photo full-screen with swipe and keyboard navigation — the gallery is reachable from the primary nav and previewed on the homepage.
**Dependencies:** Phase 1 must be complete — gallery components inherit the Phase 1 brand color tokens, and navigation changes build on the rebranded Header.
**Requirements:** GALL-01, GALL-02, GALL-03, GALL-04, GALL-05, GALL-06, LBOX-01, LBOX-02, LBOX-03, LBOX-04, INTG-01, INTG-02, MOBI-03

### Plans

| Plan | Name | Description |
|------|------|-------------|
| 02-01 | Dependencies, Data Model, Gallery Scaffold | Install framer-motion, lucide-react, yet-another-react-lightbox, and sharp; define GalleryItem TypeScript interface with alt as a required field; create src/lib/gallery-data.ts with six placeholder items across all three categories; build gallery/page.tsx with hero section, responsive 1/2/3-column grid, placeholder project cards using next/image with correct 4:3 aspect ratios, and All / Excavation / Snow Removal / Site Prep filter buttons |
| 02-02 | Lightbox, Animations, Nav, Homepage Preview | Add AnimatePresence and layout animations to gallery grid filter transitions and card entrance animations using useReducedMotion() hook; wire yet-another-react-lightbox to project card clicks with swipe-left/right and keyboard ESC/arrow navigation; add Gallery to Header desktop nav and mobile menu; build GalleryPreview "See Our Work" section on the homepage with a link through to /gallery |

### Success Criteria

- [ ] Visiting /gallery shows a responsive grid of project cards — 1 column on mobile, 2 on tablet, 3 on desktop — with a themed hero section and filter buttons for All, Excavation, Snow Removal, and Site Prep above the grid
- [ ] Clicking a filter button animates the grid reflow so only matching category cards are visible; clicking All restores the full grid; selecting a category with no photos shows a clear empty state message
- [ ] Clicking any project card opens the photo full-screen in a lightbox with visible close, previous, and next controls that function correctly
- [ ] Swiping left or right in the lightbox on a phone navigates to the previous or next photo without any additional tap required — swipe gesture works on the first try
- [ ] A "See Our Work" gallery preview section is visible on the homepage, and the Gallery link appears in both the desktop navigation bar and the mobile menu

---

## Phase 3: Equipment Roster + Polish

**Goal:** The equipment roster section is live on the homepage showing key machines with photo-ready placeholder cards, all touch targets across the full site meet 48px minimums, reduced-motion and ARIA accessibility requirements are fully satisfied, and the site is confirmed production-ready with no legacy artifacts.
**Dependencies:** Phase 2 must be complete — the equipment roster joins the homepage alongside the Phase 2 gallery preview, and mobile and accessibility polish covers the gallery interactions built in Phase 2.
**Requirements:** ROST-01, ROST-02, ROST-03, INTG-03, MOBI-01, MOBI-04, MOBI-05

### Plans

| Plan | Name | Description |
|------|------|-------------|
| 03-01 | Equipment Data Model, Roster Component, Homepage Integration | Define EquipmentItem TypeScript interface (machine name, type, photo slot, description, service category); create src/lib/equipment-data.ts with placeholder machine entries; build EquipmentRoster component with next/image photo-ready card slots; wire EquipmentRoster into homepage layout |
| 03-02 | Mobile Hardening, Accessibility, Performance Audit | Audit every interactive element site-wide for 48px minimum touch targets (gallery filter buttons, nav links, CTA buttons, lightbox controls, form inputs, mobile sticky CTA); add prefers-reduced-motion compliance to all gallery animations and seasonal bar dismiss animation; add ARIA labels and keyboard focus management to gallery filter buttons and lightbox modal; confirm zero plain img tags remain (all must use next/image); confirm zero hardcoded legacy hex values remain in any component file |

### Success Criteria

- [ ] An Equipment Roster section renders on the homepage with a card for each machine entry showing the machine name, service category, description, and a correctly sized next/image photo slot that accepts a real client photo as a drop-in replacement
- [ ] Every interactive element across the full site — gallery filter buttons, nav items, hero and contact form CTAs, lightbox controls, and mobile sticky CTA — presents a minimum 48px touch target verified on a 390px-wide phone screen
- [ ] Loading the site on an OS with prefers-reduced-motion enabled results in no animated gallery grid reflows or card entrance animations — filters still function but all transitions are instant
- [ ] All gallery filter buttons expose their label and selected state via ARIA attributes; the lightbox modal traps keyboard focus while open and returns focus to the triggering card when closed
- [ ] A final codebase audit finds zero plain img tags and zero legacy hex values (#094026, #0a5530, #063d22, #FCB215, #e5a013) remaining in any component or page file

---

## Progress

| Phase | Goal | Plans | Requirements | Status |
|-------|------|-------|--------------|--------|
| 1 - Rebrand Foundation | Site fully rebranded, forms live, seasonal bar active | 3 of 3 | BRAND-01..05, CONT-01..09, FORM-01..02, SEAS-01..02, MOBI-02 | Pending |
| 2 - Gallery Feature | Filterable gallery with lightbox, wired into nav and homepage | 2 of 2 | GALL-01..06, LBOX-01..04, INTG-01..02, MOBI-03 | Pending |
| 3 - Equipment Roster + Polish | Roster live, mobile hardened, accessibility complete | 2 of 2 | ROST-01..03, INTG-03, MOBI-01, MOBI-04..05 | Pending |

**Coverage:** 37/37 v1 requirements mapped across 3 phases — no orphans.

---
*Roadmap created: 2026-03-03*
*Milestone: v2.0 Big Country Rebrand*
