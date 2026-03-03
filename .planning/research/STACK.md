# Stack Research: Big Country Landscaping

**Researched:** 2026-03-03
**Mode:** Ecosystem (Stack dimension)
**Confidence:** HIGH — all versions verified against npm registry current at time of research

---

## Recommended Additions

| Package | Version | Purpose | Rationale |
|---------|---------|---------|-----------|
| `framer-motion` | `^12.34.5` | Gallery filter animations, lightbox transitions, card hover | Only library with `AnimatePresence` + `layout` for smooth grid reflow on filter. Same package as `motion` at v12 — use `framer-motion` name for ecosystem familiarity. |
| `lucide-react` | `^0.576.0` | UI icons throughout site (filters, nav, services, CTA) | Tree-shakeable per-icon imports, React 18 compatible, has construction-relevant icons: `Shovel`, `Truck`, `Wrench`, `Phone`, `ChevronRight`, `X`, `Menu`. |
| `yet-another-react-lightbox` | `^3.29.1` | Full-screen image lightbox with keyboard nav | Modern, actively maintained, plugin-based (thumbnails, zoom, captions each as opt-in plugins), idiomatic with `next/image` via custom render slot. Peer deps: react ^16.8+, no external CSS framework needed. |
| `sharp` | `^0.34.5` | Next.js image optimization engine | Required by Next.js for on-demand image resizing and WebP/AVIF conversion in production. Install as direct dependency, not devDependency — Next.js will use it automatically. |

No other new dependencies are required. Everything else is achievable with existing Next.js 14 + Tailwind CSS v3 primitives.

---

## Image Handling

**Library:** `next/image` (built-in to Next.js 14, no install needed) + `sharp` for processing.

**Strategy:**

All photos use `<Image>` from `next/image` with these settings:

```tsx
<Image
  src="/gallery/excavation-01.jpg"   // static, served from /public
  alt="Excavator grading a lot"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={BLUR_DATA_URL}         // see below
  className="object-cover w-full h-full"
/>
```

**Placeholder approach — inline base64 blur hash:**

For static images stored in `/public`, generate a tiny 10×10 JPEG base64 string at build time and hardcode it in the data file next to each image entry. This avoids a runtime `plaiceholder` dependency entirely. One approach is to run a small Node script during development (`scripts/gen-blur.mjs`) that reads each image, resizes to 10px wide with `sharp`, and outputs the base64 string. The resulting strings live in `src/data/gallery.ts` alongside the image metadata.

```ts
// src/data/gallery.ts
export const galleryImages = [
  {
    src: "/gallery/excavation-01.jpg",
    alt: "Excavator clearing a commercial lot",
    category: "excavation",
    width: 1200,
    height: 800,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQ...", // tiny blur
  },
]
```

**Why not remote images:** All photos are static assets in `/public/gallery/`. No `remotePatterns` config required. `next.config.mjs` stays minimal.

**Why not `placeholder="empty"`:** Real photos without a placeholder create visible layout shift and blank loading state on mobile — unacceptable for the "first impression" conversion goal.

**Performance rules for photo-heavy pages:**
- Gallery page: `loading="lazy"` on all cards below fold, `loading="eager"` + `priority` on first 3 visible cards
- Hero: always `priority` — never lazy-load the hero image
- Equipment roster: `loading="lazy"` unless above fold on mobile
- Lightbox: load full-res only when the lightbox opens (yarl handles this automatically)

---

## Gallery & Lightbox

**Recommendation: `yet-another-react-lightbox` (yarl) v3.29.1**

**Why yarl over alternatives:**

| Library | Status | Reason to avoid |
|---------|--------|-----------------|
| `react-image-lightbox` | Abandoned (2022) | Deprecated, uses legacy lifecycle APIs, no React 18 support |
| `react-photo-album` + custom lightbox | Overkill | react-photo-album is a grid layout tool, not needed; Tailwind grid is sufficient |
| `photoswipe` (vanilla) | Active | Not React-idiomatic, requires ref manipulation, more setup for no benefit |
| `simplelightbox` | Active | Not React-native, jQuery heritage |

**yarl plugin selection for this project:**

```bash
# Core only for Phase 1 (filter grid, no lightbox yet)
# Core + plugins for Phase 2 (lightbox implementation)
npm install yet-another-react-lightbox
```

Plugins to enable in phase 2:
- `Zoom` plugin — pinch-to-zoom on mobile, scroll on desktop
- `Captions` plugin — show alt text / project name below photo
- `Thumbnails` plugin — optional strip at bottom for multi-photo projects

Plugins to skip:
- `Slideshow` — contractor site doesn't need auto-advance
- `Download` — no value for lead-gen site
- `Counter` — clutter on mobile; handled by Captions if needed

**Integration with next/image:**

yarl accepts a custom `render.slide` prop. Pass `<Image>` from `next/image` to get automatic format negotiation and CDN-compatible URLs without losing optimization:

```tsx
<Lightbox
  slides={slides}
  render={{
    slide: ({ slide }) => (
      <Image
        src={slide.src}
        alt={slide.alt ?? ""}
        fill
        className="object-contain"
        sizes="100vw"
      />
    ),
  }}
/>
```

**Gallery grid (no library needed):**

The filterable grid itself is pure Tailwind + Framer Motion. No `react-photo-album`, no masonry library. Use a uniform aspect-ratio card grid:

```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
```

Each card: fixed `aspect-video` (16:9) for construction photos. Consistent crop looks professional and loads predictably on mobile.

---

## Animation

**Library: `framer-motion` v12.34.5**

**Install:**

```bash
npm install framer-motion
```

Note: `framer-motion` and `motion` are the same package at v12 — different entry point names, identical source. Use `framer-motion` import path for maximum ecosystem documentation coverage.

**Use `"use client"` on all animated components** — framer-motion is client-only. Keep animated wrappers thin; server-render the data/markup inside them.

**Specific use cases in this project:**

| Use Case | Framer Motion Feature | Notes |
|----------|----------------------|-------|
| Gallery filter transitions | `AnimatePresence` + `layout` prop on cards | Smoothly reflows grid when category changes; key each card by image ID |
| Gallery card entrance | `initial/animate` variants with stagger | Fade-up on mount, staggerChildren 0.05s |
| Lightbox open/close | `AnimatePresence` + `motion.div` overlay | Scale + opacity transition; yarl has built-in transitions so this may not be needed |
| Seasonal bar dismiss | `AnimatePresence` + `motion.div` slideDown | Animate height to 0 on close |
| Hero text entrance | CSS keyframes already in tailwind.config.ts | Use existing `animate-fade-in` / `animate-slide-up` — no framer-motion needed |

**What NOT to use framer-motion for:**
- Simple hover states — Tailwind `hover:` utilities cover these
- Page transitions — not needed for a static lead-gen site
- Counter animations / scroll-triggered numbers — out of scope for v2.0

**`prefers-reduced-motion` compliance:**

Use the `useReducedMotion()` hook from framer-motion to disable animations for users who have that OS setting enabled. Apply in every animated component:

```tsx
const shouldReduceMotion = useReducedMotion()
const variants = shouldReduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } }
```

**Bundle size note:** framer-motion v12 is approximately 45KB gzipped for the full import. For this project size and use case, this is acceptable. To reduce bundle impact, import only what is used:

```ts
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
// NOT: import * as framer from "framer-motion"
```

---

## Icons

**Library: `lucide-react` v0.576.0**

**Why lucide-react over alternatives:**

| Library | Size | Why not |
|---------|------|---------|
| `react-icons` | Large (bundles entire icon sets unless carefully tree-shaken) | Easy to accidentally import full sets; inconsistent icon style across icon families |
| `@heroicons/react` | Lightweight | Smaller icon set, fewer construction/industrial options |
| `@phosphor-icons/react` | Medium | More icons but less community documentation, slower updates |
| Custom SVGs inline | Zero deps | Feasible for 3–5 icons, not for 20+ used across nav/filters/services/forms |

**Lucide advantages for this project:**
- Each icon is a named export — dead code elimination works perfectly with Next.js bundler
- Has the specific icons needed: `Phone`, `Mail`, `MapPin`, `Menu`, `X`, `ChevronRight`, `ChevronLeft`, `Shovel` (or use `Construction`), `Truck`, `Snowflake`, `Sun`, `Filter`, `Expand`, `ArrowLeft`, `ArrowRight`
- Consistent 24px stroke style looks sharp at all sizes

**Install:**

```bash
npm install lucide-react
```

**Import pattern (always named, never default):**

```tsx
import { Phone, Truck, Snowflake } from "lucide-react"
```

---

## Seasonal Bar

**Implementation: Client component + localStorage (no library needed)**

The seasonal announcement bar (e.g., "Now booking spring excavation — call today") requires:
1. Display message configured in a static data/config file
2. Dismissable by the user with an X button
3. Dismissed state persists across page refreshes

**Approach:**

```tsx
// src/components/AnnouncementBar.tsx
"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

const STORAGE_KEY = "bcl-announcement-dismissed-v1"
// Bump version string in key to force re-display after message changes

export function AnnouncementBar({ message }: { message: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-500 text-black text-sm font-semibold"
        >
          <div className="container-custom flex justify-between items-center py-2">
            <span>{message}</span>
            <button onClick={dismiss} aria-label="Dismiss announcement">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Message configuration:** Store the message string in `src/data/siteConfig.ts` alongside other static strings (phone, email, address). Updating the seasonal message is a one-line edit with no component changes.

**Version key strategy:** When the seasonal message content changes, bump the version suffix in `STORAGE_KEY` (e.g., `v1` → `v2`). This forces the bar to reappear even for users who dismissed the previous message — critical for seasonal transitions (spring → summer → winter).

**Why not cookies:** localStorage is simpler for a static site with no SSR personalization. Cookies add complexity and require consent banners in some jurisdictions. The bar is purely cosmetic — localStorage is appropriate.

**Why not a CMS toggle:** v2.0 is static. The message is changed by editing `siteConfig.ts` and redeploying. This is acceptable for a contractor site with 2–4 seasonal message changes per year.

---

## What NOT to Use

| Library | Why Not |
|---------|---------|
| `react-image-lightbox` | Abandoned in 2022, uses deprecated React lifecycle methods, breaks on React 18 strict mode. Do not use regardless of tutorial age. |
| `react-slick` / `slick-carousel` | jQuery dependency, poor mobile touch, heavy CSS override burden. Use Tailwind CSS scroll-snap for any carousel needs. |
| `react-spring` | Overlap with framer-motion; no benefit to having both. framer-motion covers all animation needs here. |
| `@emotion/react` or `styled-components` | CSS-in-JS has no place in a Tailwind-first codebase. Conflicts with Tailwind class specificity at runtime. |
| `react-masonry-css` | Masonry grid adds visual complexity without benefit for construction photos. Uniform aspect-ratio grid is cleaner and more predictable on mobile. |
| `next-pwa` / service workers | Over-engineering for a static lead-gen site. No offline use case. |
| `react-query` / `swr` | No async data fetching. All content is static TypeScript data files. |
| `Tailwind CSS v4` | Project constraint explicitly requires v3. v4 has a completely different configuration API (CSS-first config, no tailwind.config.ts). Do not upgrade. |
| `framer-motion` v10 or earlier | v10 had different AnimatePresence behavior. v12 is current; use it. If docs reference `motion/react` import path, that is the v12 sub-path export — valid but not needed for this project size. |
| `plaiceholder` at runtime | Unnecessary complexity. Generate blur hashes in a dev script, hardcode in data files. Avoids a build-time dependency. |

---

## Summary

- **No new UI framework.** Next.js 14 App Router + Tailwind CSS v3 stays as-is. All additions are leaf-node libraries.
- **Four packages to install:** `framer-motion` (animations), `lucide-react` (icons), `yet-another-react-lightbox` (lightbox), `sharp` (image processing). That's the entire v2.0 dependency surface.
- **next/image is the image solution.** Static photos live in `/public/gallery/`. Blur placeholders generated at dev time and hardcoded in `src/data/gallery.ts`. No CMS, no remote domains.
- **Seasonal bar needs no library.** It's a single client component using `useState`, `useEffect`, `localStorage`, and the already-justified `framer-motion` for its exit animation.
- **Avoid the abandoned lightbox trap.** `react-image-lightbox` appears in many tutorials but is unmaintained. `yet-another-react-lightbox` is the current standard for React 18 projects.

---

## Sources

| Source | Confidence | Used For |
|--------|------------|----------|
| `npm info yet-another-react-lightbox` (2026-03-03) | HIGH | Version 3.29.1, peer deps |
| `npm info framer-motion` (2026-03-03) | HIGH | Version 12.34.5, peer deps (React 18/19) |
| `npm info lucide-react` (2026-03-03) | HIGH | Version 0.576.0, peer deps |
| `npm info sharp` (2026-03-03) | HIGH | Version 0.34.5 |
| `npm info motion` (2026-03-03) | HIGH | Confirms motion = framer-motion at v12 |
| `.planning/PROJECT.md` (project context) | HIGH | Feature requirements, constraints |
| `abc-roofing/package.json` (project state) | HIGH | Existing deps: Next.js 14.2.35, React 18, Tailwind 3.4.1 |
| `abc-roofing/tailwind.config.ts` (project state) | HIGH | Existing animation keyframes already in config |
| Training data: react-image-lightbox abandonment | MEDIUM — treat as LOW, verify independently | Negative claim: library is abandoned |
