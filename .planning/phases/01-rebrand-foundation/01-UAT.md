---
status: testing
phase: 01-rebrand-foundation
source: [01-01-SUMMARY.md, 01-02-SUMMARY.md, 01-03-SUMMARY.md]
started: 2026-03-04T00:00:00Z
updated: 2026-03-04T00:00:00Z
---

## Current Test

number: 1
name: Seasonal Bar on Fresh Load
expected: |
  Open http://localhost:3000 with sessionStorage cleared (F12 → Application → sessionStorage → Clear All, then refresh).
  An amber/orange bar should appear above the nav at the very top of the page showing a spring booking message.
  The bar has an X button on the right side.
awaiting: user response

## Tests

### 1. Seasonal Bar on Fresh Load
expected: Amber bar with spring booking message appears at very top of page above nav, with an X close button
result: [pending]

### 2. Seasonal Bar Dismisses
expected: Click the X on the seasonal bar — it disappears. Navigate to another page (e.g. /about) and come back — bar stays gone for the session
result: [pending]

### 3. Header Branding
expected: Logo (excavator/snow plow icon) in top-left. "Big Country Landscaping" company name beside it. Phone number (587) 555-1234 visible in header. "Get a Quote" button on the right
result: [pending]

### 4. Hero Headline and Content
expected: Big dark hero section at top of homepage. Headline reads "Big Country Work." with "Professional Results." below it in amber/orange. Badges/stats visible (WCB Alberta, 15+ Years, 24/7 Snow Response, etc.)
result: [pending]

### 5. Hero Form Submit State
expected: Fill in any field in the quote form on the homepage and hit submit. A spinner/loading state appears briefly (~800ms), then the form area shows a success message with "Request Received"
result: [pending]

### 6. Services Section on Homepage
expected: Services preview section on homepage shows exactly 2 service cards: "Excavation" and "Snow Removal" — NOT generic roofing or residential services
result: [pending]

### 7. Why Choose Us / Trust Signals
expected: A "Why Choose Us" type section on homepage lists trust reasons including WCB Alberta and Alberta One-Call as the first reasons
result: [pending]

### 8. Testimonials Preview on Homepage
expected: Testimonials section on homepage shows commercial client names — Dave K. (Strathmore Commercial Properties), Rob M. (Prairie Build Ltd.), Carla B. (Drumheller Mall), Tyler J. (Foothills Land Corp). NOT "John & Sarah M." or homeowner names
result: [pending]

### 9. Footer Branding
expected: Footer shows the logo, full company name "Big Country Landscaping & Maintenance Ltd", phone (587) 555-1234, email info@bigcountrylandscaping.ca, and lists Excavation and Snow Removal services. Says "Serving Big Country region, Alberta"
result: [pending]

### 10. Services Page
expected: Visiting /services shows page titled "Our Services" with two tabs or sections: Excavation and Snow Removal (not roofing, residential, etc.)
result: [pending]

### 11. Contact Form Submit State
expected: Visit /contact, fill in the form fields and submit. A spinner appears briefly (~1 second), then the form shows a "Request Received" success state
result: [pending]

### 12. Reviews Page Brand Colors
expected: Visit /reviews — the full testimonials page uses dark steel/amber colors (NOT dark green). Stars are amber/orange. Testimonials from Dave K., Rob M., Carla B., Tyler J.
result: [pending]

## Summary

total: 12
passed: 0
issues: 0
pending: 12
skipped: 0

## Gaps

[none yet]
