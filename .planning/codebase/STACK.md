# Stack Analysis

## Framework & Runtime
- **Next.js 14.2.35** (App Router)
- **React 18**
- **TypeScript 5**

## Styling
- **Tailwind CSS 3.4.1** (v3 config-based, NOT v4 CSS-based)
- **PostCSS 8**
- Custom CSS utility classes in `globals.css`
- Font: Montserrat (Google Fonts import)

## Build & Deploy
- **Vercel** deployment (auto-deploy on push)
- npm package manager

## Design System
- Color scheme: Dark Green (#094026) + Gold (#FCB215)
- "Sergeant Painters" inspired theme
- Glass morphism effects, rounded corners (xl to 3xl)
- Mobile-first responsive design (70%+ mobile traffic)
- Custom button classes: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- Custom layout classes: `.section-padding`, `.container-custom`

## Notable Patterns
- No framer-motion currently installed
- No lucide-react currently installed
- Hand-rolled SVG icons throughout
- No image optimization (placeholder icons, no next/image usage)
- CSS-only animations (keyframes in tailwind.config.ts)
