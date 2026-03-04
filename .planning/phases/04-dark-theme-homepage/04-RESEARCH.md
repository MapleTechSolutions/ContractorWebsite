# Phase 4: Dark Theme Overhaul + Homepage Rebuild - Research

**Researched:** 2026-03-04
**Domain:** Next.js 14 App Router, Tailwind CSS v3, React component architecture, dark-theme UI
**Confidence:** HIGH — all findings are based on direct reading of the actual codebase files

---

## Summary

Phase 4 rebuilds the homepage and global visual layer of an existing Next.js 14 / Tailwind CSS v3 site. The foundation (colors, font, SeasonalBar, logo) was completed in Phase 1 (v2.0). The codebase is in good health: all brand tokens are wired up in `tailwind.config.ts`, Montserrat is loaded via `next/font/google`, and the component structure is clean.

The core problem this phase solves: several homepage sections use light/white backgrounds (`bg-white`, `bg-[#f7f4ef]`) that contradict the dark industrial aesthetic. The Hero already uses `bg-[#0f1f2d]` but uses a CSS gradient background — not a real machine photo. The Header goes transparent-then-white on scroll, which breaks the all-dark mandate. The mobile menu is white.

The work is surgical, not a greenfield rewrite. Every component already exists. The task is: (1) flip light sections dark, (2) add real photo backgrounds to Hero and ServicePillars, (3) rebuild the Header to stay dark always, (4) rebuild the mobile menu to a dark overlay, and (5) restructure the homepage component order to match the new spec.

**Primary recommendation:** Work strictly in dependency order — globals/layout first, then Header, then Hero (with photo), then section-by-section homepage rebuild. Never touch a downstream component before its upstream is locked.

---

## Current Codebase State

### File Map (abc-roofing/src/)

```
app/
  layout.tsx          — Root layout: SeasonalBar, Header, main, Footer, MobileStickyCTA
  globals.css         — CSS custom props, btn-*, section-*, form-input, sticky-cta-mobile
  page.tsx            — Homepage: Hero, ServicesPreview, AboutPreview, WhyChooseUs,
                        TestimonialsPreview, CTASection
components/
  Header.tsx          — "use client" — scroll-aware, transparent→white, white mobile menu
  Hero.tsx            — "use client" — dark gradient BG (no photo), desktop form + mobile toggle
  SeasonalBar.tsx     — "use client" — sticky top-0 z-[60], sessionStorage dismiss
  MobileStickyCTA.tsx — "use client" — fixed bottom, md:hidden, white bg/border
  ServicesPreview.tsx — server — bg-[#f7f4ef] LIGHT — icon+list cards, white cards
  AboutPreview.tsx    — server — bg-white LIGHT — placeholder gradient, no photo
  WhyChooseUs.tsx     — server — bg-[#0f1f2d] DARK — numbered grid + yellow CTA bar
  TestimonialsPreview.tsx — server — bg-[#f7f4ef] LIGHT — white cards
  CTASection.tsx      — server — bg-[#0f1f2d] DARK — good, minimal changes needed
  Footer.tsx          — server — bg-black DARK — already correct
data/
  seasonal.ts         — seasonalMessage object, active: true
tailwind.config.ts    — brand.dark, brand.mid, brand.light, brand.accent, brand.surface tokens
```

### What Is Already Correct

- Tailwind brand tokens: `brand-dark`, `brand-mid`, `brand-light`, `brand-accent`, `brand-surface` all defined
- Montserrat font wired as `--font-montserrat`, applied to `html` via `montserrat.variable`
- `globals.css` has `btn-primary`, `btn-outline-white`, `section-dark` utilities
- `SeasonalBar`: `sticky top-0 z-[60]` — correct stacking, scrolls away naturally
- `Header`: already `fixed top-0 z-50` — z-index hierarchy is correct (SeasonalBar 60 > Header 50 > mobile menu 40)
- Hero: already dark, already has two CTAs, desktop form + mobile expandable form with shared `formStatus` state
- `CTASection`: already dark, already has phone+quote CTAs and trust badges
- `WhyChooseUs`: already dark, has 6 numbered cards — phase spec wants 4 specific reasons
- `Footer`: already dark (bg-black), no changes needed

### What Needs to Change

| Component | Current State | Required Change |
|-----------|--------------|-----------------|
| `globals.css` body | `background: #ffffff; color: #0f1f2d` | `background: #0f1f2d; color: #ffffff` |
| `layout.tsx` colorScheme | `"light"` | `"dark"` |
| `Header.tsx` | transparent→white on scroll, white mobile menu | Always dark bg, dark mobile overlay |
| `Hero.tsx` | CSS gradient BG, no photo | Full-bleed machine photo with overlay |
| `ServicesPreview.tsx` | light bg, white cards, no photos | Dark bg, two pillar sections each with real photo |
| `AboutPreview.tsx` | bg-white, placeholder gradient | Remove from homepage or flip dark |
| `WhyChooseUs.tsx` | 6 reasons, embedded CTA bar | Trim to 4 spec reasons, move CTA to own component |
| `TestimonialsPreview.tsx` | bg-[#f7f4ef] light, white cards | Dark bg, dark cards |
| `MobileStickyCTA.tsx` | `bg-white border-gray-200` | Dark bg (`bg-[#0f1f2d]` or `bg-[#111]`) |
| `page.tsx` | 6 sections including AboutPreview | New order per spec |

### Public Assets

Only `logo.svg` is currently in `public/`. No photos exist yet. The client photos mentioned in prior decisions (Kobelco excavator, mini-ex with worker, Deere track loader night snow) must be added to `public/images/` before the Hero and ServicePillars components can reference them.

---

## Dark Theme Implementation Approach

### Global Background Flip

The single most impactful change: flip `body` background in `globals.css`.

**Current:**
```css
body {
  color: #0f1f2d;
  background: #ffffff;
}
```

**Required:**
```css
body {
  color: #ffffff;
  background: #0f1f2d;
}
```

This makes the entire page dark-by-default. Every section that was relying on body background for its color will immediately show the correct dark surface. Sections that need to remain light would explicitly set their own background — but per spec, there are none in Phase 4.

Also update `layout.tsx` viewport `colorScheme` from `"light"` to `"dark"`.

### Section-by-Section Pattern

Every section follows one of three patterns. Pick based on the spec requirement:

**Pattern A — Full dark surface (near-black):**
```tsx
<section className="bg-brand-dark text-white">
  {/* or bg-[#0f1f2d] inline if needed */}
</section>
```

**Pattern B — Slightly elevated dark surface (mid):**
```tsx
<section className="bg-brand-mid text-white">
  {/* #2d4f64 — creates subtle section separation on dark pages */}
</section>
```

**Pattern C — Photo background with dark overlay:**
```tsx
<section className="relative">
  <Image src="/images/hero.jpg" fill className="object-cover" alt="" priority />
  <div className="absolute inset-0 bg-[#0f1f2d]/70" />  {/* overlay */}
  <div className="relative z-10">
    {/* content */}
  </div>
</section>
```

**Dark-on-dark dividers** (VSRL-05): use `border-white/10` or `border-brand-mid` — never `border-gray-200` or bright white.

---

## Hero Rebuild

### Current State

The Hero already has the right structure: full-viewport dark section, two CTAs, desktop form (always rendered), mobile expandable form, shared `formStatus` state. The missing elements are:

1. Background is a CSS gradient, not a real machine photo
2. The "Now Booking" badge doesn't include "Licensed & Insured" or "WCB Alberta" (CONV-02)
3. The heading uses `font-black` (Tailwind's 900 weight) — correct per spec

### Full-Bleed Photo Background with Next.js Image

**Use `fill` with `object-cover` inside a `relative` parent.** Do NOT use CSS `background-image` — Next.js Image handles optimization, lazy loading, and format conversion automatically.

```tsx
// Source: Next.js docs — next/image fill usage
<section className="relative min-h-[100svh] flex items-center overflow-hidden">
  {/* Photo layer */}
  <Image
    src="/images/hero-excavator.jpg"
    alt=""                    // decorative — empty alt
    fill
    priority                  // LCP image — must have priority
    className="object-cover object-center"
    sizes="100vw"
  />
  {/* Dark overlay — blend photo with brand dark */}
  <div className="absolute inset-0 bg-[#0f1f2d]/70" />
  {/* Optional: subtle gradient to ensure text legibility at bottom */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/40 to-transparent" />
  {/* Content */}
  <div className="container-custom relative z-10 pt-24 pb-16">
    {/* existing content unchanged */}
  </div>
</section>
```

**Key rules for the photo:**
- `priority` is mandatory — this is above the fold, it IS the LCP element. Without `priority`, Next.js lazy-loads it and Lighthouse will flag it.
- `fill` requires the parent to be `position: relative` (or absolute/fixed) with explicit dimensions. The `min-h-[100svh]` on the section satisfies this.
- `sizes="100vw"` tells Next.js to serve appropriately sized images for viewport width.
- `alt=""` because the image is decorative — the heading text carries the semantic meaning.

**Image file prep (sharp):** Sharp is already listed in the prior decisions stack. Next.js 14 uses sharp automatically for image optimization when installed. Just drop the photo files in `public/images/` and Next.js handles the rest.

**Recommended photo filenames:**
- `/images/hero-excavator.jpg` — Kobelco on job site (Hero)
- `/images/excavation-pillar.jpg` — mini-ex with worker (Excavation pillar)
- `/images/snow-pillar.jpg` — Deere track loader night (Snow Removal pillar)

### Overlay Opacity Calibration

The overlay opacity determines text legibility. For these dark photos:
- Start at `bg-[#0f1f2d]/60` — test legibility
- If photo texture is too muted: drop to `/50`
- If white text is hard to read: increase to `/70` or `/75`
- Never go above `/85` — kills the "machine photo" effect

### Form State Preservation

**Do not touch the form logic.** The `formStatus` shared state between desktop and mobile forms is explicitly called out in prior decisions as intentional. The `handleSubmit` setTimeout pattern is also intentional (fake backend). Preserve verbatim.

---

## Nav Rebuild

### Current Issues

**Header.tsx — three problems to fix:**

1. **Scroll behavior:** `isScrolled ? "bg-white shadow-lg" : "bg-transparent"` — must become always dark:
   ```tsx
   // Replace:
   isScrolled ? "bg-white shadow-lg ..." : "bg-transparent ..."
   // With:
   isScrolled
     ? "bg-[#0f1f2d]/95 backdrop-blur-sm shadow-lg shadow-black/30"
     : "bg-[#0f1f2d]/80 backdrop-blur-sm"
   ```

2. **Nav link colors:** Currently `isScrolled ? "text-[#0f1f2d]" : "text-white/90"` — simplify to always white:
   ```tsx
   "text-white/80 hover:text-[#F5A623]"
   // active route:
   "text-[#F5A623]"
   ```

3. **Logo text color:** Currently `isScrolled || isMobileMenuOpen ? "text-[#0f1f2d]" : "text-white"` — simplify to always white.

4. **Phone link color:** Same simplification — always white.

5. **Mobile menu button:** Currently `isScrolled || isMobileMenuOpen ? "text-[#0f1f2d]" : "text-white"` — always white.

### Mobile Menu Overlay — Dark

**Current:** `absolute inset-0 bg-white` backdrop with `text-[#0f1f2d]` links.

**Required:** Full-screen dark overlay. Replace:
```tsx
// Backdrop:
<div className="absolute inset-0 bg-[#0f1f2d]" ... />

// Nav links (large, dark bg):
className="py-4 text-2xl font-black uppercase tracking-wider border-b border-white/10 text-white active:text-[#F5A623]"

// Phone button in mobile menu bottom section:
className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-white bg-white/10 active:bg-white/20"

// Border above bottom actions:
"border-t border-white/10"
```

### Z-Index Stacking — Confirmed Correct

From reading the code, the z-index stack is already right:
- SeasonalBar: `z-[60]` — scrolls away with page, sits above everything while visible
- Header: `z-50` — fixed, always visible below SeasonalBar position
- Mobile menu panel: `z-40` — behind header's hamburger button (`z-50`)
- MobileStickyCTA: `z-40` — bottom of screen

No z-index changes needed. The only issue: the mobile menu `translate-x-full` animation slide is from the right — this is fine to keep or could be changed to a fade. The spec says "full-screen dark overlay" which suggests fade is cleaner.

**Recommended mobile menu transition change:** Replace `translate-x-full / translate-x-0` with opacity/visibility that already exists on the outer wrapper. This gives a cleaner overlay feel vs. slide-in panel.

### NAV-01 Link Count

Current nav has 5 links: Home, Services, About, Reviews, Contact. The spec says max 6. Already compliant.

---

## New Homepage Sections

### Required Homepage Section Order (page.tsx)

Per spec requirements HOME-01 through HOME-07:

```
1. Hero (HOME-01) — existing, photo bg upgrade
2. ServicePillars (HOME-02) — replaces ServicesPreview — two pillar layout with photos
3. WhyBigCountry (HOME-03) — modifies WhyChooseUs — 4 reasons, no embedded CTA
4. Testimonials (HOME-06) — replaces TestimonialsPreview — dark bg
5. CTABanner (HOME-07) — replaces CTASection — bold headline + phone/quote CTAs
```

**Remove from homepage:** `AboutPreview` — not in the spec requirements for Phase 4.

**New page.tsx:**
```tsx
import Hero from "@/components/Hero";
import ServicePillars from "@/components/ServicePillars";
import WhyBigCountry from "@/components/WhyBigCountry";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicePillars />
      <WhyBigCountry />
      <Testimonials />
      <CTABanner />
    </>
  );
}
```

**Component naming:** Create new components rather than renaming. Keep the old ones (`ServicesPreview`, `WhyChooseUs`, `TestimonialsPreview`, `CTASection`) untouched — they may be referenced on other pages (e.g., `/services`, `/about`).

### ServicePillars (HOME-02)

**Structure:** Two equal columns desktop / stacked mobile. Each column is a self-contained pillar with photo background.

```tsx
// Pattern for each pillar card:
<div className="relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-auto">
  {/* Photo */}
  <Image src="/images/excavation-pillar.jpg" fill className="object-cover" alt="Excavation services" />
  {/* Dark overlay — heavier at bottom for text legibility */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/90 via-[#0f1f2d]/40 to-transparent" />
  {/* Content — anchored to bottom */}
  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">Excavation</h3>
    <ul className="space-y-1 mb-4">
      {items.map(item => (
        <li className="text-white/80 text-sm flex items-center gap-2">
          <span className="text-[#F5A623]">—</span> {item}
        </li>
      ))}
    </ul>
    <Link href="/services" className="btn-primary w-fit">Learn More</Link>
  </div>
</div>
```

**Section wrapper:**
```tsx
<section className="section-padding bg-[#0f1f2d]">
  <div className="container-custom">
    <div className="grid md:grid-cols-2 gap-6">
      {/* Excavation pillar */}
      {/* Snow Removal pillar */}
    </div>
  </div>
</section>
```

### WhyBigCountry (HOME-03)

**Spec requires exactly 4 reasons (not the current 6):**
- 01 — 24/7 Availability
- 02 — Licensed & Insured
- 03 — Commercial-Grade Equipment
- 04 — Alberta-Based

**Accent-colored numbers** (VSRL-04): The current WhyChooseUs uses `text-[#F5A623]/10` (very faded) for the background number. The new version should make numbers prominent/foreground:

```tsx
// Current (faded watermark style):
<div className="text-4xl font-black text-[#F5A623]/10 absolute top-4 right-4">{number}</div>

// Required (prominent accent number):
<div className="text-5xl font-black text-[#F5A623] mb-3">{number}</div>
<h3 className="text-xl font-black text-white mb-2">{title}</h3>
<p className="text-white/60">{description}</p>
```

**4-column grid desktop, 2-column mobile:**
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
```

**No embedded CTA banner.** The CTA function moves to its own CTABanner component.

**Card style:** Dark-on-dark per VSRL-05:
```tsx
<div className="p-6 bg-white/5 border border-white/10 rounded-xl">
```

### Testimonials (HOME-06)

**Replace light background with dark.** The testimonial data (4 quotes) and star ratings can be reused verbatim. Change:

```tsx
// Section:
<section className="section-padding bg-[#0f1f2d]">

// Cards:
<div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">

// Quote text:
<p className="text-white/80 text-base mb-6 leading-relaxed">"{text}"</p>

// Author name:
<div className="font-bold text-white">{name}</div>

// Author location:
<div className="text-sm text-white/50">{location}</div>

// Author avatar circle:
<div className="w-12 h-12 rounded-full bg-brand-mid flex items-center justify-center">
```

**Section header label** (star rating pill): already correct pattern from current file, just flip to white text on dark.

**Grid:** Keep `md:grid-cols-2 lg:grid-cols-4` — only 3 quotes required per spec (HOME-06), but 4 exists and looks better at lg:grid-cols-4.

### CTABanner (HOME-07)

**This is primarily a copy of the existing CTASection with the embedded grid pattern and bold headline.** The existing CTASection is already correct in structure. Make it a new component named `CTABanner` and ensure:

- Headline uses `text-4xl md:text-5xl font-black` (weight 900 per VSRL-03)
- Trust badges row below CTAs (already in CTASection)
- Grid pattern overlay (already in CTASection)
- Do NOT embed this inside WhyBigCountry as the current WhyChooseUs does

---

## Trust Signals and Conversion Elements

### CONV-01 — Phone as tappable tel: link

Already correct in all existing components. Preserve pattern:
```tsx
<a href="tel:+15875551234" aria-label="Call (587) 555-1234">
```

### CONV-02 — Licensed & Insured + WCB Alberta badges

Currently in Hero as plain text trust indicators. For Phase 4, these should be more visually prominent. Pattern to use in Hero trust bar:

```tsx
<div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-lg">
  <svg className="w-4 h-4 text-[#F5A623]" ... />  {/* shield icon */}
  <span className="text-xs font-semibold text-white/90 whitespace-nowrap">Licensed & Insured</span>
</div>
<div className="flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-2 rounded-lg">
  <svg className="w-4 h-4 text-[#F5A623]" ... />  {/* check icon */}
  <span className="text-xs font-semibold text-white/90 whitespace-nowrap">WCB Alberta</span>
</div>
```

### CONV-03 — 24/7 Available badge

Already present in Hero stats bar ("24/7 — Snow Response"). Reinforce in ServicePillars Snow Removal pillar with a prominent pill:
```tsx
<div className="inline-flex items-center gap-2 bg-[#F5A623] text-[#0f1f2d] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
  24/7 Storm Response
</div>
```

### CONV-04 — Form loading + success state

Already implemented in Hero.tsx with `formStatus: 'idle' | 'loading' | 'success'`. The loading spinner and success screen are already present. No changes needed — preserve exactly.

### CONV-05 — Mobile sticky CTA bar

Current `MobileStickyCTA` has correct behavior but wrong colors. Change:
```tsx
// Current:
<div className="... bg-white border-t border-gray-200 ...">
<a ... className="... bg-gray-100 text-[#0f1f2d] ...">Call Now</a>

// Required:
<div className="... bg-[#0f1f2d] border-t border-white/10 ...">
<a ... className="... bg-white/10 text-white ...">Call Now</a>
// Quote button stays amber (already correct)
```

### CONT-03 — Seasonal bar reflects current season

Already working. `seasonal.ts` data file has `active: true` and current message "Now Booking Spring 2026 Excavation". No changes needed for Phase 4.

---

## Architecture Patterns

### Recommended Component Structure After Phase 4

```
src/components/
  Header.tsx            — MODIFIED: always dark, dark mobile overlay
  Hero.tsx              — MODIFIED: photo bg, trust badge upgrade
  SeasonalBar.tsx       — UNCHANGED
  MobileStickyCTA.tsx   — MODIFIED: dark colors
  Footer.tsx            — UNCHANGED
  ServicePillars.tsx    — NEW: replaces ServicesPreview on homepage
  WhyBigCountry.tsx     — NEW: replaces WhyChooseUs on homepage (4 reasons)
  Testimonials.tsx      — NEW: replaces TestimonialsPreview on homepage (dark)
  CTABanner.tsx         — NEW: standalone CTA section (was embedded in WhyChooseUs)
  — Keep existing components unchanged for other pages —
  ServicesPreview.tsx   — KEEP (used on /services or similar)
  WhyChooseUs.tsx       — KEEP (may be used on /about)
  TestimonialsPreview.tsx — KEEP
  CTASection.tsx        — KEEP
  AboutPreview.tsx      — KEEP
```

### New vs. Modify Decision

**Modify in-place:** Header, Hero, MobileStickyCTA, globals.css, layout.tsx
**New components:** ServicePillars, WhyBigCountry, Testimonials, CTABanner

This keeps the existing components available for other pages and avoids regression risk.

### server vs. "use client"

Maintain the current server/client split:
- `Header`, `Hero`, `SeasonalBar`, `MobileStickyCTA` — already `"use client"` (scroll listeners, state)
- `ServicePillars`, `WhyBigCountry`, `Testimonials`, `CTABanner` — **server components** (no interactivity needed)
- `Footer` — server, unchanged

Server components are faster and simpler. Do not add `"use client"` unless the component requires browser APIs or React state.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hero background image | CSS background-image with manual srcset | `next/image` with `fill` + `priority` | Automatic WebP/AVIF, responsive srcset, LCP optimization, lazy/eager loading control |
| Image optimization | Manual sharp pipeline | Next.js built-in (sharp already in stack) | Automatic, zero config |
| Mobile menu body scroll lock | Custom scroll position save/restore | `document.body.style.overflow = "hidden"` | Already implemented in Header, keep it |
| Font loading | Manual `<link rel="preload">` | `next/font/google` with `display: swap` | Already wired, automatic preloading |
| Dark mode toggle | System-level dark mode CSS | Not needed — dark is the fixed design, no toggle | Simpler, no extra complexity |
| Form state machine | External library | Inline `useState` with 'idle'/'loading'/'success' | Already implemented, keep verbatim |

**Key insight:** This is a display/styling phase, not a functionality phase. The temptation to add libraries (framer-motion for section animations, etc.) should be resisted — framer-motion is in the spec stack but Phase 4 is about visual correctness first. Animations can be additive but should not block correctness tasks.

---

## Common Pitfalls

### Pitfall 1: next/image `fill` without relative parent

**What goes wrong:** `Image` with `fill` renders at 0×0 or overflows the page unexpectedly.
**Why it happens:** `fill` positions the image absolutely — it needs a positioned ancestor with explicit dimensions.
**How to avoid:** Always ensure the direct or ancestor wrapper has `position: relative` (Tailwind: `relative`) AND explicit height (`min-h-[100svh]`, `h-[500px]`, or `aspect-*`).
**Warning signs:** Image doesn't appear, or appears as a tiny sliver.

### Pitfall 2: Missing `priority` on Hero image

**What goes wrong:** LCP score tanks — hero image lazy-loads after page is interactive.
**Why it happens:** Next.js defaults all images to lazy. The hero is the largest contentful paint.
**How to avoid:** Every `Image` that is above the fold and likely the LCP element MUST have `priority`.
**Warning signs:** Lighthouse LCP score drops, or a yellow banner in dev console.

### Pitfall 3: White flash on page load

**What goes wrong:** On initial load, the page flashes white for ~100ms before the dark background renders.
**Why it happens:** `body { background: #ffffff }` is the current default. The JS bundle loads and Tailwind applies classes, but the HTML shell's background is white.
**How to avoid:** Change `body { background: #0f1f2d }` in `globals.css`. This is a CSS rule applied at stylesheet parse time — no flash.
**Warning signs:** Obvious white flash on hard refresh or slow connections.

### Pitfall 4: `colorScheme: "light"` persists in layout.tsx

**What goes wrong:** Browser scrollbar, input fields, and system UI elements (date pickers, etc.) render in light mode.
**Why it happens:** The `viewport` export in `layout.tsx` still has `colorScheme: "light"`.
**How to avoid:** Change to `colorScheme: "dark"` in the same commit as the globals.css body background flip.

### Pitfall 5: Forgetting `sizes` prop on fill images

**What goes wrong:** Next.js serves a 3000px image to a 375px mobile screen — wasted bandwidth.
**Why it happens:** Without `sizes`, Next.js assumes the image could be full display width (100vw).
**How to avoid:**
- Hero (full bleed): `sizes="100vw"` — correct assumption
- ServicePillar (half width on desktop): `sizes="(min-width: 768px) 50vw, 100vw"`

### Pitfall 6: Dark overlay z-index conflicts

**What goes wrong:** The dark overlay div covers the content or sits behind the photo.
**Why it happens:** Missing `z-10` on content, or overlay has no explicit z-index.
**How to avoid:** Standard pattern:
- Photo: no z-index (default 0 stacking context)
- Overlay `div`: `absolute inset-0` — sits above photo naturally
- Content `div`: `relative z-10` — explicitly above overlay

### Pitfall 7: Mobile menu opacity animation leaves invisible elements in tab order

**What goes wrong:** Hidden mobile menu links are still tab-accessible when menu is closed.
**Why it happens:** `opacity-0 invisible` + CSS only — `invisible` sets `visibility: hidden` which removes from tab order. Current code uses this correctly.
**How to avoid:** Keep the `invisible` class when menu is closed. Do NOT switch to just `opacity-0` — that leaves invisible links in the tab order.

### Pitfall 8: Non-dark `select` option background on iOS

**What goes wrong:** `<select>` options appear with white background on iOS Safari regardless of CSS.
**Why it happens:** Native iOS form controls ignore most CSS styling.
**How to avoid:** The current Hero form already handles this with `className="bg-[#0f1f2d]"` on each `<option>`. Keep this. Do not try to style further — it's a browser limitation.

### Pitfall 9: AbsolutePreview components broken on other pages

**What goes wrong:** If you rename or delete `ServicesPreview`, `WhyChooseUs`, etc., other pages that import them break.
**Why it happens:** Not checking where existing components are imported before modifying.
**How to avoid:** Create new components for the homepage. Keep old ones for other pages. Check all imports before deleting any component file.

---

## Wave/Dependency Order

Build in this exact order. Each step's output is needed by the next.

```
Wave 1 — Global Foundation (no dependencies)
  1a. globals.css: body background → #0f1f2d, color → white
  1b. layout.tsx: colorScheme → "dark"
  → Visual: entire site goes dark. Some sections may look broken — that's expected.

Wave 2 — Navigation (depends on Wave 1)
  2a. Header.tsx: always-dark bg, dark text colors, dark mobile overlay
  → Visual: header no longer flashes white on scroll.

Wave 3 — Hero (depends on Wave 1, photos must exist)
  3a. Add photos to public/images/
  3b. Hero.tsx: replace gradient with photo+overlay, upgrade trust badges
  → Visual: hero shows machine photo with dark overlay.

Wave 4 — New Homepage Sections (depends on Wave 1, photos for pillars)
  4a. ServicePillars.tsx: NEW — dark bg, photo pillars, service lists
  4b. WhyBigCountry.tsx: NEW — 4 reasons, accent numbers
  4c. Testimonials.tsx: NEW — dark bg, dark cards
  4d. CTABanner.tsx: NEW — bold headline, phone+quote CTAs

Wave 5 — Wiring + Polish
  5a. page.tsx: swap component imports to new components, remove AboutPreview
  5b. MobileStickyCTA.tsx: flip to dark colors
  5c. Verify SeasonalBar still correct (should need no changes)

Wave 6 — Verification
  - Check all requirement IDs
  - Mobile viewport test (375px)
  - Tablet viewport test (768px)
  - Scroll behavior (MobileStickyCTA appears/hides correctly)
  - Form submit flow (loading → success)
  - All tel: links are tappable
```

---

## Code Examples

### Dark body in globals.css

```css
/* Source: direct codebase analysis — change from current */
body {
  font-family: var(--font-montserrat), system-ui, sans-serif;
  color: #ffffff;               /* was #0f1f2d */
  background: #0f1f2d;          /* was #ffffff */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  text-rendering: optimizeSpeed;
  -webkit-tap-highlight-color: rgba(245, 166, 35, 0.2);
}
```

### Always-dark Header (key change)

```tsx
// Source: Header.tsx — isScrolled conditional that becomes always-dark
<header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? "bg-[#0f1f2d]/95 backdrop-blur-sm shadow-lg shadow-black/30 py-2 md:py-3"
      : "bg-[#0f1f2d]/80 backdrop-blur-sm py-3 md:py-5"
  }`}
>
```

### Hero photo background pattern

```tsx
// Source: Next.js docs — fill image pattern
<section className="relative min-h-[100svh] flex items-center overflow-hidden">
  <Image
    src="/images/hero-excavator.jpg"
    alt=""
    fill
    priority
    className="object-cover object-center"
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-[#0f1f2d]/70" />
  <div className="relative z-10 container-custom pt-24 pb-16 md:pt-28 md:pb-20">
    {/* hero content unchanged */}
  </div>
</section>
```

### Dark mobile menu overlay

```tsx
// Replace current white backdrop:
<div
  className="absolute inset-0 bg-[#0f1f2d]"
  onClick={() => setIsMobileMenuOpen(false)}
/>

// Replace current nav link styles:
className={`py-4 text-2xl font-black uppercase tracking-wider transition-all duration-300 border-b border-white/10 ${
  isActive(link.href) ? "text-[#F5A623]" : "text-white active:text-[#F5A623]"
}`}
```

### ServicePillar with photo

```tsx
// Source: codebase pattern adapted for photo-backed pillar
<div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[550px]">
  <Image
    src="/images/excavation-pillar.jpg"
    alt="Commercial excavation services"
    fill
    className="object-cover"
    sizes="(min-width: 768px) 50vw, 100vw"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f2d]/95 via-[#0f1f2d]/50 to-[#0f1f2d]/20" />
  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
      Excavation
    </h3>
    <ul className="space-y-1.5 mb-5">
      {items.map(item => (
        <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
          <span className="text-[#F5A623] font-bold">—</span>
          {item}
        </li>
      ))}
    </ul>
    <Link href="/services" className="btn-primary w-fit text-sm">
      Learn More
    </Link>
  </div>
</div>
```

### WhyBigCountry numbered card

```tsx
// Accent-colored number prominent, not watermark
<div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-xl">
  <div className="text-4xl font-black text-[#F5A623] mb-3">{reason.number}</div>
  <h3 className="text-lg md:text-xl font-black text-white mb-2">{reason.title}</h3>
  <p className="text-white/60 leading-relaxed text-sm md:text-base">{reason.description}</p>
</div>
```

### Dark testimonial card

```tsx
// Source: TestimonialsPreview.tsx adapted to dark
<div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
        {/* star path */}
      </svg>
    ))}
  </div>
  <p className="text-white/80 text-base mb-6 leading-relaxed">&ldquo;{text}&rdquo;</p>
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-brand-mid flex items-center justify-center">
      {/* person icon */}
    </div>
    <div>
      <div className="font-bold text-white">{name}</div>
      <div className="text-sm text-white/50">{location}</div>
    </div>
  </div>
</div>
```

### Dark MobileStickyCTA

```tsx
// Source: MobileStickyCTA.tsx — color changes only
<div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0f1f2d] border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] safe-area-bottom">
  <div className="flex items-center gap-2 p-3">
    <a
      href="tel:+15875551234"
      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
    >
      {/* phone icon */}
      <span className="text-sm">Call Now</span>
    </a>
    <Link
      href="/contact"
      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-[#0f1f2d] bg-[#F5A623] active:bg-[#d4921f] transition-colors shadow-lg shadow-[#F5A623]/25 touch-manipulation"
    >
      <span className="text-sm">Get a Quote</span>
      {/* arrow icon */}
    </Link>
  </div>
</div>
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| CSS background-image for hero | `next/image` with `fill` + `priority` | Automatic WebP/AVIF, responsive srcset, LCP signal |
| Separate dark mode toggle | Fixed dark design (no toggle) | Simpler, no flash of wrong color scheme |
| `background-color: white` body | `background-color: #0f1f2d` body | No white flash on load |
| Conditional header color (transparent→white) | Always dark header | Consistent brand, no scroll-triggered flash |

---

## Open Questions

1. **Photos need to be staged before Hero and ServicePillars can be verified**
   - What we know: The client has photos (Kobelco excavator, mini-ex, Deere night snow)
   - What's unclear: Whether they are in the working directory or need to be transferred, and what their actual filenames/resolution are
   - Recommendation: Add a task to copy photos to `abc-roofing/public/images/` as the first task in Wave 3. Use the root-level `.jpg` files visible in git status (`big country.jpg`, `504077954...jpg`, `504342873...jpg`) as candidates — but they need quality review for use as hero/pillar backgrounds.

2. **framer-motion is in the stack (prior decisions) but not installed**
   - What we know: `package.json` shows only react, react-dom, next as dependencies. framer-motion is NOT installed.
   - What's unclear: Whether animations are required in Phase 4 or deferred
   - Recommendation: Do not install framer-motion in Phase 4. The visual correctness goals (dark theme, photos, structure) do not require it. CSS transitions already in the codebase (`transition-all duration-300`) are sufficient. Flag for Phase 5 or 6 if scroll-triggered animations are desired.

3. **lucide-react and yet-another-react-lightbox are also not installed**
   - What we know: Both listed in prior decisions stack but absent from package.json
   - What's unclear: Whether any Phase 4 component needs them
   - Recommendation: lucide-react could replace the inline SVG icons in Header/Hero/CTAs for cleaner code, but is not required. Do not add it in Phase 4 unless there's a specific need that inline SVG cannot meet. The lightbox is definitely not needed in Phase 4.

---

## Sources

### Primary (HIGH confidence)

- Direct file reads of all source files:
  - `abc-roofing/src/app/layout.tsx`
  - `abc-roofing/src/app/globals.css`
  - `abc-roofing/src/app/page.tsx`
  - `abc-roofing/src/components/Header.tsx`
  - `abc-roofing/src/components/Hero.tsx`
  - `abc-roofing/src/components/ServicesPreview.tsx`
  - `abc-roofing/src/components/WhyChooseUs.tsx`
  - `abc-roofing/src/components/TestimonialsPreview.tsx`
  - `abc-roofing/src/components/CTASection.tsx`
  - `abc-roofing/src/components/MobileStickyCTA.tsx`
  - `abc-roofing/src/components/SeasonalBar.tsx`
  - `abc-roofing/src/components/Footer.tsx`
  - `abc-roofing/src/components/AboutPreview.tsx`
  - `abc-roofing/tailwind.config.ts`
  - `abc-roofing/package.json`
  - `abc-roofing/next.config.mjs`
  - `abc-roofing/src/data/seasonal.ts`

### Secondary (MEDIUM confidence)

- Next.js 14 `next/image` fill + priority behavior — based on training knowledge verified against known Next.js 14 documentation patterns. The API has been stable since Next.js 13.

---

## Metadata

**Confidence breakdown:**
- Current codebase state: HIGH — direct file reads, no inference
- Standard stack: HIGH — package.json is the ground truth
- Architecture patterns: HIGH — based on existing codebase conventions
- Photo/Image approach: HIGH — next/image fill is standard and stable
- Pitfalls: HIGH — specific to this codebase, not generic guesses

**Research date:** 2026-03-04
**Valid until:** This research is codebase-specific. Valid indefinitely as long as the source files haven't changed. Revalidate if Phase 1-3 work modified any of the files listed above.
