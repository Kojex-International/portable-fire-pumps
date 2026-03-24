# Google Search Console Coverage Snapshot (2026-03-24)

This directory contains the raw Google Search Console coverage exports and a normalized merged dataset for repo-based SEO analysis.

## Contents

- `raw/`
  - Original ZIP exports copied from Search Console
- `coverage-unified.csv`
  - Flat merged dataset with one row per exported URL
- `coverage-unified.json`
  - JSON version of the merged dataset
- `coverage-summary.json`
  - Snapshot counts grouped by issue and URL classification

## Current snapshot totals

- Total rows: `66`
- Valid rows: `32`
- Excluded rows: `34`
- Redirect-source rows: `28`

## Notes

- The merged dataset enriches each URL with:
  - current/final canonicalized target URL
  - simple URL classification
  - redirect application notes based on `public/_redirects`
- Canonical host assumptions come from the current repo configuration:
  - `https://www.portable-fire-pumps.com`

## Rebuild

From the repo root:

```bash
node scripts/merge-gsc-coverage.mjs 2026-03-24
```

The script reads ZIP files from:

```text
docs/seo/search-console/2026-03-24/raw/
```
