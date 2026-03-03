# STRUCTURE.md — Directory Layout & Organization
> ABC Roofing Contractor Website

## Top-Level Layout
```
Contractor Website - Copy/
├── .gemini/               ← GSD installation (commands, agents, hooks)
├── .git/
├── .planning/             ← GSD planning docs
│   └── codebase/          ← This codebase map
├── .claude/               ← Claude integration (if any)
├── .planning/             ← GSD planning artifacts
├── abc-roofing/           ← The actual Next.js project
│   ├── src/
│   ├── public/
│   ├── node_modules/
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .eslintrc.json
└── GALLERY_FEATURE_INSTRUCTIONS.md  ← Feature doc
```

## Source Structure (`abc-roofing/src/`)
```
src/
├── app/                   ← Next.js App Router
│   ├── layout.tsx         ← Root layout (header/footer shell)
│   ├── page.tsx           ← Homepage
│   ├── globals.css        ← Global CSS + Tailwind + variables
│   ├── favicon.ico
│   ├── robots.ts          ← robots.txt generator
│   ├── sitemap.ts         ← sitemap.xml generator
│   ├── fonts/             ← Local font assets
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── reviews/
│   │   └── page.tsx
│   └── services/
│       └── page.tsx
└── components/            ← All React components (flat, no subfolders)
    ├── Header.tsx
    ├── Footer.tsx
    ├── MobileStickyCTA.tsx
    ├── Hero.tsx
    ├── ServicesPreview.tsx
    ├── AboutPreview.tsx
    ├── WhyChooseUs.tsx
    ├── TestimonialsPreview.tsx
    ├── CTASection.tsx
    ├── Services.tsx
    ├── About.tsx
    ├── Testimonials.tsx
    └── Contact.tsx
```

## Naming Conventions
| Pattern | Example |
|---|---|
| Page files | `page.tsx` in route folder |
| Component files | `PascalCase.tsx` |
| Route folders | `lowercase/` |
| CSS classes | `kebab-case` (Tailwind utilities) |
| Variables | `camelCase` |
| Exports | One default export per file, matches filename |

## Import Alias
- `@/` maps to `src/` — configured in `tsconfig.json`
- Usage: `import Header from "@/components/Header"`

## Public Assets
- `public/` directory — static assets served at root URL
- Image references in metadata: `/og-image.jpg` (not yet created)

## Key Files at a Glance
| File | Purpose |
|---|---|
| `src/app/layout.tsx` | Global layout, metadata, header/footer mount |
| `src/app/globals.css` | Design system, CSS variables, Tailwind layers |
| `src/components/Header.tsx` | Site navigation, scroll behavior, mobile menu |
| `src/components/Contact.tsx` | Primary lead generation form |
| `src/components/Hero.tsx` | Homepage hero with inline quote form |
| `tailwind.config.ts` | Tailwind customization |
