# Crawl Comparison Notes (2026-03-24 Post FeatureShowcase Fix)

## Final snapshot result

The latest crawl confirms the internal redirect cleanup is now complete for current HTML URLs in scope.

- Total HTML rows: `34`
- Indexable HTML rows: `34`
- Internal HTML redirects: `0`
- Non-localized HTML rows: `0`

## Comparison vs previous snapshot (v3)

Previous post-fix snapshot (`2026-03-24-post-product-link-fix`):

- HTML rows: `46`
- Indexable HTML rows: `34`
- Internal HTML redirects: `12`

Latest snapshot (`2026-03-24-post-featureshowcase-fix`):

- HTML rows: `34`
- Indexable HTML rows: `34`
- Internal HTML redirects: `0`

Resolved redirect set:

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

## Interpretation

The final remaining redirect source (homepage `FeatureShowcase` link assembly) has been successfully removed.

Combined with earlier fixes:

- slashless localized internal links were eliminated
- double-slash product detail links were eliminated
- current localized crawl paths are now direct and indexable without internal HTML redirect waste

## Suggested next monitoring step

Use this v4 snapshot as the new crawl baseline and monitor Search Console coverage movement on the same date-window priority pages:

- `/en/features/`, `/fr/features/`
- `/en/resources/`, `/fr/resources/`
- `/en/distributors/`, `/fr/distributors/`
- `/en/about-us/`, `/fr/about-us/`
- `/en/products/ff500ar-a/`, `/fr/products/ff500ar-a/`
- `/en/products/fk500-a/`, `/fr/products/fk500-a/`
- `/en/products/ft300-400-a/`, `/fr/products/ft300-400-a/`
- `/en/products/tf516mh-ab/`, `/fr/products/tf516mh-ab/`
