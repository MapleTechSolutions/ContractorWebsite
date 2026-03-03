# INTEGRATIONS.md — External Integrations
> ABC Roofing Contractor Website

## Current Integrations

### Google Fonts
- **Type:** CDN font loading
- **How:** `@import url('https://fonts.googleapis.com/css2?family=Montserrat:...')` in `src/app/globals.css`
- **Font:** Montserrat (weights 400, 500, 600, 700, 800, 900)
- **Note:** Loaded at runtime — could be optimized with `next/font` for better performance

### SEO / Metadata (Built-in Next.js)
- **OpenGraph** — configured in `src/app/layout.tsx` with og:title, og:description, og:image
- **Twitter Cards** — `summary_large_image` card configured
- **Robots meta** — index + follow rules set
- **Sitemap** — generated via `src/app/sitemap.ts`
- **Robots.txt** — generated via `src/app/robots.ts`

## Missing / Placeholder Integrations

### Contact Form Backend ⚠️
- The `Contact.tsx` form uses a **fake submit handler** — just a `setTimeout` mock:
  ```ts
  await new Promise((resolve) => setTimeout(resolve, 1000));
  ```
- **No real backend connected.** Needs integration with one of:
  - Email service (Resend, SendGrid, Mailgun)
  - Form backend (Formspree, Netlify Forms)
  - CRM (HubSpot, Salesforce)

### Hero Quote Form ⚠️
- `Hero.tsx` form has **no onSubmit handler** — pure UI with no functionality

### Phone / Email
- Phone: `(555) 123-4567` — **placeholder**, hardcoded in `Header.tsx`, `Hero.tsx`, `Contact.tsx`, `Footer.tsx`, `MobileStickyCTA.tsx`
- Email: `info@company.com` — **placeholder**, hardcoded in `Contact.tsx`, `Footer.tsx`

### Social Media
- Facebook, Instagram, Google links all point to `#` in `Footer.tsx`
- **No real social URLs connected**

### Analytics
- **None configured** — no Google Analytics, Plausible, or similar

### Maps
- **None** — no embedded map on Contact page

## Domain / Hosting
- `metadataBase` in layout.tsx set to `https://yourcompany.com` — **placeholder URL**
- Canonical href also set to `https://yourcompany.com` — needs updating on deploy
