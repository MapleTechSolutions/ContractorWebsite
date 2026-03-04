# Big Country Landscaping & Maintenance Ltd — Website

## What This Is

A complete, branded website for Big Country Landscaping & Maintenance Ltd, a contractor specializing in excavation and commercial snow removal. Built on an existing Next.js 14 template, this milestone transforms the generic demo into a real client-ready site with a bold industrial look, photo-heavy design, and mobile-first presentation optimized for showing the client on a phone.

## Core Value

A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.

## Current Milestone: v2.0 Big Country Rebrand

**Goal:** Transform the generic contractor template into a fully branded site for Big Country Landscaping & Maintenance Ltd — correct branding, services, content, design theme, and portfolio gallery with real client photos.

**Target features:**
- Complete rebrand: logo, company name, colors, and all placeholder content replaced
- Dark industrial/bold theme derived from the logo (replacing current dark green + gold)
- Two core service sections: Excavation and Snow Removal
- Portfolio gallery with category filters (Excavation, Snow Removal, Site Prep)
- Equipment Roster section showcasing key machines
- Seasonal CTA bar (e.g., "Now Booking Spring Excavation")
- Hero with inline quote form and strong action-shot background
- Sticky header with phone number and Get a Quote CTA always visible
- Mobile-first experience (demo on phone for client)

## Requirements

### Validated

- ✓ Next.js 14 App Router site with Tailwind CSS 3 — existing foundation
- ✓ Responsive mobile-first design patterns — existing
- ✓ Header with nav + Footer + MobileStickyCTA — existing
- ✓ Custom utility classes (section-padding, container-custom, btn-*) — existing
- ✓ Contact form, Services, About, Reviews pages — existing structure

### Active

- [ ] All placeholder content replaced with Big Country Landscaping branding
- [ ] Logo (PNG/SVG already created) integrated into Header and Footer
- [ ] New dark industrial color theme derived from logo colors
- [ ] Hero section with strong excavation/snow imagery and inline quote form
- [ ] Seasonal announcement bar at top (togglable message)
- [ ] Sticky header — phone number + "Get a Quote" always visible
- [ ] Services page: Excavation (site clearing, grading, trenching, demolition) + Snow Removal (commercial lots, salting, hauling)
- [ ] Equipment Roster section showcasing their key machines with photos
- [ ] Portfolio gallery — filterable by Excavation / Snow Removal / Site Prep
- [ ] Lightbox to view project photos enlarged with keyboard navigation
- [ ] Gallery integrated into nav and homepage preview
- [ ] Real client photos wired in where provided (with easy swap for more later)
- [ ] Mobile-optimized: 48px touch targets, smooth scroll, no interaction friction

### Out of Scope

- Image upload / CMS — static data, photos added to codebase directly
- Video content — photos only for v2.0
- Online booking / payment — lead gen only (phone + quote form)
- Before/after comparison — v3 if client wants it
- Comments or reviews integration — static testimonials only

## Context

- Existing site: Generic contractor template at `/abc-roofing/`
- Tech stack: Next.js 14 App Router, TypeScript, Tailwind CSS v3
- Logo files already exist in project root (PNG + SVG)
- Client business: Excavation + Commercial Snow Removal in Alberta (Big Country = rural/agricultural area)
- Priority viewpoint: Mobile phone (for client demo) — must also look excellent on desktop
- Photography: Client will provide real equipment and job site photos — slots must be ready
- Placeholder contact: (587) 555-1234 | info@bigcountrylandscaping.ca
- framer-motion and lucide-react not yet installed — required for gallery

## Constraints

- **Tech stack**: Next.js 14 + Tailwind CSS v3 — no framework changes
- **Logo**: Use the existing Excavator and Snow Plow in Motion logo files
- **Mobile-first**: Every interaction must be smooth on a 390px phone screen
- **Performance**: Real images must use next/image for optimization
- **No backend**: Static site, no database, no auth — lead gen via form only

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Transform existing template vs build from scratch | Foundation is solid, faster to rebrand than rebuild | — Pending |
| Dark industrial theme vs original dark green + gold | Big Country brand is about heavy iron, not residential landscaping | — Pending |
| Static photos in codebase vs CMS | v2.0 scope, client can add photos directly; CMS is v3+ | — Pending |
| framer-motion for gallery animations | Smooth filter transitions and lightbox are worth the dependency | — Pending |
| Equipment Roster as dedicated section | Excavation clients want to know what equipment is available | — Pending |

---
*Last updated: 2026-03-03 after v2.0 milestone start*
