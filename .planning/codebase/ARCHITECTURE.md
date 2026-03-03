# ARCHITECTURE.md — System Architecture
> ABC Roofing Contractor Website

## Pattern
**Static marketing website** built with Next.js App Router.
- Primarily Server Components (RSC) for page-level components
- Client Components (`"use client"`) only where interactivity is required
- No database, no auth, no API routes — pure frontend

## App Router Structure

```
src/app/                   ← Next.js App Router root
├── layout.tsx             ← Root layout: Header + Footer + MobileStickyCTA wrapper
├── page.tsx               ← Homepage: assembles section components
├── globals.css            ← Global styles + Tailwind + CSS custom properties
├── favicon.ico
├── robots.ts              ← Auto-generated robots.txt
├── sitemap.ts             ← Auto-generated sitemap.xml
├── fonts/                 ← Local font files (if any)
├── about/page.tsx         ← About page
├── contact/page.tsx       ← Contact page
├── reviews/page.tsx       ← Reviews/testimonials page
└── services/page.tsx      ← Services listing page
```

## Component Layer

```
src/components/            ← All reusable UI components
├── Header.tsx             ← Fixed nav (scroll-aware), mobile menu, CTA
├── Footer.tsx             ← Company info, links, social, contact
├── MobileStickyCTA.tsx    ← Bottom sticky bar (mobile only, hidden md+)
│
├── Hero.tsx               ← Full-screen hero, inline quote form, stats bar
├── ServicesPreview.tsx    ← Services grid (homepage teaser)
├── AboutPreview.tsx       ← About section (homepage teaser)
├── WhyChooseUs.tsx        ← Value proposition / trust signals
├── TestimonialsPreview.tsx ← Reviews teaser (homepage)
├── CTASection.tsx         ← Bottom CTA / conversion section
│
├── Services.tsx           ← Full services page component
├── About.tsx              ← Full about page component
├── Testimonials.tsx       ← Full reviews page component
└── Contact.tsx            ← Full contact page with real form logic
```

## Data Flow
- **No global state** — each component is self-contained
- **No data fetching** — all content is static, hardcoded in components
- **Form state** — local `useState` in `Contact.tsx` and `Hero.tsx`
- **UI state** — scroll state in `Header.tsx`, mobile menu, form visibility toggle

## Rendering Strategy
| Route | Strategy | Notes |
|---|---|---|
| `/` | Static (SSG) | Pure Server Component assembly |
| `/about` | Static (SSG) | No dynamic data |
| `/contact` | Static (SSG) | Form is client-side only |
| `/services` | Static (SSG) | No dynamic data |
| `/reviews` | Static (SSG) | No dynamic data |

## Client Components (interactive)
- `Header.tsx` — scroll listener, mobile menu toggle
- `Hero.tsx` — mobile form toggle, `isFormVisible` state
- `Contact.tsx` — full form with controlled inputs, submit handler
- `MobileStickyCTA.tsx` — likely client (sticky bar behavior)

## Entry Points
- Dev: `npm run dev` → Next.js dev server at `localhost:3000`
- Layout wraps all pages: `src/app/layout.tsx`
- Root page: `src/app/page.tsx`
