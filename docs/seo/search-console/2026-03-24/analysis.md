# Coverage Analysis Notes (2026-03-24)

## Snapshot highlights

- `32` URLs are reported as valid.
- `34` URLs are excluded.
- `28` exported URLs are redirect sources that consolidate to current canonical targets.
- `18` current localized URLs are still excluded, almost all as `Discovered - currently not indexed`.

## What is working

- Current canonical host usage is consistent:
  - `https://www.portable-fire-pumps.com`
- Localized core pages are being indexed:
  - `/en/`
  - `/fr/`
  - `/en/products/`
  - `/fr/products/`
  - `/en/products/air-cooled/`
  - `/fr/products/air-cooled/`
  - `/en/products/water-cooled/`
  - `/fr/products/water-cooled/`
  - `/en/products/ft510-a/`
  - `/fr/products/ft510-a/`
  - `/en/products/p572s-a/`
  - `/fr/products/p572s-a/`
- Legacy redirect targets are consolidating toward current localized URLs.

## What still needs attention

### 1. Current localized pages not yet indexed

These are live current-style URLs but still excluded in Search Console:

- `/en/about-us/`
- `/en/distributors/`
- `/en/features/`
- `/en/resources/`
- `/en/products/ff500ar-a/`
- `/en/products/fk500-a/`
- `/en/products/ft300-400-a/`
- `/en/products/tf516mh-ab/`
- `/fr/about-us/`
- `/fr/contact-us/`
- `/fr/distributors/`
- `/fr/features/`
- `/fr/resources/`
- `/fr/products/ff500ar-a/`
- `/fr/products/fk500-a/`
- `/fr/products/ft300-400-a/`
- `/fr/products/tf516mh-ab/`

### 2. Legacy URLs still consume crawl/index attention

Several old URLs are still valid or repeatedly crawled:

- `/about-us`
- `/products`
- `/water-cooled`
- `/air-cooled`
- `/contact`
- `/document`
- `/document-1`
- `/ff500`
- `/fk500`
- `/ft300`
- `/ft450`
- `/ft500`
- `/p572`

There are also legacy/non-target URLs still reported as valid and not redirected:

- `/dealers-finder`
- `/demo-video`
- `/news`
- `/product-features`
- `/emergecywaterpurificationsystem`
- `/複製-emergency-water-purification-sy`

### 3. One current product is still omitted from the production sitemap

The production sitemap filter in `astro.config.mjs` currently excludes:

- `/products/p572sw-a/`

That is likely suppressing discovery for a real product detail page and should be reviewed.

## Recent SEO improvements already reflected in the environment

- Canonical host is standardized to `https://www.portable-fire-pumps.com`
- Redirects now exist for many important legacy URLs
- Localized EN/FR architecture is in place
- Category pages (`air-cooled`, `water-cooled`) are indexed in both locales
- Products index pages are indexed in both locales
- Internal linking between:
  - homepage
  - products
  - categories
  - features
  - use cases
  - relay pumping
  - resources
  has been materially improved

## Next priorities

1. Get the excluded current localized pages crawled and indexed.
2. Review legacy URLs that remain valid but do not map to current content strategy.
3. Fix the sitemap exclusion for `/products/p572sw-a/` if that page should be indexed.
4. Keep monitoring whether Google consolidates old non-localized URLs into the newer `/en/` and `/fr/` structure.
