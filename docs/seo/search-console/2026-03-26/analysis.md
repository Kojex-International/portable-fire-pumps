# Coverage Analysis Notes (2026-03-26)

## Snapshot highlights

- `48` URLs are reported as valid (`+16` vs 2026-03-24).
- `35` URLs are excluded (`+1` vs 2026-03-24).
- `39` exported URLs are redirect sources.
- `Discovered - currently not indexed` dropped from `17` to `1`.

## Key improvements since 2026-03-24

- Google is indexing substantially more current pages (`Valid` grew from `32` to `48`).
- The largest backlog bucket improved:
  - `Discovered - currently not indexed`: `17 -> 1`.
- Redirect and canonical consolidation work is being recognized:
  - many exclusions are now legacy host/protocol/hashbang URLs instead of current localized pages.

## Remaining issues and actions

### 1. Redirect error (`2`)

Current URLs:

- `https://portable-fire-pumps.com/en/`
- `https://portable-fire-pumps.com/fr/`

Action:

- Keep apex-to-www redirect in place (already present in `public/_redirects`).
- Run "Validate fix" in GSC for this bucket now.
- Re-check after recrawl; current live header checks already return a clean single-hop `301 -> 200`.

### 2. One remaining localized priority page still not indexed (`Discovered` = `1`)

Current URL:

- `https://www.portable-fire-pumps.com/fr/features/`

Action:

- Add one more contextual internal link to `/fr/features/` from a strong FR page (for example `/fr/`, `/fr/products/`, or `/fr/resources/` body copy).
- Confirm `/fr/features/` remains in sitemap and self-canonical.
- Request indexing in URL Inspection after adding the contextual link.

### 3. Slashless localized URL still seen as redirect source

Current URL:

- `https://www.portable-fire-pumps.com/en` (`Page with redirect`)

Action:

- Replace any remaining `/en` references with `/en/`.
- Important likely source in repo:
  - `src/pages/index.astro` currently redirects to `'/en'`; use `'/en/'` to remove one avoidable redirect hop.

### 4. Legacy and non-canonical URLs still appearing in excluded buckets

Examples:

- `http://portable-fire-pumps.com/about-us`
- `http://www.portable-fire-pumps.com/ft450`
- `http://www.portable-fire-pumps.com/water-cooled`
- `http://portable-fire-pumps.com/products/air-cooled` (`404`)

Action:

- No structural change needed if these are old external/discovered URLs; current redirects already consolidate most variants.
- Continue monitoring trend only. This should decay as Google re-crawls canonical localized URLs.

### 5. Expected legacy artifacts (mostly monitor-only)

- `Excluded by noindex` PDFs under `/_files/ugd/...`
- `Alternate canonical` hashbang URLs (`#!...`)
- duplicate canonical cluster on old non-localized product paths

Action:

- Monitor only unless business needs those assets indexed.

## Priority order

1. Validate GSC `Redirect error` fixes.
2. Strengthen one internal FR contextual link to `/fr/features/`.
3. Normalize `'/en' -> '/en/'` in `src/pages/index.astro`.
4. Keep monitoring legacy URL decay; do not over-correct historical URLs.
