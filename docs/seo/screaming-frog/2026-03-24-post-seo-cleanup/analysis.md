# Crawl Comparison Notes (2026-03-24 Post SEO Cleanup)

## Snapshot highlights

- The earlier Screaming Frog crawl reported `34` internal HTML redirects.
- The post-deploy crawl reports `12` internal HTML redirects.
- That is a net reduction of `22` internal HTML redirects, or about `65%`.
- Indexable HTML page count stayed stable at `34`.
- Non-localized HTML URLs remain at `0`.

## What improved

The original localized trailing-slash redirect cluster is no longer present in the crawl. These redirect-source URLs disappeared from the post-deploy export:

- `/en`
- `/fr`
- `/en/about-us`
- `/fr/about-us`
- `/en/contact-us`
- `/fr/contact-us`
- `/en/distributors`
- `/fr/distributors`
- `/en/features`
- `/fr/features`
- `/en/resources`
- `/fr/resources`
- `/en/use-cases`
- `/fr/use-cases`
- `/en/long-distance-relay-pumping`
- `/fr/long-distance-relay-pumping`
- `/en/products`
- `/fr/products`
- `/en/products/air-cooled`
- `/fr/products/air-cooled`
- `/en/products/water-cooled`
- `/fr/products/water-cooled`
- and the slashless current product detail URLs

This indicates the centralized `localizePath` change succeeded and the high-inlink slashless URLs are no longer being crawled as internal redirects.

## What still needs attention

All `12` remaining internal redirects in the post-deploy crawl are the same pattern:

- `/en/products//ff500ar-a`
- `/en/products//fk500-a`
- `/en/products//ft300-400-a`
- `/en/products//ft510-a`
- `/en/products//p572s-a`
- `/en/products//tf516mh-ab`
- `/fr/products//ff500ar-a`
- `/fr/products//fk500-a`
- `/fr/products//ft300-400-a`
- `/fr/products//ft510-a`
- `/fr/products//p572s-a`
- `/fr/products//tf516mh-ab`

These are not leftovers from the old issue. They are a new concatenation bug introduced after the trailing-slash cleanup:

- shared product links now start from a base href that already ends with `/`
- some components still append `/${slug}`
- resulting URLs become `/products//slug`

The most likely shared sources are:

- [ProductRelatedPumps.astro](/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/products/ProductRelatedPumps.astro)
- [DesktopPumpCards.astro](/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/products/DesktopPumpCards.astro)
- [MobilePumpCards.astro](/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/products/MobilePumpCards.astro)

## SEO interpretation

The deployment was successful overall:

- the broad, high-inlink redirect waste was substantially reduced
- crawl paths are cleaner
- current localized pages remain indexable

But the cleanup is not fully complete because:

- product-detail internal links now generate double-slash redirect URLs
- those redirects still carry meaningful inlinks (`8` to `13` depending on product)

## Recommended next fix

Normalize product detail link generation in the shared product-card components so they build:

- `/en/products/ff500ar-a/`
- `/fr/products/fk500-a/`

instead of:

- `/en/products//ff500ar-a`
- `/fr/products//fk500-a`

The safest fix is to update the shared components rather than patching individual pages.

## Comparison with Search Console

This crawl remains useful to compare with:

- [Search Console unified coverage snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/search-console/2026-03-24/coverage-unified.csv)

The main follow-up question is unchanged:

- which current localized URLs are fully crawlable and indexable in the site, but still excluded in Google Search Console

Now that the major slashless redirect cluster is gone, any remaining GSC exclusion is more likely to be:

- crawl-priority / freshness lag
- legacy consolidation lag
- or content-priority issues rather than internal-link formatting across the whole site
