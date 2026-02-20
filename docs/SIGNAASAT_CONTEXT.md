# SIGNAASAT — Project Context for Claude Code

## What This Project Is
A multi-page static HTML website for **SIGNAASAT** — a healthcare acquisition & AI infrastructure company. No frameworks, no build tools. Pure HTML + CSS + JS.

---

## File Structure
```
signaasat/
├── index.html          # Main landing page
├── contact.html        # Contact form + office locations
├── blog.html           # Blog listing with category filters
├── blog-detail.html    # Full article layout with sidebar
├── legal.html          # T&C, Privacy, Cookies, Disclaimer, Refund (tabbed)
├── shared.css          # ALL design tokens, components, layout — single source of truth
└── script.js           # All JS: cursor, nav scroll-spy, theme toggle, reveal, ticker
```

---

## Design System

### Theme
- **Dark default:** `--bg: #07070f`, `--bg2: #0c0c18`, `--bg3: #111122`
- **Light mode:** toggled via `data-theme="light"` on `<html>`, persisted in `localStorage`
- **Accent:** `--accent: #7b6ef6` (purple), `--teal: #4fcce8`, `--green: #3dd68c`
- **Font:** System font stack → `-apple-system, BlinkMacSystemFont, 'SF Pro Display'`
- **Smoothing:** `-webkit-font-smoothing: antialiased` on body

### Typography Scale (3 tiers — don't collapse these)
```css
.t-hero    /* 96px max — hero only */
.t-big     /* 62px max — big idea sections: Shift, Why, CTA */
.t-section /* 44px max — standard section headings */
.t-card    /* 19px — card titles */
.t-body    /* 15.5px — body copy, color: var(--text2) */
.t-sm      /* 13.5px — small body */
.t-label   /* 11px uppercase — section eyebrows */
```

### Key CSS Variables
```css
--max-w: 1200px
--gutter: 52px  /* locked — use container class, never hardcode padding */
--nav-h: 64px
--tr: 0.28s ease
--tr-fast: 0.14s ease
--surface / --surface2       /* card backgrounds */
--border / --border2         /* borders */
--text / --text2 / --text3   /* text hierarchy — solid colors, not opacity */
--accent-soft / --accent-glow
--card-shadow / --card-hshadow
```

### Layout Classes
```css
.container          /* max-width + gutter padding */
.section            /* 120px vertical padding */
.section-alt        /* 120px + bg2 background */
.section-sm         /* 80px vertical padding */
.g2 / .g3 / .g4     /* CSS grid 2/3/4 col with 16px gap */
.g-halves           /* 2-col equal, 80px gap, align center */
.g-halves-lg        /* 2-col equal, 56px gap, align start */
```

### Component Classes
```css
.card               /* glassmorphism card with hover lift */
.card-icon          /* 40x40 accent-bg icon box */
.card-pill          /* small tag/badge pill */
.card-list          /* icon + text list inside card */
.btn .btn-ghost .btn-primary .btn-lg
.badge              /* animated dot + text pill */
.reveal .d1 .d2 .d3 .d4   /* scroll reveal with delays */
.t-label            /* section eyebrow label */
.grad-text          /* purple gradient text effect */
.ticker-wrap / .ticker-track    /* infinite scroll ticker */
.metrics-strip / .metrics-grid  /* 4-col KPI strip */
.stack-layers / .stack-layer    /* numbered layer list */
.grid-bg            /* dot grid background overlay */
.noise              /* grain texture overlay */
```

---

## JavaScript Modules (script.js)
All wrapped in IIFE, no external dependencies except Lucide.

| Function | What it does |
|---|---|
| `initThemePersist()` | Reads `localStorage` and sets `data-theme` before paint |
| `initThemeToggle()` | Toggles dark/light on `#themeToggle` click |
| `initCursor()` | Dot = instant position, ring = RAF lerp (smooth lag) |
| `initNav()` | Adds `.scrolled` class to nav after 28px scroll |
| `initScrollSpy()` | Updates `.active` on nav links based on current section |
| `initReveal()` | IntersectionObserver scroll reveal — unobserves after trigger |
| `initTicker()` | Clones ticker track for seamless infinite loop |
| `initDiagram()` | Cycles `.active` class on `.d-node` elements |
| `initLegalTabs()` | Switches legal panels via `data-panel` attribute |

---

## Page-Specific Notes

### index.html
- Hero has a full SIGNAASAT-themed dashboard card: stat strip (4 cols) + dual-wave SVG chart + 2 mini bottom panels (bar chart + funnel) + 4 floating chips below
- Sections in order: Hero → Ticker → Shift → Stack → Healthcare → AdTech → AI → OS → Metrics Strip → Global → Why → CTA
- Scroll-spy nav links point to section IDs: `#shift #healthcare #ai #os #global`
- OS section uses `.os-section-grid` (2-col, `align-items: stretch`) — don't change to `.g-halves`

### blog.html
- Category filter buttons (`.filter-btn`) are visual only — no actual JS filtering in static mode
- Featured post uses `.blog-card.featured` with `grid-column: 1 / -1` and 2-col internal layout

### blog-detail.html
- Two IntersectionObservers: one for reading progress bar, one for TOC active state
- Hero image is a dark SVG chart (NOT a white card) — `background: #0a0a1e`, dual-wave paths, floating `.hero-chip` elements with dark glassmorphism
- Article content uses `h2[id]` attributes for TOC anchor links

### legal.html
- Side nav uses `data-target` attribute on `.legal-nav-item` links
- Panels use `id="panel-{name}"` and are shown/hidden via JS
- Supports URL param: `legal.html?tab=privacy` auto-selects the right panel

---

## Conventions & Rules

1. **Never use inline opacity for text color** — always use solid `var(--text2)` or `var(--text3)` for WCAG compliance
2. **Never hardcode padding** — always use `var(--gutter)` and `.container`
3. **cursor: none on everything** — custom cursor is always active
4. **All links use `cursor: none`** — the JS cursor handles hover state
5. **Lucide icons** loaded from CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js` — call `lucide.createIcons()` after DOM changes
6. **Logo SVG** is inline — a signal-wave path inside a rounded rect. Reuse the exact same SVG in both nav and footer
7. **shared.css is the only stylesheet** — page-specific styles go in `<style>` blocks inside each HTML file
8. **Responsive breakpoints:** 1200px (gutter reduces), 900px (mobile layout), 600px (tight mobile)
9. **Scroll reveal:** add `.reveal` class + optional `.d1`–`.d4` delay classes — script handles the rest
10. **Theme toggle icon:** `.icon-sun` shown in light mode, `.icon-moon` in dark — toggled via CSS `[data-theme="light"]` selector

---

## Brand Voice
- **Company:** SIGNAASAT — Healthcare Acquisition & AI Infrastructure
- **Tagline:** "Live & Let Live" → not used on site. Site tagline: "Healthcare Acquisition. Autonomous."
- **Positioning:** Not an agency. Not just ad tech. Not just SaaS. Infrastructure.
- **Markets:** UAE/Dubai (primary), Singapore, India, Africa, Europe (upcoming)
- **Revenue model:** Performance-based — earns on patient conversion, not retainer
- **Key features:** ORTB ad infrastructure, AI agents (24/7), SIGNAASAT OS dashboard, patient acquisition funnels

---

## Common Tasks & How to Do Them

### Add a new section to index.html
1. Add a `<section class="section" id="your-id">` block
2. Add a `.container` inside
3. Add a `.section-hd` with `.t-label` + `h2.t-section` + `p.t-body`
4. Add `reveal` classes to elements
5. Add nav link in `<ul class="nav-links">` if it's a primary section

### Add a new blog post
- Duplicate one of the article cards in `blog.html`
- For the detail page, `blog-detail.html` is the template — update the content

### Add a new legal tab
1. Add `.legal-nav-item` with `data-target="newname"` in the sidebar nav
2. Add `<div id="panel-newname" class="legal-section" style="display:none;">` in the panel wrap

### Change accent color
Update `--accent` in both `[data-theme="dark"]` and `[data-theme="light"]` blocks in `shared.css`. The glow/soft variants derive from it so update those too: `--accent-soft`, `--accent-glow`.

---

## What's NOT in the project (to build next if needed)
- [ ] Search functionality on blog
- [ ] Contact form backend / validation feedback
- [ ] Cookie consent banner (legal.html exists but no banner UI)
- [ ] Animations on the OS dashboard (live-updating numbers)
- [ ] Mobile hamburger menu (nav links hidden on mobile, CTA preserved)
- [ ] Blog pagination (visual only, no actual pages 2-3)
- [ ] Case studies page
- [ ] Careers page
