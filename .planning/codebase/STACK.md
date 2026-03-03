# STACK.md — Technology Stack
> ABC Roofing Contractor Website

## Runtime
- **Node.js** — runtime environment
- **Next.js 14.2.35** — React meta-framework (App Router)
- **React 18** — UI library
- **TypeScript 5** — static typing

## Languages
- **TypeScript/TSX** — all component and page files
- **CSS** — global styles in `globals.css`

## Styling
- **TailwindCSS 3.4.1** — utility-first CSS, configured in `tailwind.config.ts`
- **PostCSS** — CSS processing pipeline
- **Google Fonts** — Montserrat (400–900 weights), loaded via @import in `globals.css`
- **Custom CSS utilities** — defined in `@layer components` in `globals.css`:
  - `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-outline-white`
  - `.section-padding`, `.container-custom`, `.glass-card`, `.form-input`
  - `.sticky-cta-mobile`, `.scroll-smooth-x`, `.touch-link`

## Color Palette
| Variable | Hex | Usage |
|---|---|---|
| `--primary-dark` | `#094026` | Dark green — primary brand, backgrounds |
| `--primary-mid` | `#0a5530` | Mid green — gradient blend |
| `--accent-primary` | `#FCB215` | Gold/yellow — CTAs, highlights |
| `--bg-light` | `#f8f9fa` | Light grey — section backgrounds |

## Key Dependencies
```json
{
  "next": "14.2.35",
  "react": "^18",
  "react-dom": "^18"
}
```

## Dev Dependencies
```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "tailwindcss": "^3.4.1",
  "postcss": "^8",
  "eslint": "^8",
  "eslint-config-next": "14.2.35"
}
```

## Scripts
| Script | Command |
|---|---|
| `dev` | `next dev` — starts dev server at localhost:3000 |
| `build` | `next build` — production bundle |
| `start` | `next start` — runs production build |
| `lint` | `next lint` — ESLint check |

## Configuration Files
- `next.config.mjs` — minimal config, no custom config yet
- `tailwind.config.ts` — Tailwind customization
- `tsconfig.json` — TypeScript config with `@/` path alias → `src/`
- `.eslintrc.json` — ESLint rules via `eslint-config-next`
- `postcss.config.mjs` — PostCSS with Tailwind plugin
