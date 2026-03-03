# Architecture Research: Big Country Rebrand

**Project:** Big Country Landscaping & Maintenance Ltd — v2.0 Rebrand
**Researched:** 2026-03-03
**Confidence:** HIGH (all findings from direct codebase inspection)

---

## Build Order

The recommended sequence is: color system first, then identity (logo + header/footer), then structural changes (layout), then content on existing pages, then new data files, then new components, then the gallery page last.

**Why this order matters:** Colors and identity touch every component. If you change content (Hero text, services copy) before colors are set, you do every component twice. If you add SeasonalBar to layout.tsx before colors are set, it renders in the wrong palette. Getting the design foundation right first means everything built after it looks correct on first render.

### Recommended Sequence

```
Step 1: Color system + font reconciliation
  - tailwind.config.ts — define semantic color names for new palette
  - globals.css — update CSS variables, update hardcoded hex values in utility classes
  - Validate by running dev server; body text and scrollbar should reflect new palette

Step 2: Logo to /public/ + Header rebrand
  - Create abc-roofing/public/ directory
  - Copy logo PNG and SVG into abc-roofing/public/
  - Update Header.tsx — replace inline SVG house icon with next/image logo, update all
    hardcoded hex values to new palette, update company name, phone, nav links
  - Update Footer.tsx — same logo swap, update contact info, quick links (add Gallery)

Step 3: layout.tsx structural changes
  - Add SeasonalBar import and placement above <Header>
  - Update metadata (title, description, themeColor, OG data) for Big Country
  - Create SeasonalBar component first (see New Component Architecture)

Step 4: Content pass on existing components
  - Hero.tsx — new headline, new services description, updated phone, new CTA text
  - ServicesPreview.tsx — replace 6 generic services with Excavation + Snow Removal cards
  - AboutPreview.tsx — Big Country story, correct credentials
  - WhyChooseUs.tsx — industry-relevant trust signals
  - TestimonialsPreview.tsx — placeholder testimonials in correct industry voice
  - CTASection.tsx — seasonal and service-appropriate CTAs
  - MobileStickyCTA.tsx — update phone number

Step 5: Full-page content (pages that compose existing components)
  - services/page.tsx — structured around Excavation and Snow Removal service groups
  - about/page.tsx — Big Country story, equipment/team focus
  - reviews/page.tsx — testimonials in correct voice
  - contact/page.tsx — correct phone, email, hours, location

Step 6: New data files
  - src/lib/gallery-data.ts — gallery items with Excavation/Snow Removal/Site Prep categories
  - src/lib/equipment-data.ts — equipment roster with machine specs

Step 7: New components
  - src/components/SeasonalBar.tsx
  - src/components/sections/EquipmentRoster.tsx
  - src/components/sections/GalleryContent.tsx (from GALLERY_FEATURE_INSTRUCTIONS.md)
  - src/components/ui/motion-wrapper.tsx (from GALLERY_FEATURE_INSTRUCTIONS.md)
  - src/components/sections/GalleryPreview.tsx (homepage teaser)

Step 8: Gallery page + nav wire-up
  - src/app/gallery/page.tsx — new route
  - Add Gallery to navLinks array in Header.tsx
  - Add Gallery to Quick Links in Footer.tsx
  - Add GalleryPreview to homepage (src/app/page.tsx)
```

---

## Theme Migration

### Current State

The existing color system has two layers that are **out of sync with each other:**

1. **CSS variables in globals.css** — define the palette semantically:
   ```css
   --primary-dark: #094026
   --primary-mid: #0a5530
   --accent-primary: #FCB215
   ```

2. **Components use hardcoded hex values in JSX** — do NOT use the CSS variables:
   ```tsx
   className="bg-[#094026] text-[#FCB215]"
   ```

3. **tailwind.config.ts** — defines a `primary` amber scale that is unused everywhere in components, plus sets `fontFamily.sans` to `'Plus Jakarta Sans'` while globals.css loads and uses **Montserrat**.

This means CSS variables are decorative — they have no downstream effect. The real color source of truth is the hardcoded hex values scattered across every component.

### Logo-Derived Color Palette

The logo SVG (`Excavator and Snow Plow in Motion Logo.svg`) was inspected directly. The only parsed fill color is **`#2d4f64`** — a dark industrial steel-teal. This is the primary brand color the new theme should build from.

Recommended new palette derived from the logo:

| Role | CSS Var Name | Hex | Description |
|------|-------------|-----|-------------|
| Brand core | `--brand-steel` | `#2d4f64` | Exact logo color — dark steel-teal |
| Brand dark | `--brand-dark` | `#1a2c38` | Deeper navy-steel for hero backgrounds |
| Brand darker | `--brand-darkest` | `#0f1c24` | Near-black for full-dark sections |
| Accent | `--accent-amber` | `#F5A623` | Industrial amber (warm, reads as machinery safety color) |
| Accent dark | `--accent-amber-dark` | `#D4911E` | Hover state for amber |
| Surface | `--surface-light` | `#f1f5f8` | Cool-tinted off-white (industrial, not warm white) |
| Text muted | `--text-muted` | `#8ca0b0` | Steel-tinted gray for secondary text |

Note: `#F5A623` is a deliberate pivot from the existing `#FCB215` — slightly warmer and more saturated, reads as "machinery safety orange" rather than "gold". If you prefer to keep the exact existing gold, use `#FCB215` — it works. Confirm with client or logo designer.

### Migration Approach

**Do not try to make components consume CSS variables via `var(--primary-dark)` in Tailwind classes** — that pattern requires Tailwind CSS v4 or manual `@layer base` variable binding that doesn't exist here. Stick with the existing approach (hardcoded hex in JSX classes) but switch to **named Tailwind classes** defined in the config.

**Step 1 — tailwind.config.ts:** Replace the unused `primary` amber scale with Brand Country-specific semantic names:

```ts
theme: {
  extend: {
    colors: {
      brand: {
        steel:   '#2d4f64',
        dark:    '#1a2c38',
        darkest: '#0f1c24',
      },
      accent: {
        amber:     '#F5A623',
        'amber-dark': '#D4911E',
      },
    },
    fontFamily: {
      // Fix the existing config discrepancy: config says 'Plus Jakarta Sans'
      // but globals.css loads and uses Montserrat. Unify here.
      sans: ['Montserrat', 'system-ui', 'sans-serif'],
    },
  }
}
```

**Step 2 — globals.css:** Update CSS variables and all hardcoded hex inside `@layer components`:

Replace in `globals.css`:
- `#094026` → `#1a2c38` (brand-dark)
- `#0a5530` → `#2d4f64` (brand-steel)
- `#FCB215` → `#F5A623` (accent-amber)
- `#e5a013` → `#D4911E` (accent-amber-dark)
- `#063d22` → `#0f1c24` (brand-darkest)

Update CSS variable names in `:root` to reflect the new purpose:
```css
:root {
  --brand-steel:   #2d4f64;
  --brand-dark:    #1a2c38;
  --brand-darkest: #0f1c24;
  --accent-amber:  #F5A623;
  --accent-amber-dark: #D4911E;
  --text-light: #ffffff;
  --text-muted: #8ca0b0;
  --surface-light: #f1f5f8;
}
```

**Step 3 — Components:** A targeted find-and-replace across all `.tsx` files:
- `[#094026]` → `[#1a2c38]` (or `brand-dark` via Tailwind class)
- `[#0a5530]` → `[#2d4f64]` (or `brand-steel`)
- `[#FCB215]` → `[#F5A623]` (or `accent-amber`)
- `[#e5a013]` → `[#D4911E]`
- `[#063d22]` → `[#0f1c24]`
- The `bg-black` in Footer stays — it works fine for the industrial look

### Risk: The themeColor viewport value
`layout.tsx` has `themeColor: "#094026"` (browser tab color on Android). Update to `#1a2c38`. Easy to miss.

---

## New Component Architecture

### File Location Strategy

The existing project uses a **flat `/src/components/` structure** — all 13 components sit at the same level with no subdirectories. For the new components, introduce subdirectories without moving existing files:

```
src/
  components/
    Header.tsx              ← existing, stays here
    Footer.tsx              ← existing, stays here
    Hero.tsx                ← existing, stays here
    ServicesPreview.tsx     ← existing, stays here
    AboutPreview.tsx        ← existing, stays here
    WhyChooseUs.tsx         ← existing, stays here
    TestimonialsPreview.tsx ← existing, stays here
    CTASection.tsx          ← existing, stays here
    Services.tsx            ← existing, stays here
    About.tsx               ← existing, stays here
    Testimonials.tsx        ← existing, stays here
    Contact.tsx             ← existing, stays here
    MobileStickyCTA.tsx     ← existing, stays here
    SeasonalBar.tsx         ← NEW, flat (touches layout.tsx — keep visible)
    sections/
      GalleryContent.tsx    ← NEW (from GALLERY_FEATURE_INSTRUCTIONS.md)
      GalleryPreview.tsx    ← NEW (homepage teaser, new)
      EquipmentRoster.tsx   ← NEW
    ui/
      motion-wrapper.tsx    ← NEW (from GALLERY_FEATURE_INSTRUCTIONS.md)
  lib/
    gallery-data.ts         ← NEW
    equipment-data.ts       ← NEW
```

**Why SeasonalBar stays flat:** It is imported directly by `layout.tsx`, the same level as Header and Footer. Putting it in `/sections/` when the other layout-level components are flat creates inconsistency without benefit.

**Why GalleryContent goes in `/sections/`:** The GALLERY_FEATURE_INSTRUCTIONS.md (an existing planning artifact in this project) already specifies this path. Consistency with that document is important.

### SeasonalBar

A thin, dismissible banner that sits above the sticky header. Announce seasonal promotions ("Now Booking Spring Excavation") or urgent messages ("24/7 Emergency Snow Removal Available").

**Integration:** In `layout.tsx`, it renders as the first child of `<body>`, before `<Header>`. The Header's `fixed top-0` positioning will sit below the SeasonalBar only if the bar is not fixed — make it a `relative` (in-flow) element so everything below shifts down. Alternatively, give the bar a fixed position too (e.g., `top-0`) and offset the Header with a top padding or `top-[44px]` — but this complicates the scroll detection in Header.

**Recommended approach:** Render SeasonalBar as a normal in-flow `div` before `<Header>`. The Header's `fixed top-0` means it overlaps the SeasonalBar when scrolled, but that's correct behavior — the bar shows at page top, disappears behind the sticky header on scroll, and the bar can be dismissed. If it must always show above the header, set the bar as `sticky top-0 z-[60]` (above Header's z-50) and set Header to `top-[44px]` instead of `top-0`. The dismissible-and-disappears-on-scroll behavior is simpler and expected for seasonal bars.

**Props:**

```tsx
interface SeasonalBarProps {
  message: string;       // e.g., "Now Booking Spring Excavation — Call for a Free Site Assessment"
  ctaLabel?: string;     // e.g., "Get a Quote"
  ctaHref?: string;      // e.g., "/contact"
  dismissible?: boolean; // default true
}
```

SeasonalBar uses `useState` for dismiss — no persistence needed (reappears on page refresh, which is fine for a seasonal message). If persistence is needed later, localStorage is a v3 enhancement.

**Component is a Client Component** (`"use client"`) because of the dismiss button state.

### EquipmentRoster

A section component that renders a grid of equipment cards, each showing the machine name, type, key specs, and a placeholder (or real) photo. Located at `src/components/sections/EquipmentRoster.tsx`.

This is a Server Component (no interactivity needed). It imports from `src/lib/equipment-data.ts` and renders inline.

**Where it lives on the site:** As a section on the homepage (between ServicesPreview and the CTASection) and/or on the About page. It is not a full page, just a section component.

### GalleryContent

Follows the structure in `GALLERY_FEATURE_INSTRUCTIONS.md` exactly, with these adaptations:
- Categories: `["All", "Excavation", "Snow Removal", "Site Prep"]`
- lucide-react icons for categories: `Shovel` (Excavation), `Snowflake` (Snow Removal), `Mountain` or `Layers` (Site Prep) — verify icon names at lucide.dev before using
- Colors: navy-* and accent-* token names should be mapped to brand-* and accent-* per tailwind.config.ts — do NOT add the `@theme` block from the instructions (that is Tailwind v4 syntax). Instead, extend tailwind.config.ts colors with matching names

**Critical note on the instructions file:** `GALLERY_FEATURE_INSTRUCTIONS.md` says "Tailwind CSS v4" in its Prerequisites section. This project is Tailwind CSS v3. The `@theme { }` block syntax in those instructions WILL NOT WORK here. Use `tailwind.config.ts extend.colors` instead.

### GalleryPreview

A homepage teaser section showing 3-4 featured projects from `GALLERY_ITEMS`, linking to `/gallery`. This is a Server Component (no state — just renders the top N items as static cards). Located at `src/components/sections/GalleryPreview.tsx`.

---

## Data Models

### Gallery Data (`src/lib/gallery-data.ts`)

```typescript
export const GALLERY_CATEGORIES = [
  "All",
  "Excavation",
  "Snow Removal",
  "Site Prep",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
export type FilterCategory = Exclude<GalleryCategory, "All">;

export interface GalleryItem {
  id: number;
  title: string;
  category: FilterCategory;
  description: string;        // 1-2 sentences — shown in lightbox
  location?: string;          // e.g., "Drumheller, AB" — optional
  imageSrc?: string;          // e.g., "/images/gallery/excavation-01.jpg"
                              // undefined = use placeholder color card
  color: string;              // hex — placeholder background when imageSrc absent
  featured?: boolean;         // true → included in GalleryPreview on homepage
}
```

Placeholder items (before real photos are provided):
```typescript
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Commercial Parking Lot Excavation", category: "Excavation",
    description: "Full site excavation for commercial parking expansion.", color: "#2d4f64", featured: true },
  { id: 2, title: "Residential Foundation Dig", category: "Excavation",
    description: "Precision excavation for new residential foundation.", color: "#1a2c38" },
  { id: 3, title: "Commercial Snow Removal - Industrial Park", category: "Snow Removal",
    description: "24-hour snow removal contract, 8-acre industrial site.", color: "#2d4f64", featured: true },
  { id: 4, title: "Emergency Storm Response", category: "Snow Removal",
    description: "Rapid deployment for post-blizzard clearance.", color: "#1a2c38" },
  { id: 5, title: "Pipeline Right-of-Way Clearing", category: "Site Prep",
    description: "Vegetation clearing and grading for pipeline access.", color: "#2d4f64", featured: true },
  { id: 6, title: "Land Leveling - Agricultural", category: "Site Prep",
    description: "Grade leveling for new agricultural facility.", color: "#1a2c38" },
];
```

When adding the `imageSrc` field for real photos: place photos in `public/images/gallery/` and reference as `/images/gallery/filename.jpg`. Use `next/image` in the card component for automatic optimization.

### Equipment Roster Data (`src/lib/equipment-data.ts`)

```typescript
export interface EquipmentSpec {
  label: string;   // e.g., "Operating Weight"
  value: string;   // e.g., "24,000 lbs"
}

export interface EquipmentItem {
  id: number;
  name: string;           // e.g., "CAT 320 Excavator"
  type: "Excavator" | "Snow Removal" | "Skid Steer" | "Dozer" | "Grader" | "Other";
  tagline: string;        // 1 sentence — show on card, e.g., "Our workhorse for site clearing and foundation work"
  specs?: EquipmentSpec[]; // up to 3 specs for display on card
  imageSrc?: string;      // e.g., "/images/equipment/cat-320.jpg"
  color: string;          // placeholder background hex
}

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: 1,
    name: "CAT 320 Excavator",
    type: "Excavator",
    tagline: "Our primary excavator for foundation digs, trenching, and site clearing.",
    specs: [
      { label: "Operating Weight", value: "24,000 lbs" },
      { label: "Dig Depth", value: "22 ft" },
    ],
    color: "#2d4f64",
  },
  // Add more equipment as client provides info
];
```

**Design note:** The `type` field drives icon selection in `EquipmentRoster.tsx` the same way `category` drives icons in `GalleryContent.tsx`. Keep the union type as a narrow literal union so TypeScript catches invalid types at compile time.

---

## Logo Integration

### Current State

The two logo files are in the **project root**, not inside the Next.js application:

```
d:/VS Projects/Big Country Landscaping & Maintenance Ltd/
  Excavator and Snow Plow in Motion Logo.png   ← here
  Excavator and Snow Plow in Motion Logo.svg   ← here
  abc-roofing/                                  ← Next.js app here
```

The Next.js app's public directory for static assets must be at `abc-roofing/public/`. This directory does not yet exist.

### Migration Steps

1. Create `abc-roofing/public/` directory
2. Create `abc-roofing/public/images/` for future project/equipment photos
3. Copy both logo files into `abc-roofing/public/`:
   - Destination: `abc-roofing/public/logo.svg`
   - Destination: `abc-roofing/public/logo.png`
   - Use simple filenames without spaces — Next.js serves from `/` so the URL will be `/logo.svg`

4. **Do not move the originals from the project root** — they're source assets. Copy, don't move.

### Usage in Header.tsx

Replace the current inline SVG house icon with `next/image`:

```tsx
import Image from "next/image";

// In the Logo link, replace the <div> with inline SVG house with:
<Image
  src="/logo.svg"
  alt="Big Country Landscaping & Maintenance Ltd"
  width={160}
  height={48}
  priority           // above the fold — always preload
  className="h-10 md:h-12 w-auto"  // height-constrained, aspect ratio preserved
/>
```

**Use SVG in Header, not PNG.** SVG scales perfectly at all DPR values without blur and has no file size impact. PNG is a fallback for contexts that don't support SVG (email, OG image — not needed in the header).

**Remove the conditional color-flip** on the logo container (`bg-[#FCB215]` when transparent, `bg-[#094026]` when scrolled). The actual logo has its own colors — it doesn't need a colored background square behind it. Use a transparent logo mount.

**Logo text removal:** The current Header has two text spans below the icon ("COMPANY NAME" and "Professional Contractors"). These can remain as HTML text fallbacks or be removed if the logo itself contains the company name as part of the SVG. The SVG is 624KB — it almost certainly contains integrated text. Inspect the rendered SVG before deciding whether to keep the HTML text spans.

### Usage in Footer.tsx

Same swap — replace the inline SVG house icon with the `next/image` logo. Footer logo can be the same `/logo.svg` at a slightly smaller size or horizontal orientation if the logo has one.

---

## Layout Changes

### Current layout.tsx Structure

```tsx
<html lang="en">
  <head>
    <link rel="canonical" href="https://yourcompany.com" />
  </head>
  <body className="antialiased">
    <Header />
    <main>{children}</main>
    <Footer />
    <MobileStickyCTA />
  </body>
</html>
```

### Target layout.tsx Structure

```tsx
<html lang="en">
  <head>
    <link rel="canonical" href="https://bigcountrylandscaping.ca" />
  </head>
  <body className="antialiased">
    <SeasonalBar
      message="Now Booking Spring Excavation — Call for a Free Site Assessment"
      ctaLabel="Get a Quote"
      ctaHref="/contact"
    />
    <Header />
    <main>{children}</main>
    <Footer />
    <MobileStickyCTA />
  </body>
</html>
```

### Changes Required in layout.tsx

| Field | From | To |
|-------|------|----|
| `canonical` href | `https://yourcompany.com` | `https://bigcountrylandscaping.ca` |
| `metadata.metadataBase` | `https://yourcompany.com` | `https://bigcountrylandscaping.ca` |
| `metadata.title.default` | `"Company Name | Professional..."` | `"Big Country Landscaping & Maintenance Ltd | Excavation & Snow Removal"` |
| `metadata.title.template` | `"%s | Company Name"` | `"%s | Big Country Landscaping"` |
| `metadata.description` | generic contractor | excavation + snow removal focused |
| `metadata.keywords` | generic | excavation, snow removal, Alberta, site prep, etc. |
| `metadata.authors` | Company Name | Big Country Landscaping & Maintenance Ltd |
| `metadata.creator` | Company Name | Big Country Landscaping & Maintenance Ltd |
| `metadata.publisher` | Company Name | Big Country Landscaping & Maintenance Ltd |
| `metadata.openGraph.siteName` | Company Name | Big Country Landscaping & Maintenance Ltd |
| `viewport.themeColor` | `"#094026"` | `"#1a2c38"` |
| Add: `<SeasonalBar>` | not present | before `<Header />` |

### Consideration: SeasonalBar and Header Scroll Offset

The Header uses `window.scrollY > 20` to detect scroll state. With a SeasonalBar above it in the DOM flow, the Header is **not** at the top of the page — it starts below the SeasonalBar. The `fixed top-0` on the Header will still put the Header at the browser viewport's top edge (covering the SeasonalBar on scroll), which is the correct behavior.

The issue is on **initial page load** (not scrolled): the Header renders at `top-0 fixed` and visually overlaps the SeasonalBar. To fix this, make the `<body>` have a top padding equal to the SeasonalBar height (approximately 44px), or target the overlap behavior:

- **Simple approach:** Set `body { padding-top: 44px }` (or use a Tailwind class on the `<body>` tag) only when SeasonalBar is rendered and not dismissed. This requires SeasonalBar to communicate its visibility state upward — complex for a v2.0 deliverable.
- **Pragmatic approach:** Accept that on initial load, the SeasonalBar sits above the transparent Header. The Header becomes opaque (white) after 20px scroll, at which point it covers the SeasonalBar naturally. This is the same behavior used by many marketing sites. Use this for v2.0.
- **If always-visible bar is required:** Use `position: sticky; top: 0; z-index: 60` on the bar and `top: [44px]` on the Header (requires changing Header's `fixed top-0` to `fixed top-[44px]`). Only do this if a persistent bar is a hard requirement.

---

## Summary

- **Color migration is a find-and-replace, not a refactor.** The existing components hardcode hex values in JSX classnames — change those 5 source hex values to the 5 new hex values across all component files. No architectural change required.

- **The logo primary color is `#2d4f64`** (confirmed by SVG inspection). The new dark industrial palette builds from this: `#0f1c24` (darkest) → `#1a2c38` (dark) → `#2d4f64` (brand-steel) with an amber accent around `#F5A623`.

- **Tailwind config and globals.css are currently inconsistent** — config declares `fontFamily.sans: 'Plus Jakarta Sans'` while the site renders in Montserrat (set via globals.css import). Fix both in Step 1 of the build order.

- **Gallery instructions file exists and is ~95% usable,** but contains Tailwind v4 `@theme {}` syntax that will not work here. Use `tailwind.config.ts extend.colors` for the color tokens it defines instead.

- **Logo files need to be copied** (not moved) from the project root to `abc-roofing/public/` before they can be served by Next.js. Use `next/image` with the SVG for crisp rendering at all sizes.

- **SeasonalBar belongs in layout.tsx** above `<Header>`, rendered as an in-flow element. The simplest integration accepts that the transparent Header overlaps it on initial page load — correct and expected behavior.

- **Component directory structure splits at v2.0:** existing components stay flat in `/src/components/`, new section components go in `/src/components/sections/`, new utility components go in `/src/components/ui/`. No existing files move.
