# Requirements: Big Country Landscaping & Maintenance Ltd — v2.0 Rebrand

**Defined:** 2026-03-03
**Core Value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.

## v1 Requirements

### Branding & Visual Identity

- [x] **BRAND-01**: New dark industrial color palette defined in `tailwind.config.ts` (replaces generic dark green #094026 + gold #FCB215)
- [x] **BRAND-02**: Logo (PNG/SVG) moved to `/public/` and integrated into Header replacing placeholder
- [x] **BRAND-03**: Logo integrated into Footer
- [x] **BRAND-04**: Montserrat font loaded via `next/font/google` in layout.tsx (removes render-blocking `@import` from globals.css)
- [x] **BRAND-05**: All hardcoded old hex values (#094026, #0a5530, #FCB215, etc.) removed from every component file

### Content Replacement

- [x] **CONT-01**: Company name "Big Country Landscaping & Maintenance Ltd" throughout all pages and site metadata
- [x] **CONT-02**: Placeholder contact info — `(587) 555-1234` and `info@bigcountrylandscaping.ca` in all instances
- [x] **CONT-03**: Hero headline and CTA rewritten for excavation + snow removal commercial identity
- [x] **CONT-04**: Services rewritten — Excavation (site clearing, grading, trenching, demolition) and Snow Removal (commercial lot clearing, salting, hauling, 24/7 response)
- [x] **CONT-05**: Trust badges updated — WCB Alberta, fully insured, Alberta One-Call compliance
- [x] **CONT-06**: Service area statement ("Serving Big Country region, Alberta") in hero and footer
- [x] **CONT-07**: Testimonials updated with commercial-voice quotes (property managers, commercial clients)
- [x] **CONT-08**: About page updated with Big Country Landscaping identity background and fleet capacity
- [x] **CONT-09**: Site metadata updated — title, OG description, themeColor, canonical URL for Big Country

### Forms

- [x] **FORM-01**: Hero quick-quote form has proper UI state — loading spinner on submit, success message on completion (no real backend required for demo)
- [x] **FORM-02**: Contact page form has proper UI state — loading spinner on submit, success message on completion (no real backend required for demo)

### Seasonal Bar

- [x] **SEAS-01**: Seasonal announcement bar component rendered above the Header in layout.tsx (dismissable per session)
- [x] **SEAS-02**: Seasonal message stored in `src/data/seasonal.ts` — not hardcoded, easy to update each season without touching components

### Gallery

- [ ] **GALL-01**: Gallery page at `/gallery` with responsive grid — 1 column mobile, 2 column tablet, 3 column desktop
- [ ] **GALL-02**: Category filter buttons — All / Excavation / Snow Removal / Site Prep — with animated transitions
- [ ] **GALL-03**: Gallery page hero section with title and description matching site theme
- [ ] **GALL-04**: Gallery data model defines `alt` as a required field (accessibility + local SEO)
- [ ] **GALL-05**: Placeholder project cards with correct aspect ratio ready to swap in real client photos
- [ ] **GALL-06**: Empty state message displayed when no projects match the selected filter

### Lightbox & Animations

- [ ] **LBOX-01**: Lightbox modal opens on project card click using `yet-another-react-lightbox`
- [ ] **LBOX-02**: Swipe navigation in lightbox (swipe left/right for prev/next) — required for phone demo
- [ ] **LBOX-03**: Keyboard navigation — ESC to close, left/right arrow keys for prev/next
- [ ] **LBOX-04**: Framer Motion animations — gallery grid reflow on filter change + project card entrance animations

### Equipment Roster

- [ ] **ROST-01**: Equipment Roster section on homepage with cards for key machines
- [ ] **ROST-02**: Equipment data model — machine name, type, photo slot, description, service category (strongly typed TypeScript)
- [ ] **ROST-03**: Placeholder equipment cards with ready photo slots for client photos

### Site Integration

- [ ] **INTG-01**: Gallery link in Header navigation — both desktop nav and mobile menu
- [ ] **INTG-02**: Gallery preview teaser section on homepage ("See Our Work") with link to full gallery
- [ ] **INTG-03**: Equipment Roster section wired into homepage layout

### Mobile & Performance

- [ ] **MOBI-01**: All interactive elements minimum 48px touch target (filter buttons, nav items, CTA buttons, lightbox controls)
- [x] **MOBI-02**: Phone number rendered as `<a href="tel:+15875551234">` in header, hero, footer, and MobileStickyCTA
- [ ] **MOBI-03**: `next/image` used for all photos — hero background, gallery cards, and equipment roster cards
- [ ] **MOBI-04**: `prefers-reduced-motion` media query respected throughout (gallery animations, seasonal bar)
- [ ] **MOBI-05**: ARIA labels and keyboard focus management on gallery filter buttons and lightbox modal

## v2 Requirements

### Enhanced Content (Post-Launch)

- **V2-CONT-01**: Real client photos replace all placeholder images in gallery
- **V2-CONT-02**: Real machine photos replace equipment roster placeholders
- **V2-CONT-03**: Real testimonials from named commercial clients replace placeholder quotes
- **V2-CONT-04**: Real phone number and email replace placeholder contact info

### Enhanced Gallery

- **V2-GALL-01**: Before/after comparison view for select projects
- **V2-GALL-02**: Project captions with location, scope, and outcome detail
- **V2-GALL-03**: Individual project detail pages with full image sets

### Enhanced Lead Gen

- **V2-FORM-01**: Form submission email notifications with lead details
- **V2-FORM-02**: SMS notification on new quote request (urgent for snow removal)

### Performance

- **V2-PERF-01**: All gallery images converted to WebP with blur-up placeholders generated at build time
- **V2-PERF-02**: Lighthouse mobile score 90+ validated

## Out of Scope

| Feature | Reason |
|---------|--------|
| Image upload / CMS | Static site, photos added to codebase directly — CMS is v3+ |
| Video backgrounds or hero video | Adds complexity, mobile data cost, deferred to v3 |
| Online booking / scheduling system | Lead gen only — phone + form; no backend |
| Before/after comparison slider | v2 feature once real photos are available |
| Google Maps embed | Deferred — contact page with text service area is sufficient for v2.0 |
| Blog or news section | No content strategy yet; thin content is worse than none |
| Social media feed embeds | Signals inactivity if client doesn't post regularly; link-to-profile only |
| Popup / chat widget | Off-brand for trade contractor; sticky header and CTA bar are correct channels |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRAND-01 | Phase 1 | Complete |
| BRAND-02 | Phase 1 | Complete |
| BRAND-03 | Phase 1 | Complete |
| BRAND-04 | Phase 1 | Complete |
| BRAND-05 | Phase 1 | Complete |
| CONT-01 | Phase 1 | Complete |
| CONT-02 | Phase 1 | Complete |
| CONT-03 | Phase 1 | Complete |
| CONT-04 | Phase 1 | Complete |
| CONT-05 | Phase 1 | Complete |
| CONT-06 | Phase 1 | Complete |
| CONT-07 | Phase 1 | Complete |
| CONT-08 | Phase 1 | Complete |
| CONT-09 | Phase 1 | Complete |
| FORM-01 | Phase 1 | Complete |
| FORM-02 | Phase 1 | Complete |
| SEAS-01 | Phase 1 | Complete |
| SEAS-02 | Phase 1 | Complete |
| GALL-01 | Phase 2 | Pending |
| GALL-02 | Phase 2 | Pending |
| GALL-03 | Phase 2 | Pending |
| GALL-04 | Phase 2 | Pending |
| GALL-05 | Phase 2 | Pending |
| GALL-06 | Phase 2 | Pending |
| LBOX-01 | Phase 2 | Pending |
| LBOX-02 | Phase 2 | Pending |
| LBOX-03 | Phase 2 | Pending |
| LBOX-04 | Phase 2 | Pending |
| ROST-01 | Phase 3 | Pending |
| ROST-02 | Phase 3 | Pending |
| ROST-03 | Phase 3 | Pending |
| INTG-01 | Phase 2 | Pending |
| INTG-02 | Phase 2 | Pending |
| INTG-03 | Phase 3 | Pending |
| MOBI-01 | Phase 3 | Pending |
| MOBI-02 | Phase 1 | Complete |
| MOBI-03 | Phase 2 | Pending |
| MOBI-04 | Phase 3 | Pending |
| MOBI-05 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 37
- Unmapped: 0 ✓
- Phase 1 complete: 19/19 ✓

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-04 — Phase 1 requirements marked Complete*
