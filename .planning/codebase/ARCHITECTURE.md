# Architecture Analysis

## Project Structure
```
abc-roofing/
├── src/app/           # Next.js App Router pages
│   ├── layout.tsx     # Root layout (Header + Footer + MobileStickyCTA)
│   ├── page.tsx       # Homepage (Hero + previews + CTA)
│   ├── about/         # About page
│   ├── services/      # Services page
│   ├── reviews/       # Reviews/testimonials page
│   ├── contact/       # Contact page
│   ├── robots.ts      # SEO
│   └── sitemap.ts     # SEO
├── src/components/    # All components (flat structure)
│   ├── Header.tsx     # Fixed header w/ mobile menu
│   ├── Hero.tsx       # Full-height hero with quote form
│   ├── Footer.tsx     # Site footer
│   ├── Services.tsx   # Full services (tab-based)
│   ├── ServicesPreview.tsx  # Homepage services grid
│   ├── About.tsx      # Full about section
│   ├── AboutPreview.tsx    # Homepage about preview
│   ├── Testimonials.tsx    # Full testimonials slider
│   ├── TestimonialsPreview.tsx  # Homepage testimonials
│   ├── WhyChooseUs.tsx     # 6-reason grid
│   ├── Contact.tsx         # Contact form
│   ├── CTASection.tsx      # Call-to-action banner
│   └── MobileStickyCTA.tsx # Sticky bottom bar (mobile)
└── globals.css        # Global styles, theme, utility classes
```

## Component Patterns
- Components are "use client" where interactivity needed
- Flat component directory (no subdirectories)
- Each page imports its full-page component variants
- Homepage uses "Preview" variants that link to full pages
- Inline SVGs for all icons (no icon library)

## Navigation
- 5 pages: Home, Services, About, Reviews, Contact
- Header has desktop nav + full-screen mobile menu
- No gallery/portfolio page currently exists

## Data Patterns
- All data is hardcoded in component files (no separate data files)
- No API routes or backend
- Form submission is client-side only (no backend handler)
