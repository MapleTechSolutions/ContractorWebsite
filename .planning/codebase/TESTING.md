# TESTING.md — Test Structure & Practices
> ABC Roofing Contractor Website

## Current State
**No tests exist.** This is a marketing/brochure website with no test suite configured.

## Installed Test Infrastructure
- None — no Jest, Vitest, Playwright, Cypress, or Testing Library in `package.json`
- Only `eslint` for static code analysis

## ESLint
- Config: `.eslintrc.json` using `eslint-config-next`
- Run: `npm run lint`
- Catches: React/Next.js-specific rules, unused vars, accessibility hints

## Recommended Testing Approach (if adding tests)

### Unit / Component Tests
- **Vitest + React Testing Library** — recommended for Next.js App Router
- Key areas to test:
  - `Contact.tsx` form validation and submission states
  - `Header.tsx` scroll behavior and mobile menu toggle
  - `Hero.tsx` mobile form expand/collapse

### E2E Tests
- **Playwright** — recommended
- Critical user journeys:
  1. Homepage loads with all sections visible
  2. Contact form submits successfully
  3. Mobile menu opens/closes
  4. Navigation links route correctly
  5. Phone/email CTAs are clickable

### Visual Regression
- Not currently needed — static marketing site
- Could use Playwright screenshots if design changes frequently

## Manual Testing Notes
- Test on real iOS + Android devices (not just browser DevTools)
- Key areas: sticky CTA on mobile, form behavior on small screens
- Check `prefers-reduced-motion` behavior
- Verify 44px+ touch targets on mobile
