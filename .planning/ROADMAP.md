# Roadmap: Gallery Feature -- Contractor Website

## Overview

This roadmap delivers a gallery/portfolio page for the existing contractor website in three phases. Phase 1 builds the browsable gallery with responsive grid, filtering, and animations. Phase 2 adds interactive viewing through a lightbox modal and before/after comparison. Phase 3 wires the gallery into the existing site navigation and homepage, then hardens accessibility and mobile interactions across all gallery components.

## Phases

- [ ] **Phase 1: Browsable Gallery** - Responsive gallery page with filterable project grid and animated transitions
- [ ] **Phase 2: Interactive Viewing** - Lightbox modal with keyboard navigation and before/after comparison
- [ ] **Phase 3: Site Integration & Accessibility** - Navigation links, homepage preview, and accessibility/mobile hardening

## Phase Details

### Phase 1: Browsable Gallery
**Goal**: Visitors can browse the full portfolio organized by category on a dedicated gallery page
**Depends on**: Nothing (first phase -- installs framer-motion and lucide-react dependencies)
**Requirements**: GALL-01, GALL-02, GALL-03, GALL-04, GALL-05, INTR-04
**Success Criteria** (what must be TRUE):
  1. Visitor sees a gallery page at /gallery with a hero section matching the site's dark green and gold theme
  2. Project cards display in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop) with placeholder colored backgrounds and category icons
  3. Visitor can click category filter buttons and the grid animates smoothly to show only matching projects
  4. When a filter yields no results, the visitor sees a clear empty state message
  5. Grid transitions and card appearances use Framer Motion fade/scale/layout animations
**Plans**: TBD

Plans:
- [ ] 01-01: Dependencies, data model, and gallery page scaffold
- [ ] 01-02: Project cards, category filters, and Framer Motion animations

### Phase 2: Interactive Viewing
**Goal**: Visitors can view project details in an immersive lightbox and compare before/after for applicable projects
**Depends on**: Phase 1
**Requirements**: INTR-01, INTR-02, INTR-03
**Success Criteria** (what must be TRUE):
  1. Visitor can click any project card to open a lightbox modal showing enlarged project details
  2. Visitor can navigate between projects in the lightbox using left/right arrow keys and close with ESC
  3. For projects with before/after data, visitor can compare both views within the lightbox
**Plans**: TBD

Plans:
- [ ] 02-01: Lightbox modal with keyboard navigation and before/after comparison

### Phase 3: Site Integration & Accessibility
**Goal**: Gallery is discoverable from anywhere on the site and meets accessibility and mobile performance standards
**Depends on**: Phase 2
**Requirements**: INTG-01, INTG-02, ACCS-01, ACCS-02, ACCS-03
**Success Criteria** (what must be TRUE):
  1. Gallery link appears in the Header navigation on both desktop and mobile menu
  2. Homepage displays a featured projects preview section with a link to the full gallery
  3. All gallery and lightbox elements have proper ARIA labels and focus management; entire gallery is keyboard-navigable
  4. Touch targets are at least 48px, touch-manipulation is applied, and animations respect prefers-reduced-motion
**Plans**: TBD

Plans:
- [ ] 03-01: Header nav link, homepage GalleryPreview component
- [ ] 03-02: Accessibility audit and mobile optimization pass

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Browsable Gallery | 0/2 | Not started | - |
| 2. Interactive Viewing | 0/1 | Not started | - |
| 3. Site Integration & Accessibility | 0/2 | Not started | - |
