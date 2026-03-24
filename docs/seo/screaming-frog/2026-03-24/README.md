# Screaming Frog Crawl Snapshot (2026-03-24)

This directory stores a dated Screaming Frog crawl snapshot for future SEO analysis and comparison against Search Console coverage data.

## Crawl metadata

- Crawl date: `2026-03-24`
- Source crawl target: `https://www.portable-fire-pumps.com/`
- Crawl mode: `Subfolder`
- Export type: `Internal > All`
- Tool context: Screaming Frog free-version export captured from the GUI

## Files

- `raw/pfp_internal_all.csv`
  - raw provenance-preserving export provided by the crawl
- `raw/internal-all.csv`
  - canonical repo copy used by the normalization script
- `internal-all-normalized.csv`
  - normalized flat CSV with derived SEO fields
- `internal-all-normalized.json`
  - JSON version of the normalized export
- `crawl-summary.json`
  - summary counts for HTML, indexable HTML, redirects, and locale segmentation

## Comparison target

This crawl snapshot is intended to be compared with:

- [Search Console unified coverage snapshot](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/search-console/2026-03-24/coverage-unified.csv)

Useful future comparison questions:

- Which current URLs are crawlable but still excluded in Google Search Console?
- Which URLs appear only as redirects in the crawl?
- Are non-trailing-slash internal links still causing 301s?
- Do canonicals and indexability align with the intended `/en/` and `/fr/` structure?

## Rebuild

From the repo root:

```bash
node scripts/normalize-screaming-frog-export.mjs 2026-03-24
```

The normalizer reads:

```text
docs/seo/screaming-frog/2026-03-24/raw/internal-all.csv
```
