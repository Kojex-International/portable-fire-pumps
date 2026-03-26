# Screaming Frog Crawl Snapshot (2026-03-24 Post FeatureShowcase Fix)

This directory stores the crawl snapshot taken after the final homepage product-link fix (`FeatureShowcase`) was deployed.

## Crawl metadata

- Crawl date: `2026-03-24`
- Source crawl target: `https://www.portable-fire-pumps.com/`
- Crawl mode: `Subfolder`
- Export type: `Internal > HTML`
- Tool context: Screaming Frog free-version export captured from the GUI after the `FeatureShowcase` href normalization fix

## Files

- `raw/pfp_internal_html_v4.csv`
  - raw provenance-preserving export from the latest crawl
- `raw/internal-all.csv`
  - canonical repo copy used by the normalization script
- `internal-all-normalized.csv`
  - normalized flat CSV with derived SEO fields
- `internal-all-normalized.json`
  - JSON version of the normalized export
- `crawl-summary.json`
  - summary counts for HTML rows, indexable rows, redirects, and locale segmentation
- `analysis.md`
  - final comparison notes confirming the redirect cleanup outcome

## Comparison targets

Primary comparisons:

- [Post product-link-fix snapshot (v3)](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/screaming-frog/2026-03-24-post-product-link-fix/internal-all-normalized.csv)
- [Post SEO-cleanup snapshot (v2)](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/screaming-frog/2026-03-24-post-seo-cleanup/internal-all-normalized.csv)
- [Initial baseline snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/screaming-frog/2026-03-24/internal-all-normalized.csv)

Search Console baseline:

- [Coverage unified snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/search-console/2026-03-24/coverage-unified.csv)

## Rebuild

From the repo root:

```bash
node scripts/normalize-screaming-frog-export.mjs 2026-03-24-post-featureshowcase-fix docs/seo/screaming-frog/2026-03-24-post-featureshowcase-fix/raw/internal-all.csv
```
