# Gallery Feature - Copy/Paste Instructions for Claude

## What This Is

A fully-featured gallery page for a Next.js (App Router) site with:
- **Responsive grid** (1 col mobile, 2 col tablet, 3 col desktop)
- **Category filter buttons** that animate items in/out
- **Lightbox modal** with keyboard navigation (ESC to close, arrow keys to navigate)
- **Framer Motion animations** (fade, scale, layout transitions)
- **Full accessibility** (ARIA labels, focus management, keyboard support)
- **Placeholder card design** (colored backgrounds with icons instead of images — swap for real images later)

---

## Prerequisites

This is a **Next.js App Router** project using **Tailwind CSS v4** and **TypeScript**.

### 1. Install Dependencies

```bash
npm install framer-motion lucide-react
```

### 2. Add Custom Colors to Your CSS

In your `globals.css` (or wherever your Tailwind theme is), add these custom color tokens inside a `@theme` block. If you already have a `@theme` block, merge these in. **If you're using Tailwind v3, use `tailwind.config.js` `extend.colors` instead.**

```css
@theme {
  --color-navy-50: #e8edf5;
  --color-navy-100: #c5d0e6;
  --color-navy-200: #9eb2d4;
  --color-navy-300: #7793c2;
  --color-navy-400: #597cb5;
  --color-navy-500: #3b65a8;
  --color-navy-600: #345a96;
  --color-navy-700: #2b4a7e;
  --color-navy-800: #1e3a5f;
  --color-navy-900: #182240;
  --color-navy-950: #0d1528;

  --color-accent-50: #fef9e7;
  --color-accent-100: #fcefc4;
  --color-accent-200: #f9e29d;
  --color-accent-300: #f5d576;
  --color-accent-400: #f2ca52;
  --color-accent-500: #efbf2e;
  --color-accent-600: #d4a827;
  --color-accent-700: #b08b20;
  --color-accent-800: #8c6e19;
  --color-accent-900: #685212;

  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-300: #cbd5e1;
  --color-slate-400: #94a3b8;
  --color-slate-500: #64748b;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1e293b;
  --color-slate-900: #0f172a;
}
```

You can change these colors to match your site's branding. The gallery uses `navy-*` for dark backgrounds, `accent-*` for highlight/gold colors, and `slate-*` for neutral text/borders.

### 3. Utility CSS Classes Used

The gallery uses two utility classes. Add these to your `globals.css` inside `@layer utilities` or `@layer components`:

```css
@layer components {
  .container-custom {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 sm:py-20 lg:py-24;
  }
}
```

---

## Files to Create

### File 1: `src/lib/gallery-data.ts` — Gallery Data

```ts
export const GALLERY_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Kitchen",
  "Bathroom",
  "Exterior",
] as const;

export const GALLERY_ITEMS = [
  { id: 1, title: "Modern Kitchen Remodel", category: "Kitchen", color: "#1e3a5f" },
  { id: 2, title: "Commercial Office Build-Out", category: "Commercial", color: "#2d4a6f" },
  { id: 3, title: "Luxury Bathroom Renovation", category: "Bathroom", color: "#1a3352" },
  { id: 4, title: "Custom Home Exterior", category: "Exterior", color: "#234567" },
  { id: 5, title: "Open Concept Living Room", category: "Residential", color: "#1e3a5f" },
  { id: 6, title: "Restaurant Interior", category: "Commercial", color: "#2d4a6f" },
  { id: 7, title: "Farmhouse Kitchen", category: "Kitchen", color: "#1a3352" },
  { id: 8, title: "Spa Bathroom Suite", category: "Bathroom", color: "#234567" },
  { id: 9, title: "Colonial Home Renovation", category: "Residential", color: "#1e3a5f" },
  { id: 10, title: "Retail Store Fit-Out", category: "Commercial", color: "#2d4a6f" },
  { id: 11, title: "Outdoor Living Space", category: "Exterior", color: "#1a3352" },
  { id: 12, title: "Contemporary Kitchen Design", category: "Kitchen", color: "#234567" },
] as const;
```

**Customize this:** Change the categories, titles, and colors to fit your site's content. The `color` field is a hex code used as a placeholder background — when you add real images later, these become fallbacks.

---

### File 2: `src/components/ui/motion-wrapper.tsx` — Animation Wrapper

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
}: FadeInProps) {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

If you already have a `motion-wrapper.tsx` or similar animation utility, you can skip this and import `FadeIn` from wherever you already have it. The gallery only needs the `FadeIn` component from this file.

---

### File 3: `src/components/sections/GalleryContent.tsx` — Main Gallery Component

This is the core component. It contains the filter bar, the responsive grid, and the lightbox modal all in one.

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  CookingPot,
  Bath,
  Trees,
  Hammer,
} from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "@/lib/gallery-data";
import { FadeIn } from "@/components/ui/motion-wrapper";

const categoryIcons: Record<string, React.ElementType> = {
  Residential: Home,
  Commercial: Building2,
  Kitchen: CookingPot,
  Bathroom: Bath,
  Exterior: Trees,
};

export function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<(typeof GALLERY_ITEMS)[number] | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const handlePrev = useCallback(() => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = currentIndex <= 0 ? filteredItems.length - 1 : currentIndex - 1;
    const prevItem = filteredItems[prevIndex];
    if (prevItem) setSelectedItem(prevItem);
  }, [selectedItem, filteredItems]);

  const handleNext = useCallback(() => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = currentIndex >= filteredItems.length - 1 ? 0 : currentIndex + 1;
    const nextItem = filteredItems[nextIndex];
    if (nextItem) setSelectedItem(nextItem);
  }, [selectedItem, filteredItems]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrev, handleNext]
  );

  const currentIndex = selectedItem
    ? filteredItems.findIndex((item) => item.id === selectedItem.id)
    : -1;

  return (
    <>
      {/* Filter + Grid Section */}
      <section className="section-padding bg-slate-50" aria-labelledby="gallery-heading">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
              {GALLERY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-navy-900 text-white shadow-lg shadow-navy-900/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-navy-300 hover:text-navy-800"
                  }`}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const Icon = categoryIcons[item.category] || Hammer;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 cursor-pointer"
                      aria-label={`View ${item.title} in lightbox`}
                    >
                      {/* Colored background with gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {/* Subtle texture pattern */}
                        <div
                          className="absolute inset-0 opacity-[0.06]"
                          style={{
                            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                                              linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                                              linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                                              linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)`,
                            backgroundSize: "20px 20px",
                            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
                          }}
                        />
                        {/* Radial gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                      </div>

                      {/* Center icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                          <Icon className="h-10 w-10 text-white/70 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white/90 text-xs font-medium tracking-wide">
                          {item.category}
                        </span>
                      </div>

                      {/* Bottom overlay with title */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-12 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view details
                        </p>
                      </div>

                      {/* Hover ring effect */}
                      <div className="absolute inset-0 rounded-2xl ring-0 ring-accent-400/0 group-hover:ring-2 group-hover:ring-accent-400/50 transition-all duration-300" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Hammer className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${selectedItem.title}`}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            ref={(el) => el?.focus()}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-navy-950/95 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-4xl mx-4"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                aria-label="Close lightbox"
              >
                Close
                <X className="h-5 w-5" />
              </button>

              {/* Image / Placeholder card */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: selectedItem.color }}
                >
                  {/* Texture */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                                        linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                                        linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                                        linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)`,
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
                </div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20">
                    {(() => {
                      const Icon = categoryIcons[selectedItem.category] || Hammer;
                      return <Icon className="h-14 w-14 text-white/70" />;
                    })()}
                  </div>
                </div>

                {/* Title overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 pt-16">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-400/90 text-navy-900 text-xs font-bold tracking-wide uppercase mb-3">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-white font-bold text-2xl sm:text-3xl">
                    {selectedItem.title}
                  </h3>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Previous
                </button>

                <span className="text-white/50 text-sm" aria-live="polite" aria-atomic="true">
                  {currentIndex + 1} of {filteredItems.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium group"
                  aria-label="Next project"
                >
                  Next
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

### File 4: `src/app/gallery/page.tsx` — The Gallery Page

```tsx
import type { Metadata } from "next";
import { GalleryContent } from "@/components/sections/GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our portfolio of completed projects.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Optional: Add your own page hero/header component here */}
      <GalleryContent />
      {/* Optional: Add a CTA section below the gallery */}
    </>
  );
}
```

---

## Summary of Files to Create

| # | Path | Purpose |
|---|------|---------|
| 1 | `src/lib/gallery-data.ts` | Category list + gallery item data |
| 2 | `src/components/ui/motion-wrapper.tsx` | `FadeIn` animation wrapper (skip if you already have one) |
| 3 | `src/components/sections/GalleryContent.tsx` | The full gallery: filters + grid + lightbox |
| 4 | `src/app/gallery/page.tsx` | Next.js page route at `/gallery` |

---

## Quick Customization Guide

**To change categories:** Edit `GALLERY_CATEGORIES` in `gallery-data.ts` and update the `categoryIcons` map in `GalleryContent.tsx` to match. Icons come from `lucide-react` — browse all icons at https://lucide.dev/icons.

**To change colors:** Replace the `navy-*`, `accent-*`, and `slate-*` values in your `@theme` CSS block. The gallery will automatically pick up the new palette.

**To add real images:** Add an `image` field to each gallery item in the data, then replace the colored `<div>` backgrounds with `<Image>` from `next/image` in the grid cards and lightbox.

**To change grid columns:** Edit the grid classes in `GalleryContent.tsx`. Currently `grid sm:grid-cols-2 lg:grid-cols-3 gap-6`. Change to `lg:grid-cols-4` for 4 columns, etc.

---

## What to Tell Claude in Your Other Project

Copy this entire file and paste it to Claude in your other terminal. Then say:

> "Here are instructions for a gallery feature I want to add to this project. Please follow the instructions to create all 4 files, add the required CSS theme colors and utility classes to my globals.css, and install the npm dependencies (framer-motion and lucide-react). Adapt the categories, titles, and colors to fit this project's content/branding."

Claude will then have all the context needed to implement it correctly.
