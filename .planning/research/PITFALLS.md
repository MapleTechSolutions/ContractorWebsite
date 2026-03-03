# Pitfalls Research: Contractor Website Rebrand

**Project:** Big Country Landscaping & Maintenance Ltd
**Researched:** 2026-03-03
**Mode:** Feasibility / Pitfall Catalog
**Confidence:** HIGH — findings supported by direct codebase inspection, Next.js official docs, and web performance standards

---

## Image & Performance Pitfalls

### Pitfall 1: No next/image — Raw Images Will Destroy Load Times

**What goes wrong:** The current codebase contains no `next/image` usage anywhere. The Hero uses a pure CSS gradient background with no real image. When real contractor action shots are dropped in as `<img>` tags or CSS background-image properties, they bypass all Next.js optimization: no WebP/AVIF conversion, no lazy loading, no blur placeholder, no responsive srcset.

**Why it happens:** Developer treats images as a "content concern" and reaches for the HTML `<img>` tag by habit, or uses CSS `background-image`. Both skip the optimization pipeline entirely.

**Confirmed in codebase:** `abc-roofing/src/components/Hero.tsx` — no image element or next/image import at all. `next.config.mjs` is an empty config object with no `images` key configured.

**Consequences:** Hero LCP scores above 4s on 4G mobile. Gallery page becomes unusable on slow connections. Client demos on mobile fail to impress.

**Prevention:**
- Every `<img>` must become `<Image>` from `next/image`.
- The hero background photo must use `<Image fill objectFit="cover" priority />` inside a `relative` container — the `priority` prop triggers preload and is required for LCP images.
- Set explicit `width` and `height` on all gallery card images. Use `sizes` attribute to avoid sending desktop-resolution images to mobile: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.
- Add `next.config.mjs` `images` config before any external image URLs are used (not needed for `/public` local images, but required the moment any CDN or remote URL is introduced).

**Detection:** Build output will warn if unoptimized images are detected. Run `next build` and look for "Image optimization" warnings. Lighthouse LCP score above 2.5s is the alarm signal.

**Phase affected:** Phase 1 (gallery grid), Phase 2 (lightbox), Rebrand phase (hero image).

---

### Pitfall 2: Hero Background Image Will Fail LCP If Not Marked Priority

**What goes wrong:** A full-screen hero with an action-shot background image is the most LCP-sensitive element on the page. If the image is loaded with `loading="lazy"` (the default for next/image) or as a CSS background-image, the browser does not preload it. LCP registers as 3-5 seconds on mobile despite fast hosting.

**Why it happens:** Default `next/image` behavior is lazy loading. Developers add the image correctly but forget the `priority` prop on the above-the-fold element.

**Consequences:** Google Core Web Vitals LCP fails. On client demo via phone on a 4G connection, the hero will visibly blank-out while the image loads.

**Prevention:**
- Any image that is visible in the first viewport without scrolling (hero background, hero equipment photo) must have `priority` prop: `<Image src="..." priority />`.
- Use a LQIP (Low Quality Image Placeholder) or solid dark color as the placeholder so there is no jarring white flash before the image loads: `placeholder="blur" blurDataURL="data:image/jpeg;base64,..."`. A tiny 10x10px blurred version of the hero image works.
- Set explicit hero container height before the image loads to prevent CLS: `min-h-screen` or `min-h-[100svh]`. The current Hero.tsx already does this correctly — preserve it.

**Detection:** Chrome DevTools > Performance > LCP element. If the largest contentful paint element is your hero image and it has `loading="lazy"`, that is the bug.

**Phase affected:** Rebrand phase (hero with real image).

---

### Pitfall 3: Google Fonts @import Blocks First Paint

**What goes wrong:** `globals.css` line 1 imports Montserrat via `@import url('https://fonts.googleapis.com/...')`. CSS `@import` is render-blocking: the browser fetches the external stylesheet before it can render any text. On slow connections, users see a blank page for 200-800ms.

**Confirmed in codebase:** `abc-roofing/src/app/globals.css` line 1. This is already flagged in `CONCERNS.md` as an important gap.

**Why it happens:** Copy-pasted from Google Fonts embed instructions. The `@import` method is the worst-performing option Google offers.

**Consequences:** Slow first contentful paint. Flash of unstyled text (FOUT) on repeat visits if font cache is cold. Chrome Lighthouse flags this as a render-blocking resource.

**Prevention:** Replace the `@import` with `next/font/google` in `layout.tsx`:
```tsx
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] });
// Apply via montserrat.className on <html> element
```
This self-hosts the font at build time, eliminating the external request entirely.

**Detection:** Lighthouse > "Eliminate render-blocking resources" will list the Google Fonts import.

**Phase affected:** Rebrand phase (early priority).

---

### Pitfall 4: Client-Supplied Photos Will Be 8-15MB Each

**What goes wrong:** The client will supply photos taken on a smartphone or from a camera. These are typically 8-15MB JPEG files at 4000x3000px resolution. Loading them directly — even with next/image — strains the build and produces large local assets.

**Why it happens:** Client does not know what "web-optimized" means and will send original files. Developer forgets to process before committing.

**Consequences:** Git repository grows to hundreds of MB within a few photo additions. Build times increase. Even with next/image optimization at request time, the on-disk originals are large.

**Prevention:**
- Define an intake process before client sends photos: "Please send photos as-received; we will optimize them before adding to the site."
- Resize originals to 1920px wide maximum before committing (the display size never exceeds this). Use `sharp` (already available in Next.js ecosystem) or any image editor.
- Store processed versions at maximum 300-500KB for gallery thumbnails, 500KB-1MB for lightbox full view.
- Consider a `/public/gallery/` subfolder structure: `gallery/excavation/`, `gallery/snow/`, `gallery/equipment/` to match the filter categories.

**Detection:** `git status` showing photo files over 1MB is the warning sign. Set up a `.gitattributes` rule or simply establish the convention before the first photo commit.

**Phase affected:** Gallery phase (Phase 1 and 2).

---

### Pitfall 5: Gallery Grid CLS — Images Without Explicit Dimensions Reflow the Page

**What goes wrong:** If gallery cards render without fixed aspect-ratio containers, the grid layout reflows as each image loads. On a mobile connection, cards progressively snap into their final heights, causing the page layout to shift. Google assigns CLS penalties to sites with visible layout shifts greater than 0.1.

**Why it happens:** Developer wraps images in a div with no height, or uses `width="100%" height="auto"` without a container that reserves space.

**Consequences:** CLS score exceeds 0.1. Users see content jumping as they scroll. Client demo on phone shows a shaky, unprofessional loading experience.

**Prevention:**
- Wrap every gallery image in an aspect-ratio container: `<div className="relative aspect-[4/3]">` with `<Image fill className="object-cover" />` inside. The `aspect-[4/3]` reserves the correct space before the image loads.
- For gallery cards, all images should use a consistent aspect ratio (4:3 works well for equipment and job site photos).
- The `fill` prop on next/image requires its parent to have `position: relative` and explicit dimensions or an aspect-ratio — always set both.

**Detection:** Chrome DevTools > Performance > Layout Shifts. Any shift score above 0 in the gallery area signals missing aspect ratio containers.

**Phase affected:** Phase 1 (gallery grid).

---

### Pitfall 6: backdrop-filter Blur in Lightbox Kills Performance on Older Android

**What goes wrong:** The existing codebase uses `backdrop-filter: blur()` extensively (`.glass-card`, `.mobile-menu-overlay`, Hero form containers). A lightbox overlay with heavy backdrop blur will cause significant GPU strain on mid-range Android phones (Samsung Galaxy A series, Motorola G series) — the exact phones contractors and their clients likely use.

**Confirmed in codebase:** `globals.css` uses `backdrop-filter: blur(10px)` in `.glass-card` and `backdrop-filter: blur(4px)` in `.mobile-menu-overlay`. The Hero component uses `blur-[80px]` and `blur-[150px]` CSS filter orbs.

**Consequences:** Lightbox animation drops to 15FPS on target devices. Scroll becomes sticky while lightbox is open. Client demo feels broken.

**Prevention:**
- For the lightbox overlay, use a semi-opaque `bg-black/80` without backdrop blur rather than a blur overlay: `bg-black/80` at full opacity is performant and equally effective at focusing attention on the lightbox.
- The `@supports (backdrop-filter: blur(10px))` pattern already exists in globals.css — use it for graceful degradation. Apply backdrop blur only where `@supports` confirms it.
- The existing `reduce-motion-mobile` class in globals.css is the right pattern — extend it to skip `backdrop-filter` on mobile too.

**Detection:** Chrome DevTools > Rendering > Layer Borders + FPS meter. Enable on a throttled CPU simulation. Any persistent blur overlay that drops below 30FPS is a performance failure.

**Phase affected:** Phase 2 (lightbox).

---

## Mobile UX Pitfalls

### Pitfall 1: Lightbox on Mobile Has No Swipe Navigation — Users Will Be Confused

**What goes wrong:** The gallery roadmap specifies keyboard navigation (arrow keys, ESC) for the lightbox. Keyboard navigation is correct but is irrelevant on mobile. On a phone, users expect to swipe left/right to browse photos. Without touch gestures, the lightbox feels broken on the device being used for the client demo.

**Why it happens:** Developer builds for desktop keyboard first, ships without testing swipe interaction on actual device.

**Consequences:** During the client demo on a phone, the lightbox does not respond to swipes. Client cannot browse photos. This is the single most visible failure point during a mobile demo.

**Prevention:**
- Implement touch swipe detection in the lightbox using `onTouchStart` / `onTouchEnd` with delta calculation: if horizontal swipe delta > 50px, navigate prev/next.
- Framer Motion provides `drag` prop with `dragConstraints` that can handle swipe gestures natively — use `drag="x"` with a velocity threshold.
- Alternatively, `react-swipeable` (lightweight, ~3KB gzipped) provides clean swipe hooks.
- Always test on a real device or Chrome DevTools mobile emulator in touch mode, not just keyboard on desktop.

**Detection:** Open the lightbox on a mobile device. Try swiping left. If nothing happens, the pitfall is present.

**Phase affected:** Phase 2 (lightbox) — HIGH PRIORITY.

---

### Pitfall 2: Body Scroll Leaks Through the Lightbox on iOS Safari

**What goes wrong:** When a lightbox modal opens, the background page can still scroll on iOS Safari. The user swipes to see the next image and the body scrolls instead. This is a known iOS quirk: `overflow: hidden` on `body` does not prevent body scroll in all iOS Safari versions.

**Why it happens:** Developer adds `overflow-hidden` to body via JavaScript when lightbox opens, but iOS Safari ignores this for touch-based scrolling.

**Consequences:** Opening a photo and swiping causes the background page to scroll. The lightbox experience is disorienting and feels broken. iOS is the dominant mobile OS in Alberta among the contractor client demographic.

**Prevention:**
- Use `position: fixed` on the body when the lightbox is open, storing and restoring `window.scrollY` to prevent the page jumping to top:
  ```tsx
  // On open:
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  // On close:
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, scrollY);
  ```
- Use `touch-action: none` on the lightbox overlay container to capture all touch events.

**Detection:** Open lightbox on iPhone Safari. Attempt to scroll vertically. If background page moves, the pitfall is present.

**Phase affected:** Phase 2 (lightbox).

---

### Pitfall 3: Mobile Form Keyboard Pushes the Expandable Hero Form Behind the Viewport

**What goes wrong:** The current `Hero.tsx` uses `max-h-0 → max-h-[600px]` transition for the mobile quote form expansion. When the user taps a form field and the iOS/Android keyboard opens, the keyboard pushes the viewport up, which can push the form fields partially off-screen. The fixed `max-h-[600px]` container does not adapt to the reduced viewport height.

**Confirmed in codebase:** Hero.tsx lines 168-198 — `max-h-[600px]` expandable form.

**Why it happens:** The max-height is set to a fixed pixel value that assumes full viewport height is available.

**Consequences:** Users tap the "Phone Number" input and the keyboard appears, leaving only the first field visible with no way to reach the submit button without dismissing the keyboard first.

**Prevention:**
- Use `max-h-[80dvh]` instead of `max-h-[600px]` so the expanded form respects the dynamic viewport height (dvh accounts for the keyboard).
- Make the form area scrollable: add `overflow-y-auto` to the expanded form container with that max-height constraint.
- The `font-size: 16px` rule in globals.css already prevents iOS zoom-on-focus — keep this.

**Detection:** Open on iPhone, tap "Quick Quote Form" to expand, tap the "Phone Number" field. If the submit button is inaccessible, the pitfall is present.

**Phase affected:** Rebrand phase (hero form work) and any future form updates.

---

### Pitfall 4: Framer Motion Filter Animations Are Janky on Low-End Android

**What goes wrong:** When filter buttons are tapped in the gallery, Framer Motion animates old items out and new items in using layout animations. On low-end Android devices (Snapdragon 4xx processors, 3GB RAM), running 12-20 simultaneous AnimatePresence exit/entry animations causes frame drops.

**Why it happens:** Layout animations recalculate all item positions on every frame. With many gallery items, this is CPU-intensive.

**Consequences:** Filter tap response feels delayed. Animations stutter. On the client demo phone, this creates a "laggy app" impression.

**Prevention:**
- Limit simultaneous animated items: if the gallery has more than 12 items, disable exit animations (`mode="popLayout"` instead of staggered exits) or use `layout` only without full AnimatePresence exit.
- Use `will-change: transform` on gallery card elements to promote them to GPU layers before animation.
- Provide a `prefers-reduced-motion` fallback that skips Framer Motion animations entirely — the existing globals.css reduced-motion block already handles CSS transitions, but Framer Motion requires its own check: `const prefersReducedMotion = useReducedMotion()` hook from framer-motion.
- Cap gallery to 20-24 items with a "Load More" pattern if client provides many photos.

**Detection:** Chrome DevTools > Performance tab on throttled CPU (6x slowdown). Frame drops during filter transition are visible as green bar gaps in the timeline.

**Phase affected:** Phase 1 (gallery filtering).

---

### Pitfall 5: Touch Targets in Lightbox Navigation Will Be Too Small

**What goes wrong:** Lightbox prev/next arrow buttons are typically rendered as small icon buttons in the left/right margins of the photo. On a 390px phone screen, these margins are minimal. Buttons rendered at 32x32px or smaller cause missed taps, requiring the user to tap 2-3 times.

**Prevention:**
- Lightbox nav buttons must be minimum 56x56px touch targets on mobile (larger than the 48px standard because users tap quickly while holding the phone with both hands).
- Consider placing full half-screen tap zones: the left half of the lightbox taps back, the right half taps forward — this is the Instagram and iOS Photos pattern. Arrow icons overlay these zones as visual affordance only.
- Apply `touch-manipulation` CSS to all lightbox interactive elements.

**Detection:** DevTools > Accessibility > Tap target check. Any lightbox nav button under 48x48px fails.

**Phase affected:** Phase 2 (lightbox) and Phase 3 (mobile hardening).

---

## Gallery & Lightbox Pitfalls

### Pitfall 1: No Focus Trap in Lightbox — Keyboard Users Escape Into Background

**What goes wrong:** If the lightbox does not implement a focus trap, pressing Tab while the lightbox is open moves focus into the background page content (header nav links, body links). Screen reader users and keyboard power users lose the lightbox entirely.

**Why it happens:** Developer adds aria-label and keyboard close/navigate, but misses that Tab focus management requires explicitly trapping focus within the modal.

**Consequences:** Accessibility audit failure. WCAG 2.1 Level AA requires focus to be managed in modal dialogs (Criterion 2.1.1). The roadmap Phase 3 mentions accessibility but does not call out focus trapping by name.

**Prevention:**
- Use the `focus-trap-react` library (1.5KB, well-maintained) in the lightbox component: wraps the modal in a focus trap automatically.
- Alternatively, implement manually: on lightbox open, query all focusable elements within the lightbox, intercept Tab/Shift+Tab to cycle only within those elements, and return focus to the trigger element on close.
- Set `aria-modal="true"` and `role="dialog"` on the lightbox container.
- The element that triggered the lightbox (gallery card) must receive focus back when the lightbox closes.

**Detection:** Open lightbox with mouse. Press Tab. If focus moves to an element outside the lightbox, the trap is missing.

**Phase affected:** Phase 3 (accessibility hardening) — but design for it in Phase 2.

---

### Pitfall 2: Framer Motion AnimatePresence Key Mismatch Causes Ghost Items

**What goes wrong:** When filter buttons switch the category, Framer Motion's AnimatePresence runs exit animations on old items and entry animations on new items simultaneously. If items from two different filter categories share the same array index as their React key (e.g., key={index}), React reuses DOM nodes and exit/entry animations play on the wrong elements ("ghost" cards appear in wrong positions before disappearing).

**Why it happens:** Using `key={index}` in a filtered `.map()`. The index of a filtered array does not correspond to a stable item identity.

**Consequences:** Items flash in wrong positions during filter transitions. The gallery looks broken mid-animation.

**Prevention:**
- Always key gallery items by a stable unique identifier, not by array index: `key={project.id}` or `key={project.slug}`.
- Define a `projects` data array with unique IDs before building the gallery component.
- Test filter transitions by rapidly clicking between all category filters — ghost items appear immediately if the key is unstable.

**Detection:** Rapidly click between filter categories. If a card appears in a position briefly then flies away to disappear, the key is wrong.

**Phase affected:** Phase 1 (gallery filtering) and Phase 2 (lightbox).

---

### Pitfall 3: Gallery State Not in URL — Back Button Loses Filter Context

**What goes wrong:** If the active gallery filter category is stored only in React component state, pressing the browser back button destroys the filter selection. The user navigated away to view a lightbox or another page, then pressed back, and lands on "All" instead of "Snow Removal" where they were.

**Why it happens:** Component state is the easy path. URL state requires managing query params.

**Consequences:** Minor UX friction for most users. Matters more if someone shares a link to "the snow removal gallery" — the filter does not persist in the share link.

**Prevention for this project:** Given the audience (a rural Alberta contractor, likely few pages deep analytics), this is LOW severity. A simple approach: use URL search params (`?category=snow-removal`) via Next.js `useSearchParams` and `useRouter`. This is a polish item but worth doing since it is a one-time implementation.
- If URL state is too much for v2.0, at minimum ensure the lightbox can be closed without resetting the filter (do not unmount the gallery component when lightbox opens — use a portal instead).

**Phase affected:** Phase 1 (nice-to-have), Phase 2 (lightbox portal pattern is important for preventing filter reset).

---

### Pitfall 4: Lightbox Shows Blank While Loading Next Image

**What goes wrong:** User opens lightbox on image 1, presses next arrow to see image 2. Image 2 is not preloaded. The lightbox shows a blank area for 1-3 seconds on a mobile connection before image 2 appears.

**Consequences:** Navigation feels broken. User taps multiple times thinking the button did not register.

**Prevention:**
- Preload adjacent images when a lightbox item is displayed: use a hidden `<Image>` with the next and previous `src` values rendered off-screen (or use the browser's `new Image()` preloading API).
- For a static gallery with ≤40 photos, the `priority` technique is impractical for all images. Use the preload-on-display pattern: when image N is shown, preload N+1 and N-1.
- Show a loading spinner or skeleton within the lightbox image area while the next image loads. A simple `opacity-0 → opacity-100` transition on the `<Image>` `onLoadingComplete` callback prevents blank flashes.

**Detection:** Open lightbox on a throttled connection (Network: Slow 3G in DevTools). Tap next arrow. If you see blank space before image appears, preloading is missing.

**Phase affected:** Phase 2 (lightbox).

---

### Pitfall 5: Generic Alt Text Makes Gallery Worthless for SEO and Accessibility

**What goes wrong:** Gallery images get alt text like `"gallery image 1"`, `"project photo"`, or empty `alt=""`. Screen readers announce nothing useful. Search engines receive no image context. Google image search drives real local search traffic for contractors.

**Why it happens:** Alt text feels like a detail. Developers use array index in the data model and never define per-image alt text.

**Consequences:** Accessibility failure (WCAG 1.1.1). Missed local SEO opportunity. "CAT 320 excavator site clearing Red Deer AB" in image alt text drives Google Images traffic for exactly the queries Big Country's prospects use.

**Prevention:**
- Define alt text as a required field in the gallery data model from day one:
  ```typescript
  type GalleryProject = {
    id: string;
    src: string;
    alt: string; // required — describe the equipment, action, and location
    category: 'excavation' | 'snow-removal' | 'site-prep';
    title: string;
  }
  ```
- Provide placeholder alt text during development that follows the pattern: `"[Equipment] [action] at [location/context], Alberta"`.
- For lightbox decorative UI elements (arrows, close button) use `aria-label` instead of alt.

**Phase affected:** Phase 1 (data model definition — must be correct here, expensive to retrofit).

---

## Rebrand Pitfalls

### Pitfall 1: Hardcoded Hex Colors in Every Component File — No Central Token

**What goes wrong:** The codebase uses inline hardcoded hex colors (`bg-[#094026]`, `text-[#FCB215]`, `border-[#FCB215]`) directly in component JSX throughout all 15+ component files. There is no Tailwind color token or CSS variable mapping that `btn-primary`, `section-dark`, etc. use internally — even the utility classes in globals.css hardcode the hex values.

**Confirmed in codebase:** `Hero.tsx`, `Header.tsx`, `globals.css` custom classes, `tailwind.config.ts` — hex values are used directly everywhere.

**Consequences:** Changing the brand color palette for the rebrand requires search-and-replace across every component file. A missed instance results in one element showing the old green in the new industrial theme. This is virtually guaranteed to happen on the first pass.

**Prevention:**
- As part of the rebrand setup step, define the new color palette as Tailwind theme tokens in `tailwind.config.ts` under a semantic name:
  ```typescript
  colors: {
    brand: {
      dark: '#[new-dark-color]',
      mid: '#[new-mid-color]',
      accent: '#[new-accent-color]',
    }
  }
  ```
- Update globals.css CSS custom properties and all utility classes to use the new tokens.
- Then sweeping component changes become `bg-brand-dark` instead of `bg-[#094026]`, and a future color change only touches `tailwind.config.ts`.
- If tokenization is out of scope for v2.0, at minimum do a project-wide search for `#094026`, `#0a5530`, `#063d22`, and `#FCB215` and replace them all in one commit before building new components.

**Detection:** After rebrand, search codebase for `#094026`. Any remaining hit is a missed replacement.

**Warning signs:** One element looking "off-green" while everything else is the new theme.

**Phase affected:** Rebrand phase (must do at project start).

---

### Pitfall 2: Font Mismatch Between Tailwind Config and globals.css

**What goes wrong:** `tailwind.config.ts` extends `fontFamily.sans` with `['Plus Jakarta Sans', 'system-ui', 'sans-serif']`, but `globals.css` sets `font-family: 'Montserrat', system-ui, sans-serif` on `body`. These two definitions conflict. Any element using the Tailwind `font-sans` utility class gets Plus Jakarta Sans, while elements that inherit from `body` get Montserrat. Unless Plus Jakarta Sans is actually installed/loaded (it is not — only Montserrat is loaded via the @import), `font-sans` utilities fall back to system-ui silently.

**Confirmed in codebase:** `tailwind.config.ts` line 26 vs `globals.css` line 39.

**Consequences:** Text that uses `font-sans` (common in Tailwind starter templates) renders in system-ui instead of the intended brand font. The inconsistency is invisible in development (system-ui looks fine) but creates a subtle mixed-font appearance in production.

**Prevention:**
- During rebrand, make a deliberate font decision and align both files.
- Either: load the chosen font via `next/font/google`, set it as a CSS variable, and reference it in both globals.css and tailwind.config.ts.
- Or: remove the `fontFamily.sans` override from tailwind.config.ts if the body-level font-family in globals.css is the intended approach.
- Do not leave both active simultaneously.

**Detection:** Inspect a paragraph element using Tailwind's `font-sans` class in DevTools. If the computed font is "system-ui" instead of the brand font, the conflict is active.

**Phase affected:** Rebrand phase.

---

### Pitfall 3: Stale Brand Comments and Variable Names Cause Confusion

**What goes wrong:** `globals.css` line 9 contains the comment `/* Sergeant Painters Theme - Dark Green & Gold */`. The CSS custom property names (`--primary-dark`, `--primary-mid`) are generic but the comment names a different company. Any developer (or the developer themselves three months later) reading the file is confused about which brand these values belong to.

**Confirmed in codebase:** `abc-roofing/src/app/globals.css` line 9.

**Consequences:** During rebrand, the stale comment leads to uncertainty about which variables have been updated. In a fast-moving rebrand, it is easy to update the variable values but leave the comment naming the wrong company — creating false confidence that the rebrand is complete.

**Prevention:**
- In the first rebrand commit, update the comment to `/* Big Country Landscaping & Maintenance Ltd — Industrial Theme */`.
- Use a grep/search for "Sergeant Painters", "ABC Roofing", "roofing", and "company" across the entire `src/` directory to find all stale references in one pass.
- Do the same for placeholder phone and email: `(555) 123-4567` appears in `Hero.tsx` and likely in `Header.tsx` and `Footer.tsx` — find all before claiming the rebrand is done.

**Detection:** Search for "Sergeant" and "ABC" and "555-123" in the project. Any hit is unreplaced content.

**Phase affected:** Rebrand phase (completion checklist).

---

### Pitfall 4: Select Option Background Color Cannot Be Styled in Most Browsers

**What goes wrong:** `Hero.tsx` styles `<option>` elements with `className="bg-[#094026]"`. This technique works only on Firefox and some desktop Chrome builds — on iOS Safari and most Android browsers, `<option>` elements are rendered by the OS native picker and ignore all CSS styling. When the new industrial theme replaces `#094026` with a different dark color, the option backgrounds will still show the old green on mobile.

**Confirmed in codebase:** Hero.tsx lines 119-124 — `<option value="..." className="bg-[#094026]">`.

**Consequences:** On iOS Safari (the primary demo device), the select options appear in native iOS styling regardless of the class. The `bg-[#094026]` class does nothing on the demo phone. This is not a regression from the rebrand, it is a pre-existing misunderstanding. The rebrand just reveals it as a surface that "does not update."

**Prevention:**
- Accept that native `<select>` on mobile renders in OS styles — do not fight it. Remove the color classes from `<option>` elements.
- If a custom-styled select is needed (to match the industrial theme on desktop), replace `<select>` with a custom dropdown component: a button that toggles a `<ul>` of options, styled with Tailwind. This is a larger effort but the only cross-browser solution.
- For v2.0 scope: remove the `bg-[#094026]` from option elements, accept native mobile rendering.

**Phase affected:** Rebrand phase (quick fix), further polish in v3.

---

### Pitfall 5: OG Image Does Not Exist — Social Shares Show Blank

**What goes wrong:** `layout.tsx` references `/og-image.jpg` in OpenGraph metadata. This file does not exist in `public/`. Any social media share of the site (Facebook, LinkedIn, iMessage URL preview) shows either a blank card or a generic platform placeholder.

**Confirmed in codebase:** Flagged in `CONCERNS.md` as an important gap.

**Consequences:** When the client or their commercial customers share the site link, the preview looks unprofessional. This matters for a contractor where word-of-mouth sharing is a primary referral channel.

**Prevention:**
- Create a 1200x630px branded OG image with the Big Country logo, equipment imagery, and company name. Save as `/public/og-image.jpg`.
- The `Excavator and Snow Plow in Motion Logo.png` is already in the project root — use it as the base.
- Update the metadata in `layout.tsx` to point to the real OG image and correct the domain URL from `https://yourcompany.com`.

**Detection:** Paste the site URL into https://opengraph.xyz (or Facebook Debugger). If no preview image appears, the OG image is missing or the URL is wrong.

**Phase affected:** Rebrand phase (pre-launch checklist).

---

## Lead Generation Pitfalls

### Pitfall 1: Both Quote Forms Are Non-Functional — Leads Are Completely Lost

**What goes wrong:** The Hero quote form (desktop and mobile) has no `onSubmit` handler. The Contact.tsx form uses a fake `setTimeout` to simulate submission. Neither form actually sends data anywhere. A user filling out a quote request gets a "success" message but the business never receives the lead.

**Confirmed in codebase:** `Hero.tsx` lines 95-137 — `<form className="space-y-4">` with no `onSubmit`. `Contact.tsx` — flagged in CONCERNS.md as a fake setTimeout mock.

**Consequences:** This is the highest severity issue in the entire codebase. Every lead generated during the client demo or soft launch is silently discarded. The client will not know this is happening.

**Prevention:**
- Connect the Contact form to a form backend before any real traffic. Recommended for a static Next.js site with no backend: **Formspree** (free tier handles 50 submissions/month, zero infrastructure) or **Resend** (email API, requires a serverless function in the same Next.js project).
- For the hero quick quote form on mobile, the simplest working solution is to redirect to `/contact` on submission rather than attempting to submit inline. This is less friction than it sounds — the user already expressed intent by expanding the form.
- Wire up the desktop hero form to the same backend as the contact form.
- Test submission receipt in the client's email inbox during the demo setup, not after go-live.

**Detection:** Submit the quote form. Check whether any email is received. If no email arrives, the form is broken.

**Phase affected:** Rebrand phase — CRITICAL, must be resolved before any real traffic.

---

### Pitfall 2: Too Many Form Fields Reduce Contractor Lead Conversion

**What goes wrong:** The current hero form has 5 fields: Name, Phone, Email, Service Type, Project Description. The contact page form likely has additional fields. For a contractor site targeting decision-makers at commercial properties (property managers, facility managers), long forms signal friction and reduce completion rates.

**Why it matters:** The target conversion is a phone call, not a form submission. The form's job is to capture enough to start a conversation, not qualify the lead fully.

**Prevention:**
- Hero quick quote form: 3 fields maximum — Name, Phone, Service Type. Strip Email and Project Description from the initial capture.
- Contact page: can have more fields (phone, email, service type, message) since the user has navigated to a dedicated contact page and demonstrated higher intent.
- Add a note under the submit button: "We'll call you within 2 hours to discuss your project." This sets expectation and reduces the need for the user to write a detailed message.

**Phase affected:** Rebrand phase (form redesign).

---

### Pitfall 3: Form Success State Does Not Drive Toward a Phone Call

**What goes wrong:** After a form submission succeeds, the standard pattern is a "Thank you, we'll be in touch" message. For a contractor site where the conversion goal is a phone call, this is a missed opportunity. The user is in the highest intent state they will reach — the success screen should prompt them to call immediately.

**Prevention:**
- The form success state must include: "Thanks [Name] — we'll call you within 2 hours at [phone they entered]. If you prefer to talk now, call us directly: **(587) 555-1234**."
- Display the phone number as a large `<a href="tel:...">` button in the success state.
- On mobile, pressing the phone number from the success state initiates a call immediately — this is the highest-conversion moment on the page.

**Phase affected:** Rebrand phase.

---

### Pitfall 4: Missing Alberta-Specific Trust Signals Lose Commercial Clients

**What goes wrong:** The current trust badges ("Licensed & Insured", "Free Estimates", "Satisfaction Guaranteed") are generic and do not signal compliance with Alberta contractor requirements. Commercial property managers and municipal buyers in Alberta require specific certifications before hiring an excavation or snow removal contractor.

**Why it matters:** "Licensed & Insured" is the minimum. Commercial buyers specifically scan for WCB compliance.

**Prevention:**
- Replace generic trust badges with Alberta-specific signals:
  - "WCB Alberta Covered" (Workers' Compensation Board — required for any commercial/municipal client)
  - "Liability Insured — Certificates on Request"
  - "Alberta Owner-Operator" (differentiates from a broker or aggregator)
- Confirm with client which certifications they actually hold before adding badges — false certifications are a legal liability.
- "Serving [specific regions: Red Deer, Rocky Mountain House, Olds, Innisfail]" beats "Serving the Greater Area" — local specificity builds trust in rural Alberta markets.

**Phase affected:** Rebrand phase (content).

---

### Pitfall 5: Phone Number in Header Not Formatted for Tap-to-Call

**What goes wrong:** If the phone number in the header, hero, and footer is rendered as plain text or in a `<Link href="/contact">` instead of `<a href="tel:5875551234">`, tapping it on mobile does not initiate a call. The user has to manually copy and dial. Many users will not do this — they navigate away instead.

**Confirmed in codebase:** Hero.tsx line 56 — `<a href="tel:5551234567">` format is used correctly in the existing hero. However, the number `(555) 123-4567` is a placeholder and must be replaced with the real number before go-live. Any file that has the phone as static text (not a `tel:` link) is a missed conversion.

**Prevention:**
- Search all components for the phone number. Every instance must be an `<a href="tel:[digits only]">` element. No spaces, no dashes in the href value.
- The sticky header CTA with the phone number must use `href="tel:"` — this is the highest-traffic tap target on mobile.
- Format display as `(587) 555-1234` for readability but href as `tel:5875551234`.

**Detection:** On Chrome mobile simulator, tap the phone number in the header. If a dialer doesn't open, the link is wrong.

**Phase affected:** Rebrand phase.

---

## Seasonal Content Pitfalls

### Pitfall 1: Hardcoded Seasonal Bar Message Will Be Wrong Within Weeks

**What goes wrong:** The planned seasonal announcement bar ("Now Booking Spring Excavation") is baked into the component as a static string. In Alberta, the seasons are clear-cut: excavation runs May-October, snow removal runs November-April. If the bar is not updated when the season changes, a commercial property manager arriving in November to book snow removal plowing sees "Now Booking Spring Excavation" — this actively destroys trust and signals the site is abandoned.

**Why it happens:** Developer hardcodes the string for the initial build and there is no mechanism to update it without a code change and deployment.

**Consequences:** Wrong seasonal message = site looks neglected. For a weather-dependent contractor, being out of season by even a few weeks sends the message that the business is not paying attention.

**Prevention:**
- Extract the seasonal bar message to a single constants file: `src/data/seasonal.ts` with `message`, `isVisible`, and an optional `activeUntil` date:
  ```typescript
  export const seasonal = {
    isVisible: true,
    message: "Now Booking Spring Excavation — Call for Availability",
    highlightWord: "Spring Excavation",
    activeService: "excavation" as const,
  };
  ```
- This does not require a CMS — a developer can update this one file and redeploy in under 2 minutes.
- Document the maintenance expectation for the client: "This one file needs updating twice a year — we can handle it or you can request it."

**Phase affected:** Rebrand phase (must be in a maintainable structure from the start).

---

### Pitfall 2: Seasonal Bar Shown With No Destination Page Frustrates Users

**What goes wrong:** A seasonal announcement bar that says "Now Booking Spring Excavation" without linking anywhere leaves the user wondering what to do. They want to act on the announcement. If it is purely decorative text, users tap it expecting navigation and get nothing.

**Prevention:**
- The seasonal bar must function as a clickable CTA, linking to either `/contact` with a pre-filled service type query parameter, or to the Excavation services section anchor (`/services#excavation`).
- Use `?service=excavation` as a query param on the contact link so the form pre-selects the Excavation service type — this reduces form friction for seasonal inquiries.
- If no destination exists, remove the bar from the v2.0 implementation until a landing destination is ready. A bar that goes nowhere is worse than no bar.

**Phase affected:** Rebrand phase.

---

### Pitfall 3: Seasonal Bar Conflicts With the Demo if Not Updated First

**What goes wrong:** The client demo is currently scheduled for March 2026 — end of winter, shoulder season in Alberta before excavation season opens. If the bar says "Now Booking Snow Removal" during a March demo, the message is slightly stale. If it says "Now Booking Spring Excavation" before the client's excavation bookings are actually open, it may be premature.

**Prevention:**
- Set the seasonal bar to an always-accurate fallback for the demo: "Big Country Landscaping & Maintenance — Excavation & Snow Removal" with a "Get a Quote" CTA link. This is seasonally neutral and accurate at all times.
- Save the seasonal-specific messaging for after the demo, once the client confirms their booking windows.
- Mark the seasonal bar constants file in the README with a note: "Update this message every April and October."

**Phase affected:** Rebrand phase (demo preparation).

---

## Summary

The following 7 pitfalls are the highest priority warnings for this project, ordered by risk severity:

**1. Both quote forms are non-functional — leads are silently lost (CRITICAL)**
The hero form has no onSubmit handler. The contact form uses a fake setTimeout. Every form submission during soft launch or client demo discards the lead entirely. This must be resolved — connect to Formspree or equivalent — before the site is shown to anyone who is not the developer. Confirmed in codebase.

**2. Lightbox has no swipe gestures — the client demo will feel broken on a phone (CRITICAL for demo)**
The entire project is positioned as "demo on a phone." The roadmap specifies only keyboard navigation for the lightbox. On mobile, users expect swipe-left/swipe-right. A lightbox that ignores swipes on the demo device undermines confidence in the entire project.

**3. Hardcoded hex colors across all components — rebrand requires search-replace across 15+ files (HIGH)**
`#094026` and `#FCB215` appear hardcoded in every component. Changing the palette is a grep-and-replace operation with near-certain missed instances on first pass. Establish Tailwind color tokens before building any new Big Country components, or accept that a second cleanup pass will be required.

**4. No next/image usage — real photos will break performance (HIGH)**
The current codebase has no image optimization. When contractor photos are added, without next/image they load at full resolution with no lazy loading. The hero background image especially must use `priority` to hit LCP targets. This must be the first thing implemented when adding any real image.

**5. Google Fonts @import is render-blocking — first paint is delayed (HIGH)**
`globals.css` line 1 imports Montserrat via CSS @import. This is a render-blocking request on every page load. Migration to `next/font/google` eliminates the external request. Should be done in the same commit as the rebrand color/font decisions.

**6. Seasonal bar must be in a constants file — hardcoded string will be wrong twice a year (MEDIUM)**
The seasonal announcement bar string must live in a single file (`src/data/seasonal.ts`) from day one. Alberta excavation and snow removal seasons are binary flips. A hardcoded string becomes wrong in April and wrong again in October. The bar also needs a link destination or it should be removed.

**7. Gallery CLS — missing aspect-ratio containers cause layout shifts during image load (MEDIUM)**
Gallery card images without `aspect-[4/3]` containers cause visible layout shifts on mobile connections as images progressively load. Use `<div className="relative aspect-[4/3]"><Image fill className="object-cover" /></div>` consistently across all gallery cards. This must be in the initial gallery implementation or retrofitting is painful.

---

## Sources

- Direct codebase inspection: `abc-roofing/src/components/Hero.tsx`, `src/app/globals.css`, `tailwind.config.ts`, `next.config.mjs`
- Existing technical debt documentation: `.planning/codebase/CONCERNS.md` (confirmed Hero form issue, Contact.tsx mock, missing OG image)
- Next.js official documentation on Image Optimization, priority prop, and font loading (verified via knowledge base, Next.js 14 stable — confirmed patterns are current)
- WCAG 2.1 Level AA: Success Criterion 2.1.1 (keyboard), 1.4.3 (contrast), 1.1.1 (alt text), Modal Dialog pattern
- Alberta contractor market context: WCB requirement for commercial work is codified in the Alberta Workers' Compensation Act — all commercial contractors hiring workers must have WCB coverage; commercial buyers require certificate of clearance before awarding contracts
- Web Vitals thresholds: LCP good < 2.5s, needs improvement 2.5s-4s, poor > 4s. CLS good < 0.1. Source: web.dev/vitals (Google official, stable thresholds since 2021)
- iOS Safari `overflow: hidden` body scroll behavior: known limitation, documented in WebKit bug tracker and MDN compatibility notes
- Framer Motion `useReducedMotion` hook: available since framer-motion v4.0 (confidence: HIGH based on official Framer docs pattern)
