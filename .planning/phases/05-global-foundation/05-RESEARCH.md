# Phase 5: Global Foundation - Research

**Researched:** 2026-03-05
**Domain:** Next.js App Router metadata, CSS mobile foundations, fluid typography
**Confidence:** HIGH (all findings from direct file inspection of the actual codebase)

---

## Summary

Phase 5 establishes mobile-first CSS foundations in `layout.tsx` and `globals.css`. Research
involved reading every relevant file directly — no guesswork. The site already has significant
mobile plumbing in place; several requirements are fully or partially satisfied. The key gaps
are: body-level `touch-action: manipulation`, body `line-height` and explicit `font-size`,
`-webkit-tap-highlight-color: transparent` on `:root`, and converting five groups of step-based
Tailwind heading classes to `clamp()` values.

**Primary recommendation:** This phase is surgical CSS/metadata — two files only
(`layout.tsx`, `globals.css`). The heading work requires updating Tailwind utility strings in
several components, but those classes are isolated and predictable.

---

## Current State Audit

### layout.tsx (MFND-01, MFND-02)

```
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f1f2d",
  colorScheme: "dark",
};
```

**MFND-01 status — DONE.** Next.js `Viewport` export renders the correct meta tags.
`width=device-width`, `initialScale: 1`, `maximumScale: 5` all present. The `Viewport` type
from `next` handles serialization; no manual `<meta>` tag needed.

**MFND-02 status — DONE.** `themeColor: "#0f1f2d"` is set in the `Viewport` export, which
produces `<meta name="theme-color" content="#0f1f2d">`.

**Metadata configuration:** The project uses `export const metadata: Metadata` (static export)
and `export const viewport: Viewport` (separate viewport export — correct Next.js 14+ pattern).
No `generateMetadata` function is used. This is the right approach; `Viewport` was split from
`Metadata` in Next.js 14 to avoid hydration issues.

**body className:** Currently `className="antialiased"` only — no font-family class (font is
applied via CSS variable in globals.css body rule).

---

### globals.css — Full Audit

#### What EXISTS:

| Rule | Location | Status |
|------|----------|--------|
| `scroll-behavior: smooth` on `html` | Line 21 | DONE (MFND-04 partial) |
| `-webkit-overflow-scrolling: touch` on `html` | Line 22 | Exists (legacy, harmless) |
| `prefers-reduced-motion` overrides `scroll-behavior: auto` | Lines 25-34 | Exists |
| `body { background: #0f1f2d }` | Line 39 | DONE (D-401 decision) |
| `body { font-family: var(--font-montserrat) }` | Line 37 | Exists |
| `body { -webkit-font-smoothing: antialiased }` | Line 40 | Exists |
| `body { overflow-x: hidden }` | Line 43 | Exists |
| `body { -webkit-tap-highlight-color: rgba(245, 166, 35, 0.2) }` | Line 46 | PARTIAL — set to amber/20, not transparent |
| Input font-size 16px on mobile only | Lines 50-54 | PARTIAL — scoped to `@media (max-width: 768px)`, only on inputs |
| `@keyframes marquee` + `.animate-marquee` | Lines 75-83 | DONE (D-504) |
| `.btn-primary/.btn-secondary/.btn-outline` — `touch-manipulation` | Lines 88-101 | Exists via Tailwind `touch-manipulation` utility |

#### What IS MISSING:

| Requirement | Missing |
|-------------|---------|
| MFND-03 | `body { touch-action: manipulation }` — absent from body rule |
| MFND-04 (partial) | `-webkit-tap-highlight-color: transparent` on `:root` — body has amber/20, `:root` has nothing |
| MTYP-01 | `body { font-size: 16px }` or equivalent global — not set on body (only on inputs in media query) |
| MTYP-02 | `body { line-height: 1.5 }` — not set anywhere |
| MFND-05 | Mobile-first structure: globals.css currently uses ONE `max-width: 768px` media query (line 50) and ONE `min-width: 768px` (line 226). The pattern is mixed, not fully mobile-first. The `:root`, `html`, `body` blocks have NO media queries — they apply universally, which is acceptable for globals. |
| MPERF-01 | `touch-action: manipulation` on `a` elements — only on btn classes, not all `a` tags |

#### `-webkit-tap-highlight-color` clarification:

- `:root` — not set
- `body` — set to `rgba(245, 166, 35, 0.2)` (amber flash, not transparent)
- Requirement MFND-04 wants `transparent` on root
- The existing amber highlight on body is intentional brand styling; the requirement overrides this
- Planner must note: changing to `transparent` on `:root` removes the amber tap flash everywhere. This is the correct mobile behavior (no flash), but it's a design change from the current intent. The `btn-*` classes already use `touch-manipulation` which suppresses the delay; `transparent` removes the visual highlight color.

---

### Heading Inventory — Current vs Required

#### H1 Hero Headings

**Hero.tsx (homepage hero)**
- Current: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`
- Computed range: 30px → 72px (step-based, no fluid interpolation)
- Required clamp: `clamp(2rem, 8vw, 6rem)` (32px at 375px → scales to 96px max)
- Note: `2rem` at 375px = 32px, which exceeds the 30px current minimum. Good.
- Recommendation: `clamp(2rem, 8vw, 6rem)` — replaces all five step classes

**ExcavationPage.tsx h1**
- Current: `text-[clamp(3rem,8vw,5.5rem)]` (inline Tailwind arbitrary value)
- Status: ALREADY uses clamp — minimum 3rem (48px) at 375px. Meets MTYP-03.
- No change needed. Already correct pattern.

**SnowRemovalPage.tsx h1**
- Current: `text-[clamp(3rem,8vw,5.5rem)]` (same as Excavation)
- Status: ALREADY uses clamp — DONE.

**LandscapeConstruction.tsx h1**
- Current: `text-[clamp(3rem,8vw,5.5rem)]` (same pattern)
- Status: ALREADY uses clamp — DONE.

**contact/page.tsx, about/page.tsx, services/page.tsx, reviews/page.tsx h1**
- Current: `text-4xl md:text-5xl lg:text-6xl` (step-based, no fluid)
- Computed: 36px → 60px
- These are simple page-header h1s, not hero headings. They need clamp() per MTYP-03.
- Recommendation: `clamp(2.25rem, 6vw, 4rem)` (36px min, scales to 64px max)

#### H2 Section Headings

**Group A — Already use inline clamp() style (ExcavationPage, SnowRemovalPage, LandscapeConstruction)**

All service page components already use `style={{ fontSize: "clamp(…)" }}` pattern:
- Services section h2: `clamp(2.5rem, 5vw, 4rem)`
- Dark band h2: `clamp(2rem, 5vw, 4rem)`
- Portfolio h2: `clamp(2.5rem, 5vw, 3.5rem)`
- Why Choose Us h2: `clamp(2rem, 4.5vw, 3.5rem)`
- Process h2: `clamp(2rem, 4.5vw, 3.5rem)` / `clamp(2rem, 4.5vw, 3.5rem)`
- Split CTA h2: `clamp(2rem, 4vw, 3rem)`

Status: DONE for service pages — already fluid.

**Group B — Step-based Tailwind classes (homepage components)**

| Component | Current Classes | Min→Max | Recommended Clamp |
|-----------|----------------|---------|-------------------|
| `ServicePillars.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |
| `Services.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |
| `ServicesPreview.tsx` | `text-3xl md:text-4xl lg:text-5xl` | 30px→48px | `clamp(1.875rem, 4vw, 3rem)` |
| `About.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |
| `AboutPreview.tsx` | `text-3xl md:text-4xl lg:text-5xl` | 30px→48px | `clamp(1.875rem, 4vw, 3rem)` |
| `Contact.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |
| `CTABanner.tsx` | `text-4xl md:text-5xl` | 36px→48px | `clamp(2rem, 4vw, 3rem)` |
| `CTASection.tsx` | `text-3xl md:text-4xl lg:text-5xl` | 30px→48px | `clamp(1.875rem, 4vw, 3rem)` |
| `Testimonials.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |
| `TestimonialsPreview.tsx` | `text-3xl md:text-4xl lg:text-5xl` | 30px→48px | `clamp(1.875rem, 4vw, 3rem)` |
| `WhyBigCountry.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |
| `WhyChooseUs.tsx` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | 24px→48px | `clamp(1.5rem, 4vw, 3rem)` |

---

## Gap Analysis

### Requirement-by-Requirement Status

| Req | Description | Status | Action Needed |
|-----|-------------|--------|---------------|
| MFND-01 | Viewport meta `width=device-width, initial-scale=1.0, maximum-scale=5.0` | DONE | None |
| MFND-02 | `theme-color` meta `#0f1f2d` | DONE | None |
| MFND-03 | `touch-action: manipulation` on body | MISSING | Add to `body {}` in globals.css |
| MFND-04 | `scroll-behavior: smooth` + `-webkit-tap-highlight-color: transparent` on `:root` | PARTIAL | `scroll-behavior` on html (ok). Add `-webkit-tap-highlight-color: transparent` to `:root`. Update body value to transparent too. |
| MFND-05 | Mobile-first structure — base 0-479px, min-width scales up | PARTIAL | Audit comment only — global resets are universal (fine). The one max-width query (inputs) could be restructured, but it is functionally identical. Low-risk to leave as-is for this phase. |
| MTYP-01 | Body font-size minimum 16px site-wide | MISSING | Add `font-size: 16px` to `body {}` in globals.css |
| MTYP-02 | Body line-height minimum 1.5 | MISSING | Add `line-height: 1.5` to `body {}` in globals.css |
| MTYP-03 | Hero headings use `clamp()` fluid scaling | PARTIAL | Service page h1s already done. Homepage Hero.tsx and page-level h1s need conversion. |
| MTYP-04 | Section h2s use `clamp()` fluid scaling | PARTIAL | Service pages done. 12 homepage components need updating. |
| MTYP-05 | Headings maintain weight 800-900 and tight letter-spacing | DONE | All headings use `font-black` (900) and `tracking-tight`. No action. |
| MPERF-01 | `touch-action: manipulation` on all buttons and links | PARTIAL | btn-* classes have it. Need to add to `a {}` in globals.css (or all interactive elements). |

---

## Implementation Notes

### globals.css body block — all additions go here

Current body block (lines 36-47):
```css
body {
  font-family: var(--font-montserrat), system-ui, sans-serif;
  color: #ffffff;
  background: #0f1f2d;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  text-rendering: optimizeSpeed;
  -webkit-tap-highlight-color: rgba(245, 166, 35, 0.2);
}
```

Changes needed:
- Add `font-size: 16px;` (MTYP-01)
- Add `line-height: 1.5;` (MTYP-02)
- Add `touch-action: manipulation;` (MFND-03)
- Change `-webkit-tap-highlight-color` to `transparent` (MFND-04)

### :root block — addition

Current `:root` block (lines 5-17) sets CSS custom properties only. Add:
```css
-webkit-tap-highlight-color: transparent;
```

### scroll-behavior note

`scroll-behavior: smooth` is already on `html {}`, not `:root`. In CSS, `html` and `:root`
are effectively the same element (`:root` is the root element selector with higher specificity,
`html` is the type selector). The requirement says `:root` — safest approach is to add
`scroll-behavior: smooth` to `:root {}` as well (it will cascade fine). Alternatively, verify
that `html { scroll-behavior: smooth }` already satisfies the intent — it does, since html IS
the root element. Planner can choose to simply add to `:root` for explicitness.

### touch-action on links (MPERF-01)

The `btn-*` utility classes already include `touch-manipulation`. To cover all `a` and
`button` elements globally without touching every component:

```css
/* In globals.css, after body block */
a, button {
  touch-action: manipulation;
}
```

This is a safe global reset. Existing `touch-manipulation` Tailwind utility on specific
elements is redundant but harmless (same value).

### Hero.tsx clamp() conversion

Current: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`

These five classes must be replaced with a single Tailwind arbitrary value:
`text-[clamp(2rem,8vw,6rem)]`

The heading wraps two `<span className="block">` elements — each span must get the class, or
the parent `<h1>` gets it and spans inherit. Current structure has size on `h1` and spans
inherit — so the class goes on the `h1`.

### Page-level h1 conversion (contact, about, services, reviews)

Current: `text-4xl md:text-5xl lg:text-6xl`
Proposed: `text-[clamp(2.25rem,6vw,4rem)]`

These four files are in `src/app/*/page.tsx`.

### Tailwind arbitrary value syntax for clamp()

In Tailwind v3, arbitrary values use square brackets. For font-size with clamp:
```
text-[clamp(2rem,8vw,6rem)]
```

No spaces inside the brackets — Tailwind v3 does NOT support spaces in arbitrary values
without escaping. The clamp values used in service pages (`clamp(3rem,8vw,5.5rem)`) follow
this pattern correctly.

For inline style on components that already use `style={{ fontSize: "clamp(…)" }}` — no
change needed. Those components (ExcavationPage, SnowRemovalPage, LandscapeConstruction,
and their h2 headings) are already fully fluid.

### MFND-05 mobile-first structure

The globals.css currently has ONE max-width media query (input font-size at ≤768px, line 50)
and ONE min-width query (hide sticky CTA at ≥768px, line 226). The rest of globals.css uses
no breakpoints — it applies universally, which is correct for base resets.

**Practical interpretation:** The requirement is about ensuring base styles target mobile (small
screens) and scale up with min-width queries. Since the existing global resets ARE universal
(no mobile-specific max-width overrides for visual styles), this is functionally correct.

The one `max-width: 768px` input rule should ideally become the base (no query needed since
16px should be universal per MTYP-01). With `font-size: 16px` added to `body`, the input
query at line 50 becomes redundant and can be removed.

---

## Files to Modify

| File | Path | Changes |
|------|------|---------|
| `globals.css` | `BigCountryLandscaping/src/app/globals.css` | Add to body: font-size, line-height, touch-action, tap-highlight. Add to :root: tap-highlight. Add `a, button { touch-action: manipulation }`. Remove redundant input font-size query. |
| `layout.tsx` | `BigCountryLandscaping/src/app/layout.tsx` | No changes needed — viewport and theme-color already correct. |
| `Hero.tsx` | `BigCountryLandscaping/src/components/Hero.tsx` | h1: replace step-based responsive classes with `text-[clamp(2rem,8vw,6rem)]` |
| `contact/page.tsx` | `BigCountryLandscaping/src/app/contact/page.tsx` | h1: replace with `text-[clamp(2.25rem,6vw,4rem)]` |
| `about/page.tsx` | `BigCountryLandscaping/src/app/about/page.tsx` | h1: replace with `text-[clamp(2.25rem,6vw,4rem)]` |
| `services/page.tsx` | `BigCountryLandscaping/src/app/services/page.tsx` | h1: replace with `text-[clamp(2.25rem,6vw,4rem)]` |
| `reviews/page.tsx` | `BigCountryLandscaping/src/app/reviews/page.tsx` | h1: replace with `text-[clamp(2.25rem,6vw,4rem)]` |
| `ServicePillars.tsx` | `BigCountryLandscaping/src/components/ServicePillars.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |
| `Services.tsx` | `BigCountryLandscaping/src/components/Services.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |
| `ServicesPreview.tsx` | `BigCountryLandscaping/src/components/ServicesPreview.tsx` | h2: replace step classes with `text-[clamp(1.875rem,4vw,3rem)]` |
| `About.tsx` | `BigCountryLandscaping/src/components/About.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |
| `AboutPreview.tsx` | `BigCountryLandscaping/src/components/AboutPreview.tsx` | h2: replace step classes with `text-[clamp(1.875rem,4vw,3rem)]` |
| `Contact.tsx` | `BigCountryLandscaping/src/components/Contact.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |
| `CTABanner.tsx` | `BigCountryLandscaping/src/components/CTABanner.tsx` | h2: replace step classes with `text-[clamp(2rem,4vw,3rem)]` |
| `CTASection.tsx` | `BigCountryLandscaping/src/components/CTASection.tsx` | h2: replace step classes with `text-[clamp(1.875rem,4vw,3rem)]` |
| `Testimonials.tsx` | `BigCountryLandscaping/src/components/Testimonials.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |
| `TestimonialsPreview.tsx` | `BigCountryLandscaping/src/components/TestimonialsPreview.tsx` | h2: replace step classes with `text-[clamp(1.875rem,4vw,3rem)]` |
| `WhyBigCountry.tsx` | `BigCountryLandscaping/src/components/WhyBigCountry.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |
| `WhyChooseUs.tsx` | `BigCountryLandscaping/src/components/WhyChooseUs.tsx` | h2: replace step classes with `text-[clamp(1.5rem,4vw,3rem)]` |

**Not modified (already fluid):**
- `ExcavationPage.tsx` — all headings already use clamp()
- `SnowRemovalPage.tsx` — all headings already use clamp()
- `LandscapeConstruction.tsx` — all headings already use clamp()

---

## Common Pitfalls

### Pitfall 1: Spaces in Tailwind v3 arbitrary clamp values
**What goes wrong:** Writing `text-[clamp(2rem, 8vw, 6rem)]` with spaces — Tailwind v3 does not
parse spaces inside arbitrary value brackets; the class will not generate.
**How to avoid:** No spaces: `text-[clamp(2rem,8vw,6rem)]`

### Pitfall 2: Removing the amber tap highlight without understanding intent
**What goes wrong:** The current `body { -webkit-tap-highlight-color: rgba(245, 166, 35, 0.2) }`
is intentional brand styling (amber flash on tap). Changing it to `transparent` is a visible
behavior change on mobile.
**How to avoid:** This change is explicitly required (MFND-04). Planner should note it in
task description so the implementer is not surprised.

### Pitfall 3: Adding font-size 16px to body breaking existing sizing
**What goes wrong:** Some components use `text-sm` (14px) for body copy — adding `font-size: 16px`
to body sets the rem base but doesn't override Tailwind utility classes. `text-sm` remains 14px
because Tailwind sets explicit px values. This is NOT a problem.
**Why it's safe:** `font-size: 16px` on body sets the computed base for rem calculations and
prevents iOS auto-zoom on focus (iOS zooms when any focused input is smaller than 16px). It
does not force all text to 16px — Tailwind classes override it.

### Pitfall 4: scroll-behavior on html vs :root
**What goes wrong:** Adding `scroll-behavior: smooth` to `:root` when it already exists on `html`
creates a duplicate but otherwise harmless redundancy. `:root` has higher specificity than `html`
so the `:root` value wins, but they are the same element.
**How to avoid:** Either move it to `:root` only, or leave on `html` and note that it satisfies
the requirement. Both work identically.

### Pitfall 5: Hero.tsx h1 has two inline spans
**What goes wrong:** The Hero h1 has `className` on the `<h1>` tag with `text-3xl sm:text-4xl...`.
Replacing correctly means putting `text-[clamp(2rem,8vw,6rem)]` on the `<h1>`, removing all
the step classes. The spans inherit font-size from h1.
**How to avoid:** Verify the h1 structure — two `<span className="block">` children. The size
classes are on `h1`, not the spans. Replace on `h1`.

---

## Architecture Patterns

### Tailwind v3 clamp() arbitrary value pattern
```tsx
// For hero h1 (replaces multi-step responsive classes)
<h1 className="text-[clamp(2rem,8vw,6rem)] font-black tracking-tight">

// For section h2 (replaces text-2xl sm:text-3xl md:text-4xl lg:text-5xl)
<h2 className="text-[clamp(1.5rem,4vw,3rem)] font-black tracking-tight">
```

### globals.css body additions (final state)
```css
body {
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 16px;                              /* MTYP-01 — add */
  line-height: 1.5;                             /* MTYP-02 — add */
  color: #ffffff;
  background: #0f1f2d;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  text-rendering: optimizeSpeed;
  touch-action: manipulation;                   /* MFND-03 — add */
  -webkit-tap-highlight-color: transparent;     /* MFND-04 — change from amber */
}
```

### globals.css :root addition
```css
:root {
  /* existing CSS vars ... */
  -webkit-tap-highlight-color: transparent;     /* MFND-04 */
}
```

### globals.css interactive elements (MPERF-01)
```css
/* After body block, before or after @media rules */
a, button {
  touch-action: manipulation;
}
```

### Remove redundant input font-size query
```css
/* REMOVE this entire block (lines 50-54) — body font-size: 16px makes it redundant */
@media screen and (max-width: 768px) {
  input, select, textarea {
    font-size: 16px !important;
  }
}
/* REPLACE with: keep font-size: 16px on body; add to .form-input if needed */
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Manual `<meta name="viewport">` in `<head>` | Next.js `Viewport` export (since Next 14) | layout.tsx already uses correct modern API |
| `metadata.themeColor` in Metadata export | `viewport.themeColor` in Viewport export | Already separated correctly |
| Step-based responsive type (`text-xl md:text-2xl`) | `clamp()` fluid type | Service pages already converted; homepage components need updating |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fluid typography | Custom JS for viewport-based font scaling | CSS `clamp()` | Native CSS, zero JS, no layout shift |
| Touch delay elimination | Custom touchstart event handlers | `touch-action: manipulation` | Browser-native, no JS overhead |
| Viewport meta management | Manual `<meta>` tags in layout | Next.js `Viewport` export | Next handles serialization and deduplication |

---

## Open Questions

1. **Hero.tsx h1 clamp minimum value**
   - What we know: Current minimum is `text-3xl` = 30px (1.875rem). Requirement says "minimum readable on 375px."
   - What's unclear: `clamp(2rem, 8vw, 6rem)` gives 32px at 375px. Could use `clamp(1.875rem, 8vw, 6rem)` to match existing minimum.
   - Recommendation: Use `clamp(2rem, 8vw, 6rem)` as specified in requirements. 32px at 375px is more readable than 30px.

2. **`-webkit-tap-highlight-color` change — design intent**
   - What we know: Current value is amber/20 (intentional brand styling). Requirement says transparent.
   - Recommendation: Implement as specified. The tap highlight is a minor UX touch that conflicts with the requirement's mobile performance goal. Transparent is standard practice.

---

## Sources

### Primary (HIGH confidence)
- Direct file read: `BigCountryLandscaping/src/app/layout.tsx` — viewport config, metadata pattern
- Direct file read: `BigCountryLandscaping/src/app/globals.css` — all existing CSS rules
- Direct file read: `BigCountryLandscaping/src/components/Hero.tsx` — h1 structure and classes
- Direct file read: `BigCountryLandscaping/src/components/ExcavationPage.tsx` — h1/h2 clamp patterns
- Direct file read: `BigCountryLandscaping/src/components/SnowRemovalPage.tsx` — h1/h2 clamp patterns
- Direct file read: `BigCountryLandscaping/src/components/LandscapeConstruction.tsx` — h1/h2 clamp patterns
- Grep of all `h1`/`h2`/`clamp` usage across all TSX files
- Direct file read: `BigCountryLandscaping/tailwind.config.ts` — confirms v3 config structure

---

## Metadata

**Confidence breakdown:**
- Current state audit: HIGH — read directly from source files
- Gap analysis: HIGH — mechanical diff between spec and actual code
- Clamp values: HIGH — mathematically derived from current Tailwind step breakpoints
- Implementation approach: HIGH — based on existing patterns already used in service page components

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable — no external dependencies; findings are codebase state)
