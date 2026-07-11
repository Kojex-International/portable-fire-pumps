# Portable Fire Pumps Repo Context for Grok 4.5

This document is a working handoff for the `portable-fire-pumps` repo. It is intended to give another model enough context to continue productively without rediscovering design decisions, implementation constraints, or recent changes.

It covers:
- what this repo is
- the current architecture and key files
- the major workstreams completed recently
- conventions that should be preserved
- known sensitivities and recurring pitfalls
- practical guidance for future edits

This is not a full historical log. It is the distilled context that matters for continuing work.

---

## 1. Repo Summary

Project path:
- `/Users/nkmatsumoto/Development/portable-fire-pumps`

Purpose:
- Marketing / product site for KOJEX + Shibaura portable fire pumps
- Bilingual site with English and French routes
- Strong focus on product selection, product videos, resources, distributors, and trade-show/event landing pages

Tech stack:
- Astro
- Tailwind-style utility classes
- Small React islands where needed
- Netlify functions for form submission / email

Primary themes:
- light editorial/product-marketing design
- strong red brand accent
- dark premium hero sections used selectively
- heavy use of reusable Astro components

---

## 2. High-Level Architecture

Important top-level areas:
- `src/pages/en/*` and `src/pages/fr/*`: page routes
- `src/components/*`: reusable sections and UI
- `src/components/products/*`: product-page and product-grid UI
- `src/components/events/*`: event landing page hero/cards
- `src/components/ui/*`: buttons, cards, badges
- `src/components/forms/*`: RFQ/contact form
- `netlify/functions/send-form-email.cjs`: backend form email handler
- `data/*`: product data, brochures, catalogue, manuals

Important reusable pieces:
- `src/components/ui/SiteBadge.astro`
- `src/components/ui/Button.astro`
- `src/components/ui/Card.astro`

Important layout/metadata pieces:
- `src/layouts/BaseLayout.astro`
- `src/utils/nonProductMetadata.ts`
- `src/utils/productMetadata.ts`

---

## 3. Critical Current Components

### 3.1 Event Hero

File:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/events/EventPremiumVideoHero.astro`

Purpose:
- Premium trade-show hero for `/en/events`
- Uses a KOJEX wordmark mask treatment with video visible through the wordmark
- Includes small hero action links below the mask

Current behavior:
- desktop video source: `/hero-firepump-loop-v1.mp4`
- mobile video source: currently the same desktop file
- title and tagline rendered above/below the KOJEX mask
- hero buttons/actions rendered below the tagline
- quick links support both file downloads and normal anchor links

Current quick link schema:
- `title`
- `subtitle`
- `href`
- `icon: 'download' | 'file-text' | 'video'`
- `download?: boolean`

Current icons:
- `download` -> `Download`
- `file-text` -> `FileText`
- `video` -> `Clapperboard`

Important note:
- this component went through many iterations
- keep it simple
- do not reintroduce experimental canvas masking unless explicitly required

### 3.2 Products Hero Video

File:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/products/ProductsVideoHero.astro`

Purpose:
- Hero on the English and French products pages
- Click-to-play hero video with overlay content and custom interactions

Current state:
- uses Shibaura promo no-text video
- localized overlay content
- custom controls / fullscreen logic
- lots of mobile-specific behavior already tuned

Sensitivity:
- this component is complex and fragile
- changes to overlay timing, mobile controls, or video behavior can easily regress

### 3.3 Event Product Card

File:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/events/EventProductHeroCard.astro`

Purpose:
- Featured product cards on the event page
- Based on product hero / detail visual language, but adapted to event-card format

### 3.4 Site Badge

File:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/ui/SiteBadge.astro`

Current variants:
- `hero`
- `brand`
- `neutral`

Current tones:
- `red`
- `gray`

Important design rule:
- hero badges must preserve the original translucent hero styling
- do not silently change hero badge icon scale, padding, or font styling
- earlier regressions happened here

---

## 4. Major Recent Workstreams

## 4.1 Event / Trade Show Landing Page

Primary file:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/pages/en/events/index.astro`

Purpose:
- Permanent QR destination for trade shows
- Mobile-first companion page, not a second homepage

Current structure:
- premium event hero with KOJEX mask + video
- featured product cards
- credibility section: “Why Choose Shibaura & KOJEX”
- dealer network section: “Trusted Across Canada”
- CTA banner at bottom

Current hero content:
- badge: `Atlantic Fire Leadership 2026`
- title: `Thanks for Visiting`
- tagline: `Delivering Water Where It’s Needed Most`
- quick hero actions:
  - Product Catalogue
  - One-Page Brochure
  - Watch our Demo Video

Current “Watch our Demo Video” behavior:
- links to `/en/products/`
- intended to route users to the products page hero video

Current SEO state:
- page is now production-indexable
- explicit page-level `noindex, nofollow` was removed
- canonical is set
- the page is already live and currently appears in sitemap/production output

Current dealer-network section order:
- left: Trusted Across Canada intro + region chips + 4 support cards
- right: Current Dealer Network + dealer / integration partner CTA card

Current dealer support card copy:
- Technical Support: Direct technical support (parts, troubleshooting).
- Warranty Support: Warranty claim support — Kojex backs you on parts and processing.
- Marketing Materials: Marketing materials, including product catalogues.
- Joint Sales Support: Joint sales support — coordinated sales conversations with your prospects.

Current dealer cards:
- L'Arsenal
- Flash Wildfire

Current dealer card links:
- `/en/distributors/#larsenal`
- `/en/distributors/#flash-wildfire-services`

Current bottom CTA banner:
- uses `events-contact-cta.webp`
- section title: `Next Steps`
- heading: `Continue the conversation with [KOJEX logo]`
- body: `Reach out for pricing, demonstration planning, pump selection guidance, or a post-show follow-up.`

Key event-page assets:
- `@assets/events-contact-cta.webp`
- `@assets/Kojex_wordmark_eventmask.svg`
- `@assets/kojex-logo-vectorized-black.svg`
- `@assets/kojex-logo-vectorized-white.svg`

Trade-show resource files:
- catalogue: `data/Shibaura_Catalog2024_9.pdf`
- brochure: `src/data/kojex-flyer-2026.pdf`

Important event-page design direction:
- keep it premium but still consistent with the main site
- no separate visual language
- use existing card/button/badge patterns
- mobile matters more than desktop because QR users are likely on phones

---

## 4.2 Products Page Hero Video Integration

Primary file:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/products/ProductsVideoHero.astro`

Related pages:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/pages/en/products.astro`
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/pages/fr/products.astro`

Summary:
- The products page hero was reworked into a clickable video hero rather than a static hero plus separate video block
- user strongly preferred integration into the hero
- the page uses source promo footage and a layered overlay system

Important current behavior:
- not autoplay-first; clickable video behavior
- overlay content differs between initial state and paused state
- mobile behavior diverges from desktop
- fullscreen, mute, seek, and pause overlay behavior were adjusted multiple times

Key long-term caution:
- avoid large refactors unless necessary
- small CSS or interaction changes can break mobile Safari

Known design principle:
- English changes on the products page should be mirrored in French unless explicitly stated otherwise

---

## 4.3 Homepage Hero Video Swaps and Asset Updates

Summary:
- multiple homepage hero video variants were tested (`v1`, `v2`, then reverted and swapped again)
- current homepage hero uses revised assets, with poster regeneration and mobile master replacement done iteratively

Important operational lesson:
- treat source video + poster + mobile/desktop pair as a linked set
- when swapping one hero asset, verify the posters and mobile pair too

---

## 4.4 Contact / RFQ Form Changes

Files:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/forms/RFQForm.tsx`
- `/Users/nkmatsumoto/Development/portable-fire-pumps/netlify/functions/send-form-email.cjs`
- `/Users/nkmatsumoto/Development/portable-fire-pumps/public/scripts/rfq-form.js`

Changes completed:
- optional hidden field `leadSource` added
- email backend includes lead source in output
- event page no longer hosts a separate form; it routes into the centralized contact flow
- query params support lead source tracking

Current lead tracking behavior:
- event landing page routes contact CTAs to:
  - `/en/contact-us?source=trade-show-qr`
  - dealer variant adds `interest=dealer`

Form options were updated.

Current Pump Inquiry option order:
1. Request a quote
2. Dealer & OEM Partnership
3. Pump recommendation
4. Accessories & fittings
5. Parts & service support
6. Other

Meaningful copy change:
- `Deployment advice` was replaced by `Dealer & OEM Partnership`
- `Operator training` was replaced by `Other`

This must not break existing forms on other pages.

---

## 4.5 Badge Standardization

Primary file:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/ui/SiteBadge.astro`

Context:
- badge styling drift caused repeated regressions
- badges were standardized into reusable variants

Current intended badge model:

1. `hero`
- translucent
- used in hero overlays and premium hero sections
- should preserve original sizing, font, icon scale, blur, and border styling

2. `brand`
- Shibaura-icon style
- raised/shadow look
- red or gray tone as needed

3. `neutral`
- other-icon style
- compact uppercase label style
- gray/red tone as needed

Important instruction from past work:
- if matching an existing badge, copy the existing badge exactly
- do not “approximate” icon size, spacing, or font choices

---

## 4.6 Dealer / Distributor Content

Related pages:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/pages/en/distributors.astro`
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/pages/en/events/index.astro`

Important naming/content decisions:
- use `Current Dealer Network`, not `Current Dealer Coverage`
- removed line `Current dealer network includes:`
- dealer program CTA should speak to open territory and support, not demo-heavy messaging

Current partner-program wording:
- `Interested in becoming a dealer or integration partner?`
- CTA button: `Start the Conversation`

Current dealer intro message emphasizes:
- Official Canadian Distributor for Shibaura
- local parts
- warranty claim support
- technical assistance in Canada

---

## 4.7 Terminology Cleanup

Important content rule:
- `Rabbit` is the old name and should be removed from user-facing homepage/product marketing copy unless historically necessary

Examples of cleanup that already happened:
- homepage text and supporting copy were revised to remove “Rabbit” where appropriate

Future edits should avoid reintroducing the old brand naming.

---

## 5. Indexing / SEO State

### Event page
- `/en/events/` is currently crawlable and indexable on production
- verified live:
  - `200 OK`
  - `<meta name="robots" content="index, follow">`
  - canonical set to production URL
  - page present in live sitemap

### BaseLayout rule

File:
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/layouts/BaseLayout.astro`

Behavior:
- if `PUBLIC_SITE_ENV === 'production'`, default robots is `index, follow`
- otherwise robots is forced to `noindex, nofollow`

This is correct and should be preserved.

Practical implication:
- staging / local should remain non-indexable
- production should be indexable unless a page explicitly overrides robots

---

## 6. Media / Video Conventions

General rules that emerged from the work:
- do not store raw masters in the web-facing repo when avoidable
- use optimized `.mp4` for site delivery
- posters matter and should be regenerated when video content changes materially
- mobile and desktop variants must be treated as separate optimized deliverables when needed

Important recurring constraint:
- the mobile event hero originally used a mobile-specific product hero video that was framed for a different use case; this caused black bars / mismatch inside the KOJEX mask
- solution was to use the desktop hero video for the mobile event hero mask as well

Practical rule:
- masked typography/video treatments are very sensitive to source aspect ratio and framing
- use the asset whose framing matches the mask use case, not necessarily the asset named “mobile”

---

## 7. UI / UX Conventions to Preserve

### General
- preserve established site branding
- avoid introducing random new colors or fonts
- preserve light backgrounds for most sections
- use dark backgrounds intentionally for premium hero or CTA areas

### Buttons
- if reusing an existing button pattern, use the exact same component/pattern
- do not hand-approximate spacing or arrow placement

### Cards
- animation and hover lift should be consistent across cards
- rounded corners, shadows, borders should match peer cards in the same section

### Mobile-first rule
- event page is especially mobile-sensitive
- QR visitors are expected to be on phones
- avoid wide desktop assumptions in hero or resource layout

### English/French parity
- the user has repeatedly asked that English/French changes stay aligned where content is mirrored
- do not make unilateral English-only structural changes unless explicitly scoped

---

## 8. Known Sensitive Areas / Pitfalls

### 8.1 “Copy it exactly” means exactly

A recurring failure mode in prior work:
- user points to an existing element
- asks for “the same” style
- implementation drifts in icon size, spacing, arrow position, or badge font

Operational rule:
- if the user references an exact existing DOM element or visual pattern, reuse that implementation directly or replicate it 1:1
- do not improvise

### 8.2 Margin vs padding

Explicit learned rule:
- when the user says “margin”, do not substitute padding
- they explicitly called this out as a source of wasted time

### 8.3 Video / mobile Safari complexity

Do not casually refactor:
- product hero custom controls
- pause overlays
- seek behavior
- fullscreen logic
- mobile iOS behavior

These areas took many iterations and are easy to break.

### 8.4 KOJEX mask experiments

Canvas implementation was attempted and abandoned.

Current rule:
- do not go back to canvas unless explicitly requested
- prefer SVG mask approach

### 8.5 Event hero geometry

The relationship between:
- badge
- title
- KOJEX mask
- tagline
- hero resource links

is very sensitive on mobile.

Do not assume desktop spacing scales down well automatically.

---

## 9. Files Most Worth Reading First

If continuing work, start here:

1. Event landing page
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/pages/en/events/index.astro`

2. Event hero
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/events/EventPremiumVideoHero.astro`

3. Event featured product card
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/events/EventProductHeroCard.astro`

4. Products hero video
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/products/ProductsVideoHero.astro`

5. Badge system
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/ui/SiteBadge.astro`

6. Contact form
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/forms/RFQForm.tsx`

7. Backend email handler
- `/Users/nkmatsumoto/Development/portable-fire-pumps/netlify/functions/send-form-email.cjs`

8. Layout robots logic
- `/Users/nkmatsumoto/Development/portable-fire-pumps/src/layouts/BaseLayout.astro`

---

## 10. Suggested Working Model for Grok

When making changes in this repo:

1. inspect the exact existing component/pattern the user references
2. prefer editing the shared reusable component instead of cloning markup
3. preserve English/French parity when applicable
4. avoid introducing new design language
5. keep changes narrow in video/hero components
6. run a build after changes
7. if matching an existing element visually, copy it exactly

Good default command for validation:
- `npm run build`

---

## 11. Current “What Changed Recently” Snapshot

As of this handoff:
- event page is live and indexable
- event hero has 3 compact actions:
  - Product Catalogue
  - One-Page Brochure
  - Watch our Demo Video
- Watch our Demo Video currently links to `/en/products/`
- event page uses a KOJEX masked video hero
- event page has credibility and dealer-network sections in refined production form
- contact form supports `leadSource`
- event CTAs route through centralized contact flow
- contact inquiry options were reordered and renamed
- badge system is standardized but hero-badge styling must be preserved carefully

---

## 12. If a New Model Needs a One-Paragraph Brief

This repo is an Astro/Tailwind bilingual marketing site for KOJEX + Shibaura portable fire pumps. The most important recent work was the `/en/events` trade-show landing page, the `ProductsVideoHero` product-page video hero, the `SiteBadge` standardization, and the RFQ/contact lead-source tracking flow. The user is highly sensitive to small visual regressions, especially when they say “make it the same as X”; exact reuse is expected, not approximation. The event page is now production-indexable, uses a KOJEX SVG mask hero with video visible through the wordmark, routes users into the existing contact flow, and highlights featured pumps plus dealer/distributor support. Product/video hero code is fragile on mobile, especially Safari, so future edits there should be narrowly scoped and validated carefully.

