# Google Search Console Coverage Snapshot (2026-03-26)

This directory contains the raw Google Search Console coverage exports and a normalized merged dataset for repo-based SEO analysis.

## Contents

- `raw/`
  - Drilldown and valid ZIP exports used by the merger
- `raw-summary/`
  - Top-level coverage summary ZIP (`Coverage-2026-03-26.zip`)
  - Kept for provenance, but not included in the merge input
- `coverage-unified.csv`
  - Flat merged dataset with one row per exported URL
- `coverage-unified.json`
  - JSON version of the merged dataset
- `coverage-summary.json`
  - Snapshot counts grouped by issue and URL classification

## Current snapshot totals

- Total rows: `83`
- Valid rows: `48`
- Excluded rows: `35`
- Redirect-source rows: `39`

## Notes

- The merged dataset enriches each URL with:
  - current/final canonicalized target URL
  - simple URL classification
  - redirect application notes based on `public/_redirects`
- Canonical host assumptions come from current repo configuration:
  - `https://www.portable-fire-pumps.com`

## Rebuild

From the repo root:

```bash
node scripts/merge-gsc-coverage.mjs 2026-03-26
```

The script reads ZIP files from:

```text
docs/seo/search-console/2026-03-26/raw/
```
