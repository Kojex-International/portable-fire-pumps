# Screaming Frog Crawl Snapshot (2026-03-24 Post Product Link Fix)

This directory stores the follow-up Screaming Frog crawl taken after the shared product-card link normalization was deployed.

## Crawl metadata

- Crawl date: `2026-03-24`
- Source crawl target: `https://www.portable-fire-pumps.com/`
- Crawl mode: `Subfolder`
- Export type: `Internal > HTML`
- Tool context: Screaming Frog free-version export captured from the GUI after the shared product-card link fix deploy

## Files

- `raw/pfp_internal_html_v3.csv`
  - raw provenance-preserving export provided by the latest post-deploy crawl
- `raw/internal-all.csv`
  - canonical repo copy used by the normalization script
- `internal-all-normalized.csv`
  - normalized flat CSV with derived SEO fields
- `internal-all-normalized.json`
  - JSON version of the normalized export
- `crawl-summary.json`
  - summary counts for HTML rows, indexable HTML rows, redirects, and locale segmentation
- `analysis.md`
  - notes comparing this crawl against the previous post-cleanup crawl and identifying the remaining redirect source

## Comparison targets

This crawl snapshot is intended to be compared with:

- [Earlier post-cleanup Screaming Frog snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/screaming-frog/2026-03-24-post-seo-cleanup/internal-all-normalized.csv)
- [Original Screaming Frog snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/screaming-frog/2026-03-24/internal-all-normalized.csv)
- [Search Console unified coverage snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/search-console/2026-03-24/coverage-unified.csv)

## Rebuild

From the repo root:

```bash
node scripts/normalize-screaming-frog-export.mjs 2026-03-24-post-product-link-fix docs/seo/screaming-frog/2026-03-24-post-product-link-fix/raw/internal-all.csv
```
