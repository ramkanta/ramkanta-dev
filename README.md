# Ramkanta Pramanik — Portfolio

Single-page portfolio built with Vue 3 + Vite. No UI framework, no runtime CSS-in-JS —
just design tokens and scoped component styles.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Editing content

**All copy lives in [`src/data/content.js`](src/data/content.js).** Change it there and
every section updates — nothing is hard-coded in templates. That includes the résumé
bullets, the capability matrix, the case study and the contact channels.

In experience bullets, wrap a phrase in braces to emphasise it:

```js
{ text: 'Shipped {70+ REST endpoints} in NestJS' }
```

## Structure

```
src/
  data/content.js          all site copy
  composables/useReveal.js scroll-reveal directive, active-section + progress tracking
  components/
    SiteNav.vue            fixed nav, mobile sheet, theme toggle, scroll progress
    HeroSection.vue        name, drawing title-block, animated metrics
    TechMarquee.vue        two counter-scrolling tech rows
    ApproachSection.vue    four working principles
    CapabilitySection.vue  interactive tablist capability matrix
    ExperienceSection.vue  timeline with sticky role meta
    WorkSection.vue        e-commerce case study
    OrderFlowDiagram.vue   hand-drawn SVG order/return state machine
    ContactSection.vue     CTA, channels, footer
    CountUp.vue            metric counter
    SheetHead.vue          "§ 02 / CAPABILITY" section header
```

## Design system

Tokens are defined once in [`src/style.css`](src/style.css) under `:root`, with a dark
variant under `:root[data-theme='dark']`. Components only ever reference the variables,
so re-theming means editing one block.

| Token | Light | Dark |
| --- | --- | --- |
| `--paper` | `#faf8f5` | `#100f0d` |
| `--ink` | `#12100e` | `#f5f1ea` |
| `--accent` | `#c2410c` | `#f97316` |
| `--rule` | `#e2dbd0` | `#2b2823` |

Type: **Archivo** (display/body), **JetBrains Mono** (labels), loaded from Google Fonts.

## Accessibility & performance notes

- Theme is applied by an inline script in `index.html` before first paint, so there is
  no flash of the wrong theme. System preference wins on a first visit; the choice is
  then remembered in `localStorage`.
- `prefers-reduced-motion` disables reveals, the marquee, pill staggers and the metric
  count-up (real numbers render immediately instead).
- `CountUp` carries the true final value in `aria-label`, so screen readers never
  announce mid-animation digits.
- The capability matrix is a proper `tablist` with roving tabindex and arrow-key nav.
- Skip link, visible focus rings, one `<h1>`, `Person` JSON-LD, Open Graph tags.
- All tap targets are ≥24px tall (WCAG 2.5.8); nav controls are 44×44 on touch widths.
- The mobile menu is `Teleport`ed to `<body>` — the nav's `backdrop-filter` makes it a
  containing block for `position: fixed` descendants, which would otherwise collapse the
  sheet to the height of the header. Don't move it back inside `.site-nav`.

## Responsive breakpoints

| Width | Layout |
| --- | --- |
| < 640px | Everything single column; metrics and admin modules 2-up; burger menu |
| ≥ 640px | Title block and contact channels 2-up |
| ≥ 860px | Experience becomes 2-column with sticky role meta |
| ≥ 900px | Desktop nav links and CTA replace the burger; capability matrix splits rail / panel |
| ≥ 980px | Case study header and narrative blocks 2-up; contact channels 4-up |
| ≥ 1100px | Title block 4-up; hero scroll cue appears |
| ≥ 1400px | Fixed section-index rail appears at the left edge |

Verified with no horizontal overflow from 320px upward; the state diagram scrolls inside
its own container rather than widening the page.

## SEO

`npm run build` runs three steps: the client build, an SSR build, then
`scripts/prerender.js`, which renders the app with `@vue/server-renderer` and
injects the markup into `dist/index.html`. The shipped HTML therefore contains
~1,200 words of real content rather than an empty `<div id="app">`.

Two constraints follow from that, and both will silently break prerendering if
ignored:

- **Nothing may touch `window`, `document` or `localStorage` during `setup()`** —
  only inside `onMounted` (or guarded). A `watch(..., { immediate: true })` that
  touches the DOM counts as setup.
- **`<Teleport>` must not render on the server.** `renderToString` diverts
  teleported markup into a separate buffer that never reaches the HTML, so
  hydration cannot find its anchors and tears the DOM down to a comment node.
  `SiteNav` gates its teleport behind a `mounted` ref for exactly this reason.

Scroll-reveal styles are gated on `html.js` (set by an inline script in
`index.html`). Without that gate, a reader or crawler with no JavaScript would
get a blank page, because nothing would ever add `is-visible`.

Also in place: canonical URL, absolute Open Graph/Twitter tags with a real
1200×630 PNG card (`public/og.png` — SVG cards do not render on any major
platform), `robots.txt`, `sitemap.xml`, and a schema.org `@graph` describing the
Person, WebSite and ProfilePage.

If the domain ever changes, update the absolute URLs in `index.html`,
`public/robots.txt` and `public/sitemap.xml`.

## Deploy

Any static host. On Vercel: framework preset **Vite**, build `npm run build`,
output `dist`.
