# CONCERNS.md — Technical Debt & Issues
> ABC Roofing Contractor Website

## 🔴 Critical Issues

### Contact Form Has No Backend
- **File:** `src/components/Contact.tsx` (line 20-27)
- **Issue:** Form submit handler is a fake `setTimeout` mock — no real data is sent
- **Impact:** Leads are silently lost — users think they submitted but nothing happens
- **Fix needed:** Connect to email service (Resend, SendGrid) or form backend (Formspree)

### Hero Form Also Non-Functional
- **File:** `src/components/Hero.tsx` (line 95-137)
- **Issue:** Desktop quote form has no `onSubmit` handler at all
- **Impact:** Clicking "Request Free Quote" does nothing (form resets or does default browser submit)
- **Fix needed:** Either add handler or link to `/contact` page

## 🟡 Important Gaps

### All Placeholder Content — Not Customized
- Phone: `(555) 123-4567` hardcoded in 4+ files
- Email: `info@company.com` hardcoded in 2+ files
- Company name: `COMPANY NAME` or `Company Name` throughout
- Domain: `https://yourcompany.com` in `layout.tsx`
- Social links: all `href="#"` in `Footer.tsx`
- OG image: `/og-image.jpg` doesn't exist in `public/`
- **All must be replaced before any real deployment**

### Google Fonts External Load
- **File:** `src/app/globals.css` (line 1)
- **Issue:** Font loaded via `@import` CSS — blocks render, no preloading
- **Fix:** Use `next/font/google` for automatic optimization and self-hosting

### No Form Validation
- **File:** `src/components/Contact.tsx`
- Only HTML5 `required` attribute — no client-side format validation
- No phone number format check, no email format feedback
- No character limits on textareas

### No `og-image.jpg`
- Referenced in `layout.tsx` metadata but file doesn't exist in `public/`
- Affects social sharing previews

## 🟢 Low Priority / Future Improvements

### Hardcoded Stats
- "15+ Years", "500+ Projects", "5.0 Star Rating" in `Hero.tsx`
- No mechanism to update without code change
- Consider extracting to a config file or CMS

### Duplicate Form Code
- Hero form (desktop) and Hero form (mobile) are near-identical JSX
- Could be extracted into a shared `QuoteForm` component

### No Loading State on Images
- No `next/image` used — all images would be bare `<img>` or background CSS
- No skeleton loaders or blur-up placeholders

### Robots.ts / Sitemap.ts
- **File:** `src/app/robots.ts` and `src/app/sitemap.ts`
- Sitemap likely has placeholder URL — needs real domain before go-live

### No Error Boundaries
- No React error boundary configured
- Any component crash would take down the whole page

### Privacy Policy / Terms Links Are Dead
- `Footer.tsx` links to `href="#"` for Privacy Policy and Terms of Service
- Need real pages before compliance

## Security Notes
- No `.env` files observed — no secrets in codebase ✅
- No authentication needed (public marketing site) ✅
- Form inputs have no XSS risk (no `dangerouslySetInnerHTML`) ✅
- When backend form is added: validate on server side, use rate limiting
