# SIGNAASAT — Fix Checklist v3.0

## 🔴 Critical (Functional / Accessibility)
- [x] 1. Cursor tracking — switched from left/top to RAF + transform, GPU-accelerated, smooth lag ring
- [x] 2. Body copy contrast — replaced opacity-based text2/text3 with solid color values (WCAG AA compliant)
- [x] 3. CTA hierarchy — Primary (filled+glow) vs Ghost (border+icon), clear visual weight difference
- [x] 4. Light mode card depth — added box-shadow at rest and on hover for card elevation
- [x] 5. Theme persistence — localStorage saves/restores theme across all pages

## 🟠 Hierarchy & Typography
- [x] 6. 3-tier H2 scale — t-hero (96px), t-big (64px), t-section (48px) — sections use appropriate tier
- [x] 7. Section weight variation — Big idea sections (Shift, Why, CTA) use t-big; feature sections use t-section
- [x] 8. Letter spacing locked — hero: -0.046em, t-big: -0.038em, t-section: -0.032em, body: -0.006em
- [x] 9. Vertical rhythm — label → H2 → body → content spacing is consistent across all sections

## 🟡 Layout & Structure
- [x] 10. Horizontal gutter locked — --gutter: 52px desktop, 40px mid, 24px mobile (one source of truth)
- [x] 11. Section order improved — Shift → Stack → Healthcare → AdTech → AI → OS → Metrics → Global → Why
- [x] 12. OS dashboard alignment — align-items: stretch, dashboard fills full column height
- [x] 13. 2nd ticker replaced — metrics strip with 4 large stats (50+ Hospitals, 34% Conversion, 24/7, 5 Regions)
- [x] 14. 24/7 AI card spans full row width (col-span-3 on wide card)
- [x] 15. The Shift unify-box — bigger type, more padding, more visual presence
- [x] 16. Hero visual — dashboard card with wave chart + floating metric cards (inspired by reference image)

## 🟢 Navigation & Interaction
- [x] 17. Nav scroll-spy — active link updates as you scroll through sections (index.html only)
- [x] 18. Nav link hover — 2px accent underline slides in on hover and on active state
- [x] 19. Stack layer icon resting — text3 (visible but muted), transitions to accent on hover
- [x] 20. Logo SVG — custom signal-wave mark in header and footer across all pages

## 📱 Responsive
- [x] 21. 3 breakpoints — 1200px (gutter reduces), 900px (mobile layout), 600px (tight mobile)
- [x] 22. Mobile nav — links hidden, CTA preserved, hamburger-ready
- [x] 23. Hero diagram — collapses to 3-col on tablet, scroll-safe
- [x] 24. Metrics strip — 4-col → 2-col → 1-col

## 📄 New Pages
- [x] 25. Contact page — form + contact info + locations
- [x] 26. Blog listing — grid with category filters, 6 posts
- [x] 27. Blog detail — full article layout with sidebar
- [x] 28. Legal pages — T&C, Privacy Policy, Cookie Policy, Disclaimer (tabbed)

## 🏗 Code Quality
- [x] 29. Shared CSS (shared.css) — single source of truth for all design tokens and components
- [x] 30. Shared JS (script.js) — cursor, nav, theme, reveal, ticker, scroll-spy all modular
- [x] 31. Font smoothing — -webkit-font-smoothing: antialiased across all pages
- [x] 32. Ticker loop — JS clones the track for true seamless infinite scroll
- [x] 33. Scroll reveal — IntersectionObserver unobserves after reveal (performance)
