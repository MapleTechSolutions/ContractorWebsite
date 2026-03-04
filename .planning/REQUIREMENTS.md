# Requirements: Big Country Landscaping & Maintenance Ltd — v3.0 Industrial Redesign

**Defined:** 2026-03-04
**Core Value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.

## v1 Requirements

### Visual Design (VSRL)

- [ ] **VSRL-01**: Visitor sees a dark near-black background (#0f1f2d or darker) as the dominant background on every page — no light or white content areas remain as the primary surface
- [ ] **VSRL-02**: Hero section displays a full-bleed machine photo with a dark overlay, bold white headline (weight 800+), and a yellow (#F5A623) primary CTA button
- [ ] **VSRL-03**: All headings across the site use Montserrat at weight 800 or 900 with tight letter-spacing — industrial, not soft
- [ ] **VSRL-04**: Brand accent (#F5A623) is consistently used for CTAs, icon accents, numbered list markers, and hover states
- [ ] **VSRL-05**: Section dividers and card borders use subtle dark-on-dark contrast — no bright white borders or soft rounded cards

### Navigation (NAV)

- [ ] **NAV-01**: Header is a dark sticky bar with logo left, max 6 nav links, phone number as a tappable tel: link, and a "Get a Quote" CTA button — always visible on scroll
- [ ] **NAV-02**: Mobile menu opens as a full-screen dark overlay with large tap targets (min 48px) and the same phone CTA
- [ ] **NAV-03**: Gallery link appears in both desktop nav and mobile menu

### Homepage Sections (HOME)

- [ ] **HOME-01**: Hero section has a full-bleed machine photo background, company name, a bold one-liner headline, and two CTAs (Call Now + Get a Quote)
- [ ] **HOME-02**: Two equal service pillar sections render side-by-side on desktop, stacked on mobile — one for Excavation & Site Work, one for Snow & Ice Removal — each with a dedicated photo and list of sub-services
- [ ] **HOME-03**: A numbered "Why Big Country" section lists 4 trust reasons (01 24/7 Availability, 02 Licensed & Insured, 03 Commercial-Grade Equipment, 04 Alberta-Based) with the accent color on the numbers
- [ ] **HOME-04**: Equipment Roster section renders on the homepage with a card for each key machine showing name, category, description, and a next/image photo slot
- [ ] **HOME-05**: Gallery preview "See Our Work" section shows 3–6 sample project photos with a link through to /gallery
- [ ] **HOME-06**: Testimonials section renders on a dark background with 3 client quotes and star ratings
- [ ] **HOME-07**: A final CTA banner before the footer with a bold headline and phone/quote CTAs

### Services (SERV)

- [ ] **SERV-01**: Services page has a dedicated Excavation & Site Work section with hero photo, description, and full sub-service list (site clearing, grading, trenching, demolition, foundation excavation, utility trenching)
- [ ] **SERV-02**: Services page has a dedicated Snow & Ice Removal section with hero photo, description, and full sub-service list (commercial parking lots, sidewalk clearing, salting & sanding, snow hauling, seasonal contracts)
- [ ] **SERV-03**: Each service section has its own CTA (Call for a Quote)

### Gallery (GALL)

- [ ] **GALL-01**: /gallery page shows a responsive grid (1 col mobile, 2 col tablet, 3 col desktop) of project photo cards
- [ ] **GALL-02**: Filter buttons (All / Excavation / Snow Removal / Site Prep) animate the grid reflow — only matching cards visible; All restores full grid
- [ ] **GALL-03**: Clicking a photo opens a full-screen lightbox with visible close, previous, and next controls
- [ ] **GALL-04**: Lightbox supports swipe left/right on mobile and ESC/arrow keyboard nav on desktop
- [ ] **GALL-05**: Selecting a filter category with no photos shows a clear empty-state message

### Equipment Roster (ROST)

- [ ] **ROST-01**: EquipmentItem TypeScript interface defined with: name, type, description, serviceCategory, imageSrc, imageAlt
- [ ] **ROST-02**: src/lib/equipment-data.ts exports at least 4 machine entries (track loader, large excavator, mini excavator, and one more)
- [ ] **ROST-03**: EquipmentRoster component renders cards with dark background, machine photo (next/image), name, type badge, and description

### Trust & Conversion (CONV)

- [ ] **CONV-01**: Phone number (587) 555-1234 is a tappable tel: link in the header, hero, footer, and mobile sticky CTA
- [ ] **CONV-02**: "Licensed & Insured" and "WCB Alberta" trust badges are visible on the homepage
- [ ] **CONV-03**: "24/7 Available" badge or callout is prominent — especially in the Snow Removal context
- [ ] **CONV-04**: Hero quick-quote form and contact page form both show loading state then success confirmation on submit (UI state only — no real backend)
- [ ] **CONV-05**: Mobile sticky CTA bar is always visible on phone screens

### Content (CONT)

- [ ] **CONT-01**: All page copy uses commercial contractor framing — no residential lawn service language anywhere
- [ ] **CONT-02**: About page tells Big Country's story with commercial focus (heavy equipment, Alberta operations, team experience)
- [ ] **CONT-03**: Seasonal bar message reflects current season (spring excavation booking or winter snow contracts)

### Mobile & Accessibility (MOBI)

- [ ] **MOBI-01**: Every interactive element across the full site (nav links, gallery filters, CTA buttons, lightbox controls, form inputs, mobile sticky CTA) has a minimum 48px touch target verified at 390px viewport
- [ ] **MOBI-02**: Loading the site with prefers-reduced-motion enabled results in no animated gallery grid reflows or card entrance animations — filters still work but transitions are instant
- [ ] **MOBI-03**: All gallery filter buttons expose label and selected state via ARIA; lightbox modal traps keyboard focus while open and returns focus to triggering card on close
- [ ] **MOBI-04**: Zero plain `<img>` tags remain anywhere in the codebase — all images use next/image
- [ ] **MOBI-05**: Zero hardcoded legacy hex values remain in any component or page file

## v2 Requirements

### Advanced Features

- **ADV-01**: Before/after photo slider for project transformations
- **ADV-02**: Service area map showing coverage radius in Alberta
- **ADV-03**: Seasonal pricing or quote request with service selection
- **ADV-04**: Video background option for hero section

### CMS / Content Management

- **CMS-01**: Client can add/edit gallery photos through a simple admin interface
- **CMS-02**: Client can update seasonal bar message without touching code
- **CMS-03**: Equipment roster manageable without code changes

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS or image upload | Static codebase for v3.0 — complexity not justified yet |
| Video content | Photos only; video adds hosting/performance complexity |
| Online booking or payment | Lead gen via phone + form is sufficient |
| Live Google Reviews integration | Static testimonials adequate, API adds complexity |
| Blog or news section | Not requested, no content plan |
| Multi-language (French) | Alberta market is English-first for this client |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| VSRL-01 | Phase 4 | Pending |
| VSRL-02 | Phase 4 | Pending |
| VSRL-03 | Phase 4 | Pending |
| VSRL-04 | Phase 4 | Pending |
| VSRL-05 | Phase 4 | Pending |
| NAV-01 | Phase 4 | Pending |
| NAV-02 | Phase 4 | Pending |
| NAV-03 | Phase 5 | Pending |
| HOME-01 | Phase 4 | Pending |
| HOME-02 | Phase 4 | Pending |
| HOME-03 | Phase 4 | Pending |
| HOME-04 | Phase 5 | Pending |
| HOME-05 | Phase 5 | Pending |
| HOME-06 | Phase 4 | Pending |
| HOME-07 | Phase 4 | Pending |
| SERV-01 | Phase 6 | Pending |
| SERV-02 | Phase 6 | Pending |
| SERV-03 | Phase 6 | Pending |
| GALL-01 | Phase 5 | Pending |
| GALL-02 | Phase 5 | Pending |
| GALL-03 | Phase 5 | Pending |
| GALL-04 | Phase 5 | Pending |
| GALL-05 | Phase 5 | Pending |
| ROST-01 | Phase 5 | Pending |
| ROST-02 | Phase 5 | Pending |
| ROST-03 | Phase 5 | Pending |
| CONV-01 | Phase 4 | Pending |
| CONV-02 | Phase 4 | Pending |
| CONV-03 | Phase 4 | Pending |
| CONV-04 | Phase 4 | Pending |
| CONV-05 | Phase 4 | Pending |
| CONT-01 | Phase 6 | Pending |
| CONT-02 | Phase 6 | Pending |
| CONT-03 | Phase 4 | Pending |
| MOBI-01 | Phase 6 | Pending |
| MOBI-02 | Phase 6 | Pending |
| MOBI-03 | Phase 6 | Pending |
| MOBI-04 | Phase 6 | Pending |
| MOBI-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 37
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-04*
*Last updated: 2026-03-04 after v3.0 milestone start*
