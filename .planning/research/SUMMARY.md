# Research Summary: Big Country Landscaping v2.0 Rebrand

**Synthesized:** 2026-03-03
**Sources:** STACK.md (HIGH confidence), ARCHITECTURE.md (HIGH confidence), FEATURES.md (MEDIUM confidence), PITFALLS.md (HIGH confidence)

---

## Stack Decisions

- **Four packages, that's it.** Install `framer-motion` (animations + AnimatePresence for gallery), `lucide-react` (icons, tree-shakeable), `yet-another-react-lightbox` (lightbox — do NOT use `react-image-lightbox`, it was abandoned in 2022 and breaks on React 18), `sharp` (Next.js image processing engine). Everything else uses existing Next.js 14 App Router + Tailwind CSS v3.
- **Stay on Tailwind CSS v3.** The existing `GALLERY_FEATURE_INSTRUCTIONS.md` planning artifact uses Tailwind v4 `@theme {}` syntax — that syntax will not work here. Translate all color tokens from that doc into `tailwind.config.ts extend.colors` instead.
- **`next/image` is the only image solution.** Static photos go in `/public/images/gallery/`. Blur placeholders are base64 strings generated once at dev time and hardcoded in `src/lib/gallery-data.ts`. No CMS, no remote domains, no `plaiceholder` runtime dependency.
- **Framer Motion only for animated transitions.** Gallery filter grid reflow (`AnimatePresence` + `layout`), seasonal bar dismiss animation, and gallery card entrances. Simple hover states stay as Tailwind `hover:` utilities. Always use `useReducedMotion()` hook for accessibility compliance.
- **No CSS-in-JS, no masonry, no data-fetching libraries.** All content is static TypeScript data files. `react-query`, `swr`, `styled-components`, `react-masonry-css` have no place in this codebase.

---

## Table Stakes Features

- **Click-to-call phone number** in header (sticky), hero section, and footer — must be `<a href="tel:[digits]">` everywhere, never plain text
- **Clear service identity** — lead with Excavation and Snow Removal as separate named services; "landscaping" is not the primary identity despite the business name
- **Real equipment and job-site photos** — placeholder cards are acceptable during build but the site cannot go live with stock images; commercial clients recognize stock immediately
- **Short contact form** — 4 fields maximum on hero quick quote (Name, Phone, Service Type, Message); longer form acceptable on dedicated contact page only
- **WCB Alberta + liability insurance statement** — commercial and municipal clients will not call without seeing this; generic "licensed and insured" is not sufficient for Alberta market
- **Physical service area** — "Serving the Big Country region — Alberta" removes the first qualifier a prospect runs; no map required, one line of copy
- **Sticky header with phone CTA** — already planned; is the single highest-value structural element for mobile lead capture
- **Navigation includes Gallery** — gallery is a trust-building destination, not an afterthought; must be in the primary nav from launch

---

## Differentiators

- **Equipment roster section** — most small contractors never show their fleet; commercial developers pre-qualify by machine class (excavator vs skid steer vs dozer); showing the fleet signals capacity and investment before a word of copy is read
- **Filterable gallery by service category** — Excavation / Snow Removal / Site Prep filters let the right prospect find the right proof instantly; a mixed photo dump does not
- **Seasonal announcement bar with real booking language** — snow removal contracts in Alberta sign in September-October; excavation books in spring; surfacing current availability creates genuine urgency without manufactured scarcity tactics
- **Commercial-framed copy throughout** — "commercial lot clearing," "seasonal contracts," "property managers," "municipalities" vs. residential default language repels the wrong tier and pre-qualifies the right one
- **Alberta One-Call compliance mention** (excavation) — stating "we contact Alberta One-Call before every dig" is a legal compliance signal that serious commercial clients look for
- **Response time commitment** (snow removal) — "24/7 storm response, on-site within X hours" differentiates from residential-tier competitors on the single question commercial clients care about most
- **Geographic anchoring** — "Big Country region," "Drumheller / Hanna area" is a trust signal to local clients who prefer proximity for weather-dependent services

---

## Build Order

The sequence is: design foundation first, identity second, content third, new features last. Building content before colors are finalized means touching every component twice.

1. **Color system + font unification** — define new `brand.*` and `accent.*` tokens in `tailwind.config.ts`; replace all 5 source hex values codebase-wide (`#094026`, `#0a5530`, `#063d22`, `#FCB215`, `#e5a013`); fix font conflict (config says "Plus Jakarta Sans", globals.css uses Montserrat — unify to Montserrat via `next/font/google`)
2. **Logo + Header/Footer rebrand** — copy logo SVG/PNG to `abc-roofing/public/`; swap inline SVG house icon for `next/image` logo in Header and Footer; update company name, phone, and nav links
3. **layout.tsx structural changes** — add SeasonalBar above Header; update all metadata (title, description, canonical URL, themeColor, OG data) for Big Country; create SeasonalBar component first
4. **Content pass on existing components** — Hero (new headline + CTA), ServicesPreview (Excavation + Snow Removal), AboutPreview, WhyChooseUs (Alberta-specific trust badges), TestimonialsPreview, CTASection, MobileStickyCTA phone number
5. **Full-page content** — services/page.tsx, about/page.tsx, reviews/page.tsx, contact/page.tsx with correct contact info
6. **New data files** — `src/lib/gallery-data.ts` (6 placeholder items with categories), `src/lib/equipment-data.ts` (placeholder roster); define data models correctly here — alt text is required from the start, not retrofittable
7. **New components** — SeasonalBar, EquipmentRoster, GalleryContent (filterable grid + framer-motion), motion-wrapper, GalleryPreview (homepage teaser)
8. **Gallery page + nav wire-up** — `src/app/gallery/page.tsx` new route; add Gallery to Header navLinks and Footer quick links; add GalleryPreview to homepage

---

## Top Warnings

**1. Both quote forms are non-functional — leads are silently lost (CRITICAL)**
The Hero form has no `onSubmit` handler. The Contact.tsx form uses a fake `setTimeout` to simulate success. Every lead generated before this is fixed is discarded without the client knowing. Connect to Formspree (free tier, zero infrastructure) before any real traffic — this is a go/no-go requirement for soft launch.

**2. Lightbox swipe gestures are missing — the client demo will fail on a phone (CRITICAL for demo)**
The roadmap specifies keyboard navigation for the lightbox. On mobile, users expect swipe-left/swipe-right. A lightbox that ignores swipes on the demo phone undermines confidence in the entire project. `yet-another-react-lightbox` handles this natively — do not implement a custom lightbox.

**3. Hardcoded hex colors across 15+ component files — missed instances are certain (HIGH)**
`#094026` and `#FCB215` appear directly in every component's JSX classnames. Changing the palette is a grep-and-replace with near-certain missed instances on the first pass. Set up `tailwind.config.ts` color tokens as Step 1 of the build. After the rebrand, search for `#094026` — any hit is a missed replacement.

**4. No `next/image` usage anywhere — real photos will break performance (HIGH)**
The current codebase uses no `next/image`. The hero has no image element at all (it is a CSS gradient). When real contractor photos are added as plain `<img>` tags, they bypass all optimization: no WebP conversion, no lazy loading, no LCP preloading. The hero background must use `<Image priority />`. Every gallery card must use `fill` inside an `aspect-[4/3]` container to prevent CLS.

**5. Google Fonts `@import` in globals.css is render-blocking (HIGH)**
`globals.css` line 1 imports Montserrat via CSS `@import`, which is render-blocking on every page load. Migrate to `next/font/google` in `layout.tsx` in the same commit as the font/color decisions — it eliminates the external request entirely and is the standard Next.js 14 pattern.

---

## Key Findings

- **The phone call is the only conversion that matters.** Every feature exists to build enough trust that a commercial prospect picks up the phone or submits a form. The sticky header phone number catches this intent at every scroll position. Design decisions that reduce friction toward that call outrank design decisions that look impressive.

- **Real equipment photos are the single biggest trust signal for this business type.** Stock photos actively destroy credibility for equipment contractors — commercial developers and property managers recognize them immediately. The photo-heavy "Heavy Iron" design direction is correct but worthless without real job site images. Build placeholder slots that are replace-in-place when client delivers photos.

- **Commercial-framed copy is as important as design.** "Commercial excavation and seasonal snow removal contracts" signals a different tier than "we do landscaping and snow." The word choices throughout the site — not just in the hero — determine which prospects feel this site is for them.

- **The seasonal announcement bar is a genuine revenue tool, not decoration.** Alberta's excavation and snow removal seasons are binary flips. Snow removal contracts sign September-October; excavation books in spring. A bar that reflects current booking status converts visitors who were on the fence into callers. Extract the message to `src/data/seasonal.ts` from day one — a hardcoded string will be wrong twice a year.

- **The GALLERY_FEATURE_INSTRUCTIONS.md planning artifact is ~95% usable but has a critical incompatibility.** That document was written for Tailwind CSS v4 and uses `@theme {}` block syntax. Do not follow it verbatim. Translate all color token definitions into `tailwind.config.ts extend.colors` instead. Everything else in that document applies.

- **The current codebase has a silent critical failure.** Form submissions show "success" but send nothing anywhere. This is not a v2.0 problem to schedule — it is a launch blocker that must be resolved before the site is shown to anyone outside the development team.

- **Gallery data models must be defined correctly on first implementation — alt text especially.** Generic alt text (`"gallery image 1"`) is an accessibility failure and a missed local SEO opportunity. "CAT 320 excavator site clearing, Drumheller AB" in image alt text drives Google Images traffic for exactly the searches Big Country's prospects make. Make `alt` a required field in the GalleryItem interface. Retrofitting alt text across a live gallery is expensive and often never gets done.

---

## Confidence Assessment

| Area | Confidence | Basis |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm registry; codebase inspected directly |
| Architecture / Build Order | HIGH | Based on direct codebase inspection; all component paths confirmed |
| Features | MEDIUM | Domain knowledge + Alberta market context; WebFetch unavailable during research; patterns are well-established for B2B contractor sites |
| Pitfalls | HIGH | Confirmed against actual codebase files; Next.js official docs; WCAG 2.1 standards |

**Gaps to address during execution:**
- Actual phone number, email, and service area (client to provide before any content pass)
- Equipment roster details (client to provide machine names, types, and photos)
- Real photo inventory (client to provide; build placeholder structure that accepts photos drop-in)
- Actual testimonials in commercial voice (client to provide or approve before reviews page goes live)
- Confirmation of which certifications client holds (WCB, liability insurance) before adding trust badges
