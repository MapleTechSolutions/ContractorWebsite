# Phase 1 Research: Rebrand Foundation

**Date:** 2026-03-03
**Source:** Direct codebase inspection of all affected files

---

## Logo Color Analysis

The SVG logo (`Excavator and Snow Plow in Motion Logo.svg`) contains exactly one unique color:
- `#2d4f64` — steel blue / dark teal (the dominant brand color)

**Derived new brand palette (replaces the generic dark green + gold):**

| Token | Hex | Role |
|-------|-----|------|
| `brand-dark` | `#0f1f2d` | Near-black steel — hero BG, dark sections |
| `brand-mid` | `#2d4f64` | Steel blue (logo color) — mid sections, accents |
| `brand-light` | `#3d6882` | Lighter steel — hover states, subtle BG |
| `brand-accent` | `#F5A623` | Construction amber — CTAs, highlights (replaces #FCB215) |
| `brand-surface` | `#f7f4ef` | Warm off-white — light section backgrounds |

**Rationale:**
- Dark green (#094026) felt residential/lawn; steel blue (#0f1f2d / #2d4f64) reads as heavy equipment + industrial
- Construction amber is instantly recognizable (CAT-adjacent) and maintains high contrast on dark backgrounds
- Minimal change philosophy: accent stays close to original gold, so globals.css utility classes need minimal updates

---

## Current Color System (Everything That Must Change)

### In globals.css
Hardcoded values requiring replacement:
- `color: #094026` on body → `color: #0f1f2d`
- `:root --primary-dark: #094026` → `#0f1f2d`
- `:root --primary-mid: #0a5530` → `#2d4f64`
- `:root --accent-primary: #FCB215` → `#F5A623`
- `:root --accent-highlight: #FCB215` → `#F5A623`
- `-webkit-tap-highlight-color: rgba(252, 178, 21, 0.2)` → `rgba(245, 166, 35, 0.2)`
- Scrollbar track `background: #094026` → `#0f1f2d`
- Scrollbar thumb `background: #FCB215` → `#F5A623`
- Scrollbar thumb hover `background: #e5a013` → `#d4921f`
- `btn-primary`: `bg-[#FCB215]`, `hover:bg-[#e5a013]`, `text-[#094026]`, shadow colors
- `btn-secondary`: `bg-[#094026]`, `hover:bg-[#0a5530]`, `active:bg-[#063d22]`
- `btn-outline`: `border-[#FCB215]`, `text-[#FCB215]`, `hover:bg-[#FCB215]`, `hover:text-[#094026]`, `active:bg-[#e5a013]`
- `btn-outline-white`: `hover:text-[#094026]`
- `section-dark`: `bg-[#094026]`
- `accent-text`: `text-[#FCB215]`
- `gradient-text`: `from-[#FCB215] to-[#094026]`
- `form-input`: `focus:ring-[#FCB215]/20`, `focus:border-[#FCB215]`
- `::selection`: `background: #FCB215`, `color: #094026`
- `:focus-visible`: `outline: 2px solid #FCB215`

### In tailwind.config.ts
- `fontFamily.sans: ['Plus Jakarta Sans', ...]` — body/fallback font (note: Montserrat is loaded separately)
- `boxShadow.glow` references `rgba(251, 191, 36, 0.5)` (FCB215 equivalent) → update to `rgba(245, 166, 35, 0.5)`
- `boxShadow.glow-lg` same → update
- Add brand color tokens to `extend.colors`

### In layout.tsx
- `themeColor: "#094026"` → `"#0f1f2d"`
- `metadataBase: new URL("https://yourcompany.com")` → new URL for Big Country
- All `"Company Name"` strings → `"Big Country Landscaping & Maintenance Ltd"`
- `description` → Big Country description
- `keywords` → excavation, snow removal, Alberta specific
- `openGraph.siteName`, `title`, `description` → Big Country
- `twitter.title`, `description` → Big Country
- `<link rel="canonical">` → update URL

### In Header.tsx
- Inline SVG house icon → replace with `<Image src="/logo.svg" ...>` (or `<Image src="/logo.png" ...>`)
- `"COMPANY NAME"` → Big Country name (shortened version for header)
- `"Professional Contractors"` → `"Excavation & Snow Removal"`
- `tel:5551234567` (×2) → `tel:+15875551234`
- `"(555) 123-4567"` (×1 visible, ×1 aria) → `"(587) 555-1234"`
- `"Free Estimate"` / `"Get Free Estimate"` → `"Get a Quote"`
- Color: `#094026` (×8), `#FCB215` (×5) → new tokens

### In Footer.tsx
- Inline SVG house icon → logo image
- `"COMPANY NAME"` → Big Country shortened
- `"Professional Contractors"` → `"Excavation & Snow Removal"`
- `"Your trusted local contractor..."` → Big Country copy
- `tel:5551234567` → `tel:+15875551234`
- `"(555) 123-4567"` → `"(587) 555-1234"`
- `href="mailto:info@company.com"` → `info@bigcountrylandscaping.ca`
- `"info@company.com"` → `"info@bigcountrylandscaping.ca"`
- Services list: "Residential, Commercial, Renovations, Repairs, Construction" → excavation/snow services
- `"© {year} Company Name."` → Big Country name
- Hours: `"Mon-Fri: 8AM-6PM"`, `"Sat: 9AM-2PM"` → adjust for contractor (seasonal)
- Add service area line: `"Serving Big Country region, Alberta"`
- Colors: `#094026` (×4), `#FCB215` (×7), `#e5a013` (×1) → new tokens

### In Hero.tsx
- Hero headline `"Quality Craftsmanship Guaranteed"` → excavation/snow removal headline
- Badge: `"Trusted Local Professionals"` → context-appropriate
- CTA `"Get Free Estimate"` → `"Get a Quote"`
- `tel:5551234567` (×1) → `tel:+15875551234`
- `"(555) 123-4567"` → `"(587) 555-1234"`
- Subtext: `"Professional contracting services for residential and commercial properties."` → Big Country copy
- Services select options: generic → Excavation, Snow Removal, Site Prep, Other
- Stats: "15+ Years", "500+ Projects" etc → to be confirmed with client, keep reasonable placeholders
- Trust badges: "Licensed & Insured", "Free Estimates", "Satisfaction Guaranteed" → "WCB Alberta", "Alberta One-Call Certified", "Free Site Estimates"
- Form title: `"Get Your Free Quote"` → keep or update
- Hero background gradient: `from-[#094026] via-[#0a5530] to-[#063d22]` → new steel blue gradient
- Colors: many `#094026`, `#FCB215`, `#0a5530`, `#063d22` → new tokens

### In MobileStickyCTA.tsx
- `tel:5551234567` → `tel:+15875551234`
- `"Free Estimate"` → `"Get a Quote"`
- Colors: `#094026`, `#FCB215`, `#e5a013` → new tokens

### In Contact.tsx (form UI state update)
**Current:** `setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 1500)` — fake handler
**New:** Replace with proper `useState` for loading/success/error. No real endpoint. Pattern:
```tsx
const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
// onSubmit: set 'loading', after 500ms set 'success' (simulated)
// Show loading spinner during loading
// Show success message on success
// Show error message on error (use for demo: error state optional)
```
The form currently has: name, phone, email, service dropdown, message.
Update service options to: Excavation, Snow Removal, Site Prep, Other.
Update contact info displayed on the page.

### In ServicesPreview.tsx, Services.tsx, About.tsx, WhyChooseUs.tsx, etc.
Content pass — all generic copy needs Big Country identity.

### In sitemap.ts and robots.ts
URLs reference `yourcompany.com` → update appropriately.

### In app/page.tsx, app/about/page.tsx, etc.
Metadata exports need updated titles and descriptions.

---

## New Color Tokens for tailwind.config.ts

```ts
extend: {
  colors: {
    brand: {
      dark: '#0f1f2d',      // near-black steel (hero BG, dark sections)
      mid: '#2d4f64',       // steel blue from logo (mid sections)
      light: '#3d6882',     // lighter steel (hover, subtle BG)
      accent: '#F5A623',    // construction amber (CTAs, highlights)
      surface: '#f7f4ef',   // warm off-white (light section BG)
    },
  },
  fontFamily: {
    sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
  },
  boxShadow: {
    'glow': '0 0 40px -10px rgba(245, 166, 35, 0.5)',
    'glow-lg': '0 0 60px -15px rgba(245, 166, 35, 0.6)',
  },
}
```

---

## Font Migration: @import → next/font/google

**Current:** `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');` in globals.css
**Current body:** `font-family: 'Montserrat', system-ui, sans-serif;`
**tailwind.config.ts** currently declares `fontFamily.sans: ['Plus Jakarta Sans', ...]` — inconsistent, not actively used

**Migration steps:**
1. In `src/app/layout.tsx`, add:
```tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})
```
2. Apply to `<html>` tag: `<html lang="en" className={montserrat.variable}>`
3. In `globals.css`: Remove `@import url(...)` line
4. Update body rule: `font-family: var(--font-montserrat), system-ui, sans-serif;`
5. In `tailwind.config.ts`: Update `fontFamily.sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif']`

---

## SeasonalBar Integration Point

**Current layout.tsx body:**
```tsx
<body className="antialiased">
  <Header />
  <main>{children}</main>
  <Footer />
  <MobileStickyCTA />
</body>
```

**Updated layout.tsx body:**
```tsx
<body className={`antialiased ${montserrat.variable}`}>
  <SeasonalBar />
  <Header />
  <main>{children}</main>
  <Footer />
  <MobileStickyCTA />
</body>
```

**SeasonalBar component** reads from `src/data/seasonal.ts`:
```ts
// src/data/seasonal.ts
export const seasonalMessage = {
  text: "Now Booking Spring 2026 Excavation — Spots Filling Fast",
  ctaText: "Get a Quote",
  ctaHref: "/contact",
  active: true, // set to false to hide bar completely
}
```

**SeasonalBar behavior:**
- Renders a slim banner above the header (branded: brand-accent bg, brand-dark text)
- Dismissable: clicking X stores `sessionStorage.setItem('seasonal-bar-dismissed', 'true')` — gone for rest of session
- If `active: false` in data file → renders nothing
- Height should NOT push header down on mobile — position: static (not fixed), so it's above the fixed header naturally
- On dismissal, the space collapses

**Header z-index note:** Header is `z-50 fixed top-0`. SeasonalBar renders before Header in DOM. Since it's not fixed, it causes the page to start at offset = bar height. Already handled by the pt-24 on page content.
Wait: actually the header is fixed, so it overlaps the seasonal bar. The SeasonalBar should also be `fixed` with a higher z-index, and the Header's `top-0` should become `top-[bar-height]` when bar is visible... OR simpler: make the bar non-fixed and just height-adjust the body padding.

**Simpler approach:**
- SeasonalBar is `sticky top-0 z-[60]` (above header)
- Header stays `fixed top-0 z-50` but add a CSS variable for the offset height
- OR: SeasonalBar is position:static (in normal flow), Header adjusts with JS — too complex
- **Recommended:** SeasonalBar uses `sticky top-0 z-[60]` — it will scroll away with the page naturally, and Header (fixed z-50) then shows just below. The `pt-24` on page content accounts for header height only. No JS needed.

Actually simplest: make bar sticky top-0 z-60, header fixed top-0 z-50. When user scrolls, bar scrolls away, header stays fixed. Visual stacking is fine.

---

## Form UI State Requirements

### Hero.tsx — Desktop and Mobile forms
**Current:** No `onSubmit` handler at all — clicking "Request Free Quote" / "Get Free Quote" does nothing (form just submits to page reload in browser)

**Fix:** Make both forms `"use client"` (already is), add submit handler:
```tsx
const [formStatus, setFormStatus] = useState<'idle'|'loading'|'success'>('idle')

function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setFormStatus('loading')
  setTimeout(() => setFormStatus('success'), 800)
}
```
Show spinner on button when loading.
Show success message replacing form when success.

### Contact.tsx — Full contact form
**Current:**
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
// ...
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  await new Promise(resolve => setTimeout(resolve, 1500));
  setIsSubmitting(false);
  setIsSuccess(true);
};
```
This is already functional UI-wise! Just needs content updates (service options, copy). The existing pattern is fine. Clean it up slightly: use explicit state type.

---

## Plan Execution Notes

### Plan 01-01 (Color, Font, Logo, Layout) — Order matters:
1. **First:** Copy logo files to `abc-roofing/public/` → enables all logo integration work
2. **Second:** Update `tailwind.config.ts` — add brand color tokens, update fontFamily
3. **Third:** Update `globals.css` — remove @import, update all hardcoded colors in utility classes, update CSS variables
4. **Fourth:** Update `layout.tsx` — add next/font/google, SeasonalBar import slot, update metadata
5. **Fifth:** Update `Header.tsx` — replace inline SVG with logo image, update colors and text
6. **Sixth:** Update `Footer.tsx` — same

**Logo in header:** Use `<Image src="/logo.svg" alt="Big Country Landscaping & Maintenance Ltd" width={48} height={48}>` — the SVG is already in the right aspect. Put it directly in the link block, remove the colored square container.

**Note on logo SVG:** The logo SVG file is 640KB — large for inline. Use `<Image>` from `next/image` with `src="/logo.svg"`. This avoids inlining and lets Next.js handle caching.

**Note on logo PNG:** 7.7MB PNG is too large for direct use. Copy to public/ for reference, but use SVG in the components.

### Plan 01-02 (Content Pass) — Key content decisions:
- **Company name display:** Use `"Big Country Landscaping"` in header (space-constrained) and `"Big Country Landscaping & Maintenance Ltd"` in footer, about, metadata
- **Hero headline:** Something like "Moving Earth. Clearing Snow." / "Heavy Equipment. Reliable Service." / "Big Country Work. Professional Results."
- **Services:** Drop ALL generic contractor services. Only: Excavation (site clearing, rough grading, trenching, demolition, frost work) and Snow Removal (commercial lots, salting/de-icing, snow hauling, 24/7 response)
- **Stats bar in Hero:** Keep same 4 stats but with excavation/snow framing: "15+ Years", "Commercial Contracts", "24/7 Snow Response", "Alberta One-Call"
- **Trust badges:** "WCB Alberta", "Alberta One-Call Certified", "Free Site Estimates"
- **Testimonials:** 4 commercial-voice testimonials from property managers, developers, or commercial lot owners
- **Service area:** "Serving Big Country region, Alberta" in multiple places

### Plan 01-03 (Forms + Seasonal Bar) — Simple approach:
- `src/data/seasonal.ts` — export `seasonalMessage` object
- `src/components/SeasonalBar.tsx` — Client Component, reads from seasonal.ts, uses sessionStorage for dismiss
- Hero forms — add `handleSubmit` with loading/success state
- Contact form — service options update only (UI state already works)

### Gotchas:
1. The `tailwind.config.ts` fontFamily currently says 'Plus Jakarta Sans' but Montserrat is the actual loaded font via @import. After migration, reference `var(--font-montserrat)` in both tailwind config and globals.css body.
2. The Header is `position: fixed` — SeasonalBar must be either fixed (z>50) or sticky. Sticky approach is simplest.
3. The `<html lang="en">` tag needs `className={montserrat.variable}` added.
4. The `abc-roofing/public/` directory may be empty — verify it exists before copying logo files.
5. `next/image` requires either a remote URL or files in the `public/` folder. Logo must be in `abc-roofing/public/` (not the project root).
6. SEO: for a demo, `metadataBase` can be set to the Vercel URL or a temporary placeholder like `https://bigcountrylandscaping.ca`.
