# Big Country Landscaping & Maintenance Ltd — Website

## What This Is

A heavy-equipment-forward contractor website for Big Country Landscaping & Maintenance Ltd, specializing in excavation/site work and commercial snow removal in Alberta. The site is built to convert commercial clients on first impression — dramatic machine photography, dark industrial design, and a no-nonsense layout that says "we have the iron to get it done." Built on Next.js 14, this milestone is a complete visual and structural overhaul of the existing branded foundation.

## Core Value

A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.

## Current Milestone: v3.0 Industrial Redesign

**Goal:** Tear out the light/generic look and rebuild the site as a dark, machine-forward, conversion-focused contractor site — one that looks like it belongs alongside the best excavation and commercial snow removal companies in Alberta.

**Target features:**
- Dark near-black theme throughout — industrial, heavy, serious (inspired by Blackrock Excavating aesthetic)
- Hero rebuilt: full-bleed machine photo, bold white headline, yellow CTA — no soft backgrounds
- Two equal service pillars with dedicated hero photos: Excavation & Site Work / Snow & Ice Removal
- "Why Big Country" numbered trust section (24/7, licensed, commercial-grade equipment, Alberta-based)
- Equipment Roster section — machines are the trust signal, not just a list
- Portfolio gallery — filterable by category, lightbox with swipe + keyboard nav
- Gallery linked in nav and previewed on homepage
- Testimonials on dark background
- Commercial-focused copy throughout (no residential lawn service language)
- Mobile-first polish: 48px touch targets, reduced motion, ARIA
- Trust badges: WCB Alberta, Licensed & Insured, 24/7 Available

## Requirements

### Validated

- ✓ Next.js 14 App Router site with Tailwind CSS 3 — foundation in place
- ✓ Responsive mobile-first design patterns — established
- ✓ Header, Footer, MobileStickyCTA — structural components exist
- ✓ Big Country logo (PNG + SVG) integrated into Header and Footer — Phase 1 complete
- ✓ Brand color tokens defined in tailwind.config.ts — Phase 1 complete
- ✓ Montserrat via next/font/google with --font-montserrat CSS variable — Phase 1 complete
- ✓ SeasonalBar component with Framer Motion + session dismiss — Phase 1 complete
- ✓ Hero quick-quote form and contact form with UI state handling — Phase 1 complete
- ✓ All content rewritten with Big Country identity — Phase 1 complete

### Active

- [ ] Dark near-black background replaces current light/mid theme site-wide
- [ ] Hero rebuilt as full-bleed, machine-forward, dark overlay with bold white headline
- [ ] Navigation redesigned: dark bar, minimal links (max 6), phone + CTA always visible
- [ ] Typography hardened: headings at weight 800+, tight letter-spacing, industrial feel
- [ ] Two service pillar sections on homepage (Excavation + Snow Removal) with photos
- [ ] "Why Big Country" numbered list section (01–04)
- [ ] Testimonials section with dark background
- [ ] Final CTA banner before footer
- [ ] Equipment Roster section on homepage with machine cards
- [ ] Portfolio gallery page (filterable grid + lightbox)
- [ ] Gallery preview on homepage ("See Our Work")
- [ ] Gallery linked in desktop nav and mobile menu
- [ ] Services page rebuilt with Excavation and Snow Removal deep dives
- [ ] About page reflects Big Country's story and commercial focus
- [ ] Trust badges visible: WCB Alberta, Licensed & Insured, 24/7
- [ ] All touch targets minimum 48px
- [ ] Reduced motion compliance for all animations
- [ ] ARIA labels on interactive gallery + nav elements
- [ ] All images use next/image with required alt text
- [ ] Zero hardcoded legacy hex values remaining in any component

### Out of Scope

- CMS or image upload — static photos in codebase, client adds via code
- Video content — photos only for v3.0
- Online booking or payment — lead gen via phone + quote form only
- Before/after photo comparison — v4 if client wants it
- Live reviews integration — static testimonials only
- Blog or news section — v4+

## Context

- Codebase lives at: `abc-roofing/` (nested git repo — commit separately)
- Tech stack: Next.js 14 App Router, TypeScript, Tailwind CSS v3
- Installed: framer-motion, lucide-react, yet-another-react-lightbox, sharp
- Brand colors: brand-dark #0f1f2d, brand-mid #2d4f64, brand-light #3d6882, brand-accent #F5A623, brand-surface #f7f4ef
- Competitor references reviewed: Alchemy Landscape, Alchemy Snow Commercial, UnderDogg Construction, LaMu & Sons, Blackrock Excavating
- Client photos on hand: Kobelco excavator on job site, mini-ex with worker, Deere track loader doing night snow removal
- Client business: Commercial excavation + snow removal in Alberta — heavy iron, not residential
- Priority viewpoint: Mobile phone (client demo on phone) — desktop must also be excellent
- Seasonal bar already built — just needs message updates

## Constraints

- **Tech stack**: Next.js 14 + Tailwind CSS v3 — no framework changes
- **Logo**: Use existing Excavator and Snow Plow in Motion logo files (PNG + SVG)
- **Mobile-first**: Every interaction smooth on 390px phone
- **Performance**: All images via next/image
- **No backend**: Static site, lead gen only

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark near-black theme (not light/clean) | Client's brand is heavy iron + night operations — dark matches the work | ✓ Good |
| Machine-forward hero, not text-first | Equipment IS the trust signal for commercial clients | ✓ Good |
| Two equal service pillars vs long list | Excavation and Snow Removal are distinct commercial services, both deserve weight | ✓ Good |
| Static photos vs CMS | v3.0 scope — client provides photos, dropped into codebase | — Pending |
| yet-another-react-lightbox (not react-image-lightbox) | react-image-lightbox abandoned 2022, breaks on React 18 | ✓ Good |
| Equipment Roster as dedicated section | Excavation clients want to know the iron — it's a differentiator | ✓ Good |
| Absorb v2.0 Phases 2–3 into v3.0 | Gallery + Equipment were unbuilt; redesign touches those components anyway | — Pending |

---
*Last updated: 2026-03-04 after v3.0 milestone start — full visual redesign*
