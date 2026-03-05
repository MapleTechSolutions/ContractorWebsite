# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-04)

**Core value:** A potential client sees the equipment, sees the work, and picks up the phone — the site converts on first impression.
**Current focus:** Phase 5 - Gallery & Equipment (out-of-band: all 3 service pages built)

## Current Position

Phase: 5 of 6 (Gallery & Equipment)
Plan: 0 of TBD in current phase (out-of-band work completed: all 3 service deep-dive pages + homepage pillar slideshow)
Status: Phase 4 complete. Out-of-band: /landscape-construction, /excavation, /snow-removal fully built in Alchemy-inspired editorial style. Header nav pointing to dedicated routes.
Last activity: 2026-03-04 — ExcavationPage.tsx + SnowRemovalPage.tsx created; /excavation + /snow-removal routes wired; Header nav updated to /snow-removal + /excavation

Progress: [████████..] ~50%

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: ~8 min
- Total execution time: ~0.60 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-rebrand-foundation | 3/3 | ~27 min | ~9 min |
| 04-dark-theme-homepage | 7/7 | ~55 min | ~8 min |
| 05-gallery-equipment | 0/TBD | — | — |
| 06-services-content-polish | 0/TBD | — | — |

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Install: framer-motion, lucide-react, yet-another-react-lightbox, sharp (all installed in v2.0 Phase 1)
- Lightbox: Use yet-another-react-lightbox (NOT react-image-lightbox — abandoned in 2022, breaks on React 18)
- Forms: UI state only — NO Formspree, no real backend (per 01-01 key decisions)
- Font: Montserrat loaded via next/font/google with --font-montserrat CSS variable (DONE in 01-01)
- Color tokens: Define in tailwind.config.ts extend.colors NOT @theme{} — this is Tailwind v3 (DONE in 01-01)
- Brand colors confirmed: brand-dark #0f1f2d, brand-mid #2d4f64, brand-light #3d6882, brand-accent #F5A623, brand-surface #f7f4ef
- abc-roofing/ is a nested git repository — commit source code changes in inner repo, planning docs in outer repo
- SeasonalBar: sticky top-0 z-[60], scrolls away naturally, fixed Header z-50 persists below it (D-301)
- Hero formStatus shared between desktop and mobile forms — both never show simultaneously (D-302)
- Contact handleSubmit preserved verbatim — intentional fake setTimeout, no backend (D-303)
- v2.0 Phases 2–3 (Gallery Feature, Equipment Roster + Polish) absorbed into v3.0 — redesign touches those components anyway, no point building on light theme first
- Dark theme is near-black (#0f1f2d or darker) as the dominant background — not dark-grey, not charcoal, near-black
- Typography: headings at weight 800 or 900, tight letter-spacing — industrial, not soft
- Competitor reference for dark aesthetic: Blackrock Excavating
- Client photos on hand: Kobelco excavator on job site, mini-ex with worker, Deere track loader doing night snow removal

- body background set to raw CSS `background: #0f1f2d` (not Tailwind class) — fires at CSS parse time, eliminates white flash before hydration (D-401)
- sticky-cta-mobile uses `border-white/10` for subtle separator on dark bg (D-402)
- Dark canvas is now default — Phase 4 component changes build on dark, not override light (D-403)
- Header isScrolled retained for opacity-only transition (80% → 95%) + backdrop-blur — never changes color scheme on scroll (D-404)
- Mobile nav links use font-black (900) — industrial weight, matches brand direction (D-405)
- Photo staging: hero-excavator.jpg = big country.jpg; semantic image-to-section correctness deferred to Plan 07 human checkpoint (D-406)
- Hero photo: next/image fill + sizes="100vw" — correct sizing hint for full-viewport-width LCP image (D-407a)
- Hero overlay: bg-[#0f1f2d]/70 + gradient-to-t from-[#0f1f2d]/40 — flat overlay + gradient for consistent legibility top-to-bottom (D-408a)
- Trust pill badges use bg-white/10 border-white/10 rounded-lg — elevated above bare text, don't compete with primary CTA (D-409a)
- CONV-01 (tel: link) was already present from prior work — no regression on Call Now button (D-410a)
- ServicePillars: new server component, ServicesPreview kept intact for /services page reuse (D-407)
- ServicePillars data inline — no separate data file for two static pillars (D-408)

- /landscape-construction page fully rebuilt in Alchemy-inspired editorial style: cinematic hero, marquee strip, services photo grid (1 large + 5 small + 2 wide), dark statement band, auto-advancing project showcase with sidebar thumbnails, 2-photo why-cards + 4 numbered reasons, process steps, testimonials, split CTA form (D-501)
- yard-work-0..6.jpg copied to public/images/ as yard-work-{0-6}.jpg — 7 client project photos now available site-wide (D-502)
- ServicePillars converted to client component — landscaping pillar uses 7-photo crossfade slideshow (2s auto-advance, amber pill dot indicator, per-slide category label) (D-503)
- globals.css: @keyframes marquee + .animate-marquee class added for amber scrolling strip (D-504)
- LandscapeConstruction page.tsx simplified to just render the component — hero now owned by component (D-505)
- Next: add real photos to Excavation pillar (excavation job-site shots) and Snow Removal pillar (night snow clearing shots) — same slideshow pattern
- Testimonials slider logic, data, auto-advance preserved verbatim — Plan 04-06 was color-only (D-409)
- Testimonials avatar bg kept bg-[#0f1f2d] for depth against bg-white/5 card surface (D-410)

- page.tsx wired to new 5-section homepage: Hero → ServicePillars → WhyBigCountry → Testimonials → CTABanner (D-407b)
- MobileStickyCTA: bg-[#0f1f2d], border-white/10, Call Now button text-white bg-white/10 (D-411)
- VSRL-03 heading audit complete: Hero h3s, Footer h4s → font-black tracking-tight; Testimonials h2 → tracking-tight added (D-412)
- CONT-03 seasonal bar confirmed correct: "Now Booking Spring 2026 Excavation — Spots Filling Fast", active: true (D-413)

- ExcavationPage.tsx created: 5-slide showcase, 6 services, hero "WE MOVE / EARTH. / PRECISELY.", trust metrics (15+ yrs, 200+ commercial, WCB, First Call Certified), dark band, why-cards, process, split CTA form (D-506)
- SnowRemovalPage.tsx created: 6 services (lot clearing, sidewalk, salting, hauling, contracts, emergency), hero "CLEARED. / TREATED. / OPEN.", trust metrics (24/7, 100+ sites, WCB, Oct–Apr), dark band, split CTA form with Company field (D-507)
- /excavation route created at src/app/excavation/page.tsx — renders ExcavationPage (D-508)
- /snow-removal route created at src/app/snow-removal/page.tsx — renders SnowRemovalPage (D-509)
- Header nav updated: /services#snow → /snow-removal, /services#excavation → /excavation — dedicated pages replace hash links (D-510)
- Build verified clean: 14 static routes, 0 errors (D-511)
- snow1.jpg + snow-video.mp4 added to public/images/ — real client snow removal media now in SnowRemovalPage (D-512)
- SnowRemovalPage hero mosaic: snow1.jpg (large) + snow-video.mp4 (top-right autoplay) + snow1.jpg (bottom-right) (D-513)
- SnowRemovalPage showcase: 2 slides (snow1.jpg + video), video rendered as <video> autoPlay muted loop, sidebar thumbnail shows play icon overlay (D-514)
- All services cards updated to use snow1.jpg — no more off-brand placeholder equipment shots on snow page (D-515)
- Site committed and pitch-ready as of 2026-03-04 (D-516)

### Pending Todos

- Add slideshow photos for Excavation pillar in ServicePillars.tsx (when client excavation site shots arrive)
- Add slideshow photos for Snow & Ice Removal pillar in ServicePillars.tsx (when more snow photos arrive)
- Phase 5 formal plans (gallery + equipment roster) — deferred, site pitched first
- Phase 6 (services deep dive + polish) — deferred

### Blockers/Concerns

None blocking pitch. Excavation + Snow homepage pillar slideshows still use single photo — upgrade when more client photos arrive.

## Session Continuity

Last session: 2026-03-04
Stopped at: Site pitch-ready — snow media integrated, all commits done
Resume file: None
Next action: After pitch, continue Phase 5 (gallery + equipment roster) or start new project via /gsd:new-project
