# Screaming Frog Crawl Snapshot (2026-03-24 Post SEO Cleanup)

This directory stores a follow-up Screaming Frog crawl snapshot taken after the trailing-slash, redirect, and internal-link cleanup was deployed.

## Crawl metadata

- Crawl date: `2026-03-24`
- Source crawl target: `https://www.portable-fire-pumps.com/`
- Crawl mode: `Subfolder`
- Export type: `Internal > HTML`
- Tool context: Screaming Frog free-version export captured from the GUI after the SEO cleanup deploy

## Files

- `raw/pfp_internal_html_v2.csv`
  - raw provenance-preserving export provided by the post-deploy crawl
- `raw/internal-all.csv`
  - canonical repo copy used by the normalization script
- `internal-all-normalized.csv`
  - normalized flat CSV with derived SEO fields
- `internal-all-normalized.json`
  - JSON version of the normalized export
- `crawl-summary.json`
  - summary counts for HTML rows, indexable HTML rows, redirects, and locale segmentation
- `analysis.md`
  - before/after notes comparing this crawl against the earlier `2026-03-24` snapshot

## Comparison targets

This crawl snapshot is intended to be compared with:

- [Earlier Screaming Frog snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/screaming-frog/2026-03-24/internal-all-normalized.csv)
- [Search Console unified coverage snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/search-console/2026-03-24/coverage-unified.csv)

Useful follow-up questions:

- Did the trailing-slash cleanup remove the old internal `301` cluster?
- Which internal redirects still remain after deployment?
- Are the remaining redirects caused by a small number of shared components?
- Do the current crawlable localized pages still line up with the GSC excluded set?

## Rebuild

From the repo root:

```bash
node scripts/normalize-screaming-frog-export.mjs 2026-03-24-post-seo-cleanup docs/seo/screaming-frog/2026-03-24-post-seo-cleanup/raw/internal-all.csv
```
