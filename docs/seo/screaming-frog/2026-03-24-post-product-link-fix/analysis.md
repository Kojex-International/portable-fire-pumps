# Crawl Comparison Notes (2026-03-24 Post Product Link Fix)

## Snapshot highlights

- The previous post-cleanup crawl reported `12` internal HTML redirects.
- This newest crawl still reports `12` internal HTML redirects.
- Indexable HTML page count remains `34`.
- Non-localized HTML URLs remain `0`.

## What changed

Although the redirect count did not change, the inlink count on every remaining redirect dropped sharply:

- previous crawl: `8` to `13` inlinks per redirect URL
- newest crawl: `1` inlink per redirect URL

That indicates the shared product-card component fix removed most of the remaining bad links.

## What still remains

The only redirect pattern left is still:

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

## Root cause confirmed

The remaining double-slash URLs are still being emitted by:

- [FeatureShowcase.tsx](/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/react/FeatureShowcase.tsx)

It still builds links as:

- `href={`${detailsBaseHref}/${feature.slug}`}`

When `detailsBaseHref` already ends with `/`, the rendered homepage output becomes:

- `/en/products//ft510-a`
- `/fr/products//ff500ar-a`

This was confirmed both in source and in built output:

- [dist/en/index.html](/Users/nkmatsumoto/Development/portable-fire-pumps/dist/en/index.html)

## SEO interpretation

The cleanup is almost complete:

- the broad slashless redirect cluster was removed
- the shared product-card fix substantially reduced the remaining redirect inlinks

But one shared homepage/product-showcase component still needs the same normalization treatment.

## Next fix

Normalize `detailsBaseHref` in:

- [FeatureShowcase.tsx](/Users/nkmatsumoto/Development/portable-fire-pumps/src/components/react/FeatureShowcase.tsx)

so it builds:

- `/en/products/ft510-a/`
- `/fr/products/fk500-a/`

instead of:

- `/en/products//ft510-a`
- `/fr/products//fk500-a`

Once that is deployed, the next Screaming Frog `Internal > HTML` crawl should drop the final `12` redirect URLs.
