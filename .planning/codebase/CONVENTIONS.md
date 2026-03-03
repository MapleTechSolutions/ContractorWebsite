# CONVENTIONS.md — Code Style & Patterns
> ABC Roofing Contractor Website

## TypeScript
- Strict mode enabled via `tsconfig.json`
- All component props typed inline (no separate interfaces for simple components)
- Event handlers typed: `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>`
- `Readonly<{children: React.ReactNode}>` pattern for layout children

## Component Conventions
- **One default export per file**, named matching the filename
- **"use client"** directive at top of file for interactive components
- **Server Components by default** — no directive needed for static ones
- No barrel exports / no `index.ts` files — direct imports only
- All components in flat `src/components/` — no subfolder nesting

## File Naming
- Components: `PascalCase.tsx` (e.g., `Hero.tsx`, `CTASection.tsx`)
- Pages: `page.tsx` (Next.js convention)
- Route folders: `lowercase` (e.g., `/about`, `/contact`)

## Styling Conventions
- **Tailwind-first** — all styling via utility classes
- **Custom utilities** defined in `globals.css` `@layer components`
- **Hardcoded hex colors** used directly in classes (`bg-[#094026]`, `text-[#FCB215]`)
- **Responsive breakpoints**: mobile-first, `sm:`, `md:`, `lg:`, `xl:`
- **Dark backgrounds**: `#094026` (green), accent: `#FCB215` (gold)
- **Touch targets**: minimum `min-h-[44px]` / `min-h-[48px]` on interactive elements
- **`touch-manipulation`** added to all clickable mobile elements

## State Management Patterns
```tsx
// Local state only — no global store
const [isScrolled, setIsScrolled] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Controlled forms
const [formData, setFormData] = useState({ name: "", email: "", ... });
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

## Error Handling
- Form submit: optimistic UI with `isSubmitting` flag + `isSubmitted` success state
- No error state currently for failed submissions (only success path handled)

## Animation Patterns
- **Tailwind transitions**: `transition-all duration-200/300`
- **CSS class toggling**: `max-h-0 → max-h-[600px]` for expandable sections
- **Ping animation**: `animate-ping` for the "live" badge in Hero
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` in globals.css disables all

## Accessibility Patterns
- `aria-label` on icon buttons
- `aria-expanded` on mobile menu toggle
- `htmlFor` / `id` pairs on form labels + inputs
- `:focus-visible` ring in gold (#FCB215) on all interactive elements

## Data Patterns
- Navigation links defined as arrays: `const navLinks = [{ href, label }]`
- Content rendered via `.map()` — no external data source
- All content is **hardcoded static data** — no CMS or API

## Imports Order (observed)
1. `"use client"` (if needed)
2. Next.js imports (`Link`, `usePathname`)
3. React imports (`useState`, `useEffect`)
4. Local component imports (`@/components/...`)
