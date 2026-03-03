# Features Research: Contractor Website (Excavation + Snow Removal)

**Domain:** Heavy equipment contractor — excavation + commercial snow removal
**Target audience:** Commercial property owners, developers, municipalities, property managers
**Goal:** Lead generation via phone call and quote request
**Location:** Alberta, Canada (rural/agricultural — "Big Country" region)
**Researched:** 2026-03-03
**Confidence:** MEDIUM — based on domain knowledge of B2B contractor conversion patterns and Alberta trade industry context; WebFetch unavailable during research session

---

## Table Stakes

Features every contractor website must have. Missing = prospect leaves or doesn't trust the business enough to call.

### Identity & Trust Signals

| Feature | Why Required | Complexity | Notes |
|---------|-------------|------------|-------|
| Prominent phone number | Primary conversion action; commercial clients call first | Low | Must be click-to-call on mobile; place in header, hero, and footer |
| Company name and logo | Brand recognition; confirms they landed on the right site | Low | Already designed — SVG/PNG logo exists |
| Physical service area / region | Confirms you serve their location before they waste time | Low | "Serving the Big Country region — Alberta" — no map required |
| Years in business / founded | Longevity = stability; commercial clients avoid brand-new operators | Low | If applicable, include in About section |
| Clear service listing | Visitors must understand what you do within seconds | Low | Two distinct services: Excavation and Snow Removal |

### Contact & Lead Capture

| Feature | Why Required | Complexity | Notes |
|---------|-------------|------------|-------|
| Contact form | Async lead capture for after-hours or detail-heavy requests | Low | Short form: name, phone, service type, message — no more than 5 fields |
| Phone number click-to-call | Mobile primary action; must work without friction | Low | `tel:` link, visually prominent |
| Email address | Secondary contact; some commercial clients prefer paper trail | Low | Listed in footer and contact page |
| Clear CTA on every section | Removes friction — prospect never hunts for how to reach you | Low | "Get a Quote", "Call Now", "Request a Quote" — consistent language |

### Proof & Credibility

| Feature | Why Required | Complexity | Notes |
|---------|-------------|------------|-------|
| Portfolio / work photos | Visual proof of capability; the single biggest trust signal for equipment contractors | Medium | The planned filterable gallery directly addresses this |
| Testimonials / reviews | Social proof; reduces risk perception for new clients | Low | 3-5 quotes with names; even better if company names included |
| Insurance and WCB status | Commercial clients and municipalities will not hire without confirmed coverage | Low | "Fully insured — WCB compliant" statement with certificate on request |
| Business license / registration | Alberta commercial clients expect this, especially municipalities | Low | Mention in footer or about page |

### Navigation & Structure

| Feature | Why Required | Complexity | Notes |
|---------|-------------|------------|-------|
| Clear top navigation | Visitors need to find services, gallery, and contact without confusion | Low | Max 5-6 items; Gallery should be in nav |
| Mobile hamburger menu | Mobile traffic from jobsite managers and property managers is high | Low | Already exists in template |
| Sticky header with CTA | Phone number + "Get a Quote" always reachable without scrolling back | Low | Already planned for v2.0 |
| Footer with all contact info | Standard trust signal; where people look when they've decided to call | Low | Phone, email, service area, copyright |

---

## Differentiators

Features that separate a great contractor website from a generic one. These are what make a prospect say "this company knows what they're doing."

### Equipment Roster (HIGH impact)

**Why it differentiates:** Commercial clients — especially developers and municipalities — need confidence that you have the right machines for their scope. A company that shows its fleet signals capacity, investment, and professionalism. Most small contractors do not do this.

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| Equipment roster section | Shows fleet capacity; builds immediate credibility with commercial clients | Medium | Planned for v2.0. Photos + machine name/type are sufficient; specs optional but valuable |
| Equipment type per service | Links machines to tasks ("Cat 320 excavator for trenching and demolition") | Low | Short caption under each machine photo |
| Fleet size / count | Signals scale — "7-machine fleet" outcompetes one-truck operators without saying it | Low | Can be a single line in the About section |

### Photography Quality (HIGH impact)

**Why it differentiates:** Stock photos destroy trust for equipment-heavy businesses. Real equipment at real job sites is irreplaceable. One great action shot of a Cat excavator moving earth is worth more than a paragraph of copy.

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| Real equipment photos | Immediate authenticity; replaces abstract claims with visible proof | Low (once photos exist) | Client providing real photos is critical; plan slots ready now |
| Job-in-progress / action shots | Shows machines working, not just parked — conveys active, capable operation | Low | Hero section should be action shot background |
| Before/after project pairs | Demonstrates transformation — powerful for site prep and snow removal | Medium | Planned as v2 feature in REQUIREMENTS.md; defer is fine |
| Crew/people photos | Humanizes the business; reduces "faceless company" feeling | Low | Even one team photo in the About section helps |

### Seasonal Messaging (HIGH impact for this business)

**Why it differentiates:** Excavation and snow removal are seasonal by nature. Announcing booking availability creates urgency and tells clients you're organized. Very few contractors do this.

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| Seasonal announcement bar | "Now Booking Spring Excavation — Limited Slots" creates urgency and surfaces availability | Low | Planned for v2.0. Toggle-ready in code so message can change by season |
| Seasonal service framing | Separate summer/winter messaging prevents confusion about off-season capacity | Low | Services page should note seasonal availability for each service |
| Booking window language | "Book early — spring 2026 slots filling fast" is specific and credible | Low | Copy-level decision; no new components needed |

### Commercial-Specific Messaging

**Why it differentiates:** Most contractor sites use residential-default language. Switching to commercial-first language ("property managers," "contractors," "municipalities") pre-qualifies leads and signals appropriate experience.

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| Commercial service description | Language like "commercial lot clearing" vs "we plow snow" signals the right scale | Low | Copy decision in Services section |
| Project scale signals | Mentioning project scales ("cleared 5-acre industrial site") attracts right-fit clients | Low | Gallery captions and testimonials can carry this |
| Municipality / institutional references | If any municipal contracts have been held, this is your strongest social proof | Low | Even "municipal-approved" language adds weight |

### Filterable Portfolio Gallery (MEDIUM-HIGH impact)

**Why it differentiates:** A single "gallery" page with mixed work is harder to use than one that lets an excavation prospect filter to excavation work only. Already planned — the filter mechanism is the differentiator, not just having photos.

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| Category filters | Excavation / Snow Removal / Site Prep — lets the right prospect see the right work | Medium | Already planned in REQUIREMENTS.md |
| Project captions | Brief caption per photo: location type, scope, outcome | Low | Easy to add during content phase |
| Homepage gallery preview | "See Our Work" teaser on homepage funnels engaged prospects to full gallery | Low | Already planned in REQUIREMENTS.md |

### Geographic Anchoring

**Why it differentiates:** Rural Alberta clients prefer local contractors for reliability (proximity matters in winter), and "Big Country" as a regional identity is a trust signal to area clients.

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| Region-specific language | "Big Country region," "Drumheller / Hanna area" in copy | Low | Copy-level; no new components |
| Service radius statement | "Serving within X km of [town]" removes guesswork | Low | One line in hero or contact page |
| Local landmarks / clients | Referencing recognizable local projects or areas (if client permits) | Low | In testimonials or gallery captions |

---

## Anti-Features

Things to deliberately NOT include. These hurt conversion or trust for this type of business.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Stock photos of equipment | Destroys authenticity immediately — commercial clients recognize it | Use real equipment photos; hold placeholders until client delivers photos |
| Residential-tone language | "Your yard," "home improvement," "property beautiful" repels commercial clients | Use "your site," "your property," "your operation" — commercial framing |
| Long contact forms | Every extra field is a conversion drop; commercial clients are busy | Name, phone, service type, short message — 4-5 fields maximum |
| Online pricing / instant quotes | Heavy equipment work cannot be accurately priced online; false precision destroys trust | "Contact for a free quote" — the call IS the quote process |
| Chatbot / live chat widget | Off-brand for a trade contractor; industrial clients find it informal | Phone number and contact form are the right channels |
| Countdown timers or fake urgency | "Only 2 slots left!" is perceived as used-car tactics for commercial clients | Use real seasonal booking language instead |
| Cluttered hero with too many CTAs | Decision paralysis; commercial clients want one clear next step | Single hero CTA: phone number + "Get a Quote" |
| Auto-playing video or audio | Destroys mobile experience, slow load, presumptuous for a first visit | Photo backgrounds; video is v3+ if client wants it |
| Popups on page load | Interrupts the visual trust-building phase before the client has formed intent | No popups; CTA bar and sticky header carry the CTAs |
| Blog with generic SEO content | Thin content is visible and signals low investment | No blog unless client has genuine expertise content to share |
| Social media feeds embedded | Feed shows inactivity if client doesn't post regularly; often outdated | Link to social profiles in footer only; don't embed feeds |
| Testimonials without attribution | "John S." style fake-seeming reviews are worse than none | Use real names and company/role if available; full name is better |
| Residential testimonials only | "They cleared my backyard beautifully" signals wrong market | Feature commercial, developer, or property manager testimonials first |
| "Landscaping" as primary identity | The word "landscaping" in the name creates confusion with lawn care | Lead with Excavation and Snow Removal; landscaping is secondary in all headings |

---

## Excavation-Specific

What excavation clients — developers, general contractors, commercial property owners — need to see before picking up the phone.

### What They're Evaluating

Excavation clients are assessing three things before calling:
1. **Can you do the scope?** (equipment capacity and project type history)
2. **Are you safe and compliant?** (WCB, insurance, utility locate policy)
3. **Are you available when I need you?** (scheduling, response to inquiry)

### Features That Answer These Questions

| Feature | Why It Matters | How to Implement |
|---------|---------------|-----------------|
| Equipment roster with machine types | Developers pre-qualify by machine class (mini vs full-size excavator, wheel loader vs dozer) | Equipment Roster section — machine name, photo, primary use case |
| Service type breakdown | "Site clearing," "grading," "trenching," "demolition" are distinct contracts — list them separately | Services page with subservice bullets or cards |
| WCB and insurance statement | Alberta construction sites require proof before you set foot on site | One-line statement: "Fully insured and WCB compliant — certificates available on request" |
| Alberta One-Call compliance | Utility locate before digging is legal requirement — mentioning it signals professionalism | "We contact Alberta One-Call before every dig" in service description |
| Project scale examples | "Large site? We've done it" vs "backyard hobby jobs" — signals right tier | Gallery captions, testimonials with project scale notes |
| Response to quote request | Commercial excavation clients expect a callback within 24hrs | "We respond to all quote requests within 1 business day" — sets expectation |
| Seasonal availability window | Excavation season in Alberta is April-November roughly; stating this prevents wasted inquiries | Seasonal bar + "Now Booking" messaging |
| Demolition services (if offered) | Often searched separately — can be a standalone revenue stream for this type of fleet | Include "demolition and removal" explicitly if offered |

### What to Say About Excavation Services (Copy Guidance)

- Use the word "commercial" prominently — it pre-qualifies
- Name specific project types: site clearing, rough grading, utility trenching, frost-work, demolition
- Mention terrain type expertise if relevant — "dry prairie conditions," "clay-heavy soils"
- Avoid "we do everything" language — specificity builds trust more than breadth claims

---

## Snow Removal-Specific

What commercial snow removal clients — property managers, building owners, retail operators, municipalities — need to see before signing a seasonal contract.

### What They're Evaluating

Commercial snow removal is not a commodity purchase. Clients are signing a seasonal contract worth thousands of dollars. They are evaluating:
1. **Reliability** — Will you show up during a storm at 3am?
2. **Capacity** — Do you have enough equipment to clear my lot before business opens?
3. **Terms** — Seasonal contract vs per-push? What's covered?

### Features That Answer These Questions

| Feature | Why It Matters | How to Implement |
|---------|---------------|-----------------|
| Response time commitment | The #1 question commercial clients ask: "How fast will you get here in a storm?" | State a specific window: "On-site within X hours of snowfall trigger" |
| Seasonal contract framing | Commercial clients want the certainty of a seasonal agreement, not ad-hoc pricing | Mention "seasonal contracts" explicitly in Snow Removal service description |
| Trigger depth statement | "We mobilize at 5cm accumulation" is specific and credible | Service description or FAQ |
| 24/7 availability | Commercial lots must be clear before business opens — early morning service is expected | "24/7 storm response" — simple, prominent |
| Equipment type for snow | Loader vs truck plow vs skid steer — different equipment for different lot sizes | Equipment roster: note which machines do snow removal |
| Salting / de-icing services | High-margin add-on; commercial lots with liability exposure specifically want this | List separately: "salting and de-icing" in Snow Removal service |
| Snow hauling capability | Small lots in commercial areas fill up — hauling is a differentiator vs just pushing | Mention if offered: "Snow hauling and relocation available" |
| Service area for winter | Some contractors scale back in extreme rural distances during storms | Map or text statement of winter service radius |
| Existing commercial clients | "We currently service X commercial properties in the region" is social proof | Testimonials from property managers, strip mall operators |
| Lot clearing photos | Before-dawn photos of freshly cleared lots are compelling — this is hard to fake | Snow removal gallery category with real lot-clearing photos |

### Seasonal Urgency Window

Commercial snow removal contracts are typically signed in September-October in Alberta. After November, lot owners have usually committed. This creates a natural CTA window:

- **August-September:** "Now accepting snow removal contracts for 2026-27 season"
- **October:** "Limited slots remaining — book your commercial snow removal contract"
- **November-March:** "Currently serving contracted properties — inquire for next season"
- **April-July:** Feature excavation; note snow removal booking opens in fall

The seasonal announcement bar should reflect this cycle — it is a genuine conversion tool for this business, not just decoration.

---

## Mobile Considerations

Commercial clients — property managers, project managers, site superintendents — frequently search on mobile during site visits or while commuting. This is not a desktop-primary audience.

### Critical Mobile Features

| Feature | Why Critical | Implementation |
|---------|-------------|----------------|
| Click-to-call as primary CTA | Most commercial initial contacts happen by phone; one tap should dial | `<a href="tel:+1XXXXXXXXXX">` with visually prominent button |
| Sticky header with phone | Scrolling down a photo-heavy page, CTA must always be reachable | Already planned: sticky header with phone number |
| Short contact form | Filling out a long form on mobile is abandonment-triggering | 4 fields max; name, phone, service type, message |
| Fast image loading | 4G rural connections are common in Alberta's Big Country region | next/image with proper sizing; blur placeholders |
| 48px minimum touch targets | Nav items, buttons, filter buttons must be tappable without precision | Tailwind: `min-h-[48px]` on all interactive elements |
| Swipeable gallery | Mobile gallery interaction should feel native | Lightbox should support touch swipe for prev/next |
| No hover-only interactions | Mobile has no hover — any hover-triggered content is invisible | Ensure all gallery captions, equipment details visible without hover |
| Readable text without zooming | Prospects should not need to pinch-zoom any content | Minimum 16px body text; section headings larger |
| Minimal modal friction | Lightbox close button must be large and top-right positioned | Large X button; tap-outside-to-close support |

### Mobile Conversion Priority Order

On mobile, a prospect follows this pattern:
1. Sees hero image + business name — **"Is this the right kind of company?"**
2. Scans services briefly — **"Do they do what I need?"**
3. Looks for social proof (photos, reviews) — **"Are they real and good?"**
4. Wants to call or send a message — **"How do I reach them?"**

Every section should facilitate this flow. Nothing should interrupt it. The sticky header phone number catches step 4 at any point.

---

## Summary

- **Phone number is the primary conversion mechanism.** Every other feature exists to build enough trust that the prospect picks up the phone or submits a form. The sticky header phone + "Get a Quote" CTA is the most important single element on the site.

- **Real photos outrank everything else for equipment contractors.** Stock photos actively destroy trust. The photo-heavy "Heavy Iron" design concept is correct — but it only works with real equipment and job site photos. Photo slots must be ready before client photos arrive.

- **Equipment Roster is a genuine differentiator.** Most small contractors do not show their fleet. Commercial developers and property managers specifically want to know what equipment you run. This section builds credibility that no amount of copy can replicate.

- **Excavation and snow removal need separate, commercial-framed messaging.** "We do landscaping and snow" is residential language. "Commercial excavation and seasonal snow removal contracts" is commercial language. The copy distinctions matter more than the design.

- **The seasonal announcement bar is a real conversion tool.** Snow removal contracts are signed in a narrow fall window; excavation booking surges in spring. A togglable message that reflects current booking status creates genuine urgency without feeling artificial.

- **Commercial snow removal clients are buying reliability, not price.** Response time commitments, 24/7 availability statements, and seasonal contract language are what differentiate a serious commercial operator from a residential-tier competitor. These claims must appear explicitly on the site.

- **Anti-features carry equal weight to features.** Online pricing tools, popups, chatbots, and residential-framed language actively reduce conversion for this audience. The design direction (bold, dark, industrial) is correct — the content must match the same register.

---

*Research confidence: MEDIUM — based on B2B contractor conversion domain knowledge, Alberta trade industry context, and commercial property management procurement patterns. WebFetch unavailable during this session; findings align with established contractor marketing best practices but are not live-verified against 2026 sources.*
