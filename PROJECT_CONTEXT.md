# Contractor Website - Project Context

> This document provides full context for Claude or any developer to understand the project state and continue development without confusion.

## Project Overview

A **generic contractor website template** built for showcasing to various types of professional contractors (painters, concrete, handyman, construction, etc.). The website is NOT specific to any trade - all content is intentionally generic so it can be customized for any contractor type.

**Live Site:** https://contractor-website-delta.vercel.app
**Repository:** https://github.com/MapleTechSolutions/ContractorWebsite

## Tech Stack

- **Framework:** Next.js 14.2.35 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Montserrat (Google Fonts)
- **Deployment:** Vercel
- **Package Manager:** npm

## Design Theme - "Sergeant Painters Style"

The design is inspired by https://sergeantpainters.com/ with a professional dark green and gold color scheme.

### Colors
```
Primary Dark Green: #094026
Primary Mid Green:  #0a5530
Accent Gold:        #FCB215
Accent Gold Hover:  #e5a013
Background Light:   #f8f9fa
Text Dark:          #094026
Text Muted:         #a0a0a0
```

### Design Elements
- Glass morphism effects (backdrop-blur, semi-transparent backgrounds)
- Rounded corners (xl to 3xl)
- Subtle shadows with color tints
- Grid pattern overlays on dark sections
- Gradient backgrounds with blur effects

## Project Structure

```
abc-roofing/
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles, Tailwind config, mobile utilities
│   │   ├── layout.tsx         # Root layout with Header, Footer, MobileStickyCTA
│   │   ├── page.tsx           # Homepage
│   │   ├── about/page.tsx     # About page
│   │   ├── services/page.tsx  # Services page
│   │   ├── reviews/page.tsx   # Reviews/testimonials page
│   │   ├── contact/page.tsx   # Contact page
│   │   ├── robots.ts          # SEO robots.txt
│   │   └── sitemap.ts         # SEO sitemap
│   │
│   └── components/
│       ├── Header.tsx         # Fixed header with mobile menu
│       ├── Hero.tsx           # Hero section with expandable mobile form
│       ├── Services.tsx       # Interactive service tabs (full version)
│       ├── ServicesPreview.tsx# Services grid for homepage
│       ├── About.tsx          # About section (full version)
│       ├── AboutPreview.tsx   # About preview for homepage
│       ├── Testimonials.tsx   # Auto-rotating testimonials slider
│       ├── TestimonialsPreview.tsx # Testimonials for homepage
│       ├── WhyChooseUs.tsx    # 6 reasons grid with CTA banner
│       ├── Contact.tsx        # Contact form with validation
│       ├── CTASection.tsx     # Call-to-action section
│       ├── Footer.tsx         # Site footer with links
│       └── MobileStickyCTA.tsx# Sticky bottom bar for mobile
│
├── tailwind.config.ts         # Tailwind configuration
├── package.json
└── PROJECT_CONTEXT.md         # This file
```

## Components Detail

### Header.tsx
- Fixed position with scroll detection
- Transparent on hero, white background when scrolled
- Full-screen mobile menu with staggered animations
- Prevents body scroll when menu is open
- Logo + company name + "Professional Contractors" tagline

### Hero.tsx
- Full viewport height (`100svh` for mobile)
- Gradient background with decorative blur elements
- Desktop: Side-by-side content and quote form
- Mobile: Expandable quote form (tap to reveal)
- Stats bar: 15+ Years, 500+ Projects, 100% Satisfaction, 5.0 Rating
- Trust indicators: Licensed & Insured, Free Estimates, Satisfaction Guaranteed

### Services.tsx
- 5 service categories:
  1. Residential Services
  2. Commercial Services
  3. Renovations
  4. Repairs & Maintenance
  5. New Construction
- Desktop: Sidebar tabs with detail panel
- Mobile: Horizontal scroll tabs
- Each service has: title, description, 5 features, icon

### Testimonials.tsx
- 4 testimonials with auto-rotation (6 second interval)
- Pauses on touch/hover
- Mobile: Navigation arrows + dots
- Desktop: Dots only
- Shows: quote, name, location, service type badge

### Contact.tsx
- Form fields: Name, Phone, Email, Service (dropdown), Message
- Form validation and submission state
- Success message after submission
- Contact info cards: Phone, Email, Business Hours

### MobileStickyCTA.tsx
- Appears after scrolling past 50% of viewport
- Hides near footer
- Two buttons: "Call Now" and "Free Estimate"
- Safe area padding for notched phones

## Mobile Optimizations (70%+ Mobile Traffic)

### Performance
- Reduced blur effects on mobile (80px vs 150px on desktop)
- Simplified background gradients
- Reduced animation durations
- `touch-manipulation` for faster touch response

### Touch Experience
- Minimum 48px touch targets on all interactive elements
- `active:` states for touch feedback (instead of just `hover:`)
- Prevents iOS zoom on input focus (16px minimum font)
- `-webkit-tap-highlight-color` customized to gold

### Layout
- Mobile-first responsive design
- Stacked layouts on mobile, side-by-side on desktop
- Horizontal scroll for service tabs on mobile
- Full-width buttons on mobile
- Reduced padding/margins on mobile

### Navigation
- Full-screen mobile menu (not dropdown)
- Body scroll lock when menu open
- Sticky CTA bar at bottom

### Accessibility
- `prefers-reduced-motion` support
- Proper focus-visible outlines
- ARIA labels on buttons
- Semantic HTML structure

### Safe Areas
- CSS env() for notched devices (iPhone X+)
- `safe-area-bottom` padding on sticky elements

## Global CSS Classes (globals.css)

```css
.btn-primary      - Gold button with dark text
.btn-secondary    - Dark green button with white text
.btn-outline      - Gold border, transparent background
.btn-outline-white- White border for dark backgrounds
.section-padding  - Responsive section padding
.container-custom - Max-width container
.glass-card       - Glass morphism effect
.scroll-smooth-x  - Horizontal scroll with snap
.safe-area-bottom - Padding for notched devices
```

## SEO Configuration

- Meta tags configured in `layout.tsx`
- Open Graph and Twitter cards
- `robots.ts` allows all crawlers, blocks `/api/` and `/_next/`
- `sitemap.ts` includes all 5 pages
- Canonical URL: `https://yourcompany.com` (placeholder)

## Placeholder Content to Replace

When customizing for a specific contractor:

1. **Company Name:** Search for "COMPANY NAME" and "Company Name"
2. **Phone:** Search for "(555) 123-4567" and "5551234567"
3. **Email:** Search for "info@company.com"
4. **Domain:** Update `yourcompany.com` in sitemap.ts, robots.ts, layout.tsx
5. **Services:** Modify services array in Services.tsx if needed
6. **Testimonials:** Update testimonials array in Testimonials.tsx
7. **Stats:** Update numbers in Hero.tsx and About.tsx (15+ years, 500+ clients, etc.)
8. **Colors:** If needed, update color values in globals.css and throughout components

## Running Locally

```bash
cd abc-roofing
npm install
npm run dev
# Opens at http://localhost:3000
```

## Git Workflow

```bash
# After making changes
git add .
git commit -m "Description of changes"
git push origin master
# Vercel auto-deploys on push
```

## Future Improvements to Consider

1. **Images:** Add actual project photos (currently using placeholder icons)
2. **Contact Form Backend:** Connect to email service (Resend, SendGrid, etc.)
3. **Google Maps:** Add map to contact section
4. **Blog/Projects:** Add portfolio or blog section
5. **Animations:** Add scroll-triggered animations (Framer Motion)
6. **Analytics:** Add Google Analytics or Plausible
7. **Schema Markup:** Add LocalBusiness structured data
8. **Performance:** Add image optimization with next/image
9. **PWA:** Add service worker for offline support
10. **Multi-language:** Add i18n if needed

## Last Updated

- **Date:** February 1, 2026
- **Last Commit:** `ba7a406` - Add mobile-optimized contractor website with Sergeant Painters theme
- **Status:** Fully functional, mobile-optimized, deployed to Vercel
