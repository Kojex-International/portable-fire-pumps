# Reindex Queue Workflow

Use this file with:

- [reindex-queue.csv](/Users/nkmatsumoto/Development/portable-fire-pumps/docs/seo/reindex-queue.csv)

## Goal

Track which canonical URLs need manual "Request indexing" in Google Search Console, in priority order, without wasting limited daily requests.

## Daily process

1. Open `reindex-queue.csv`.
2. Filter `status=pending`.
3. Sort by `priority` (`P1` before `P2` before `P3`).
4. Submit only your daily quota in GSC URL Inspection.
5. After each submission, set:
   - `submitted_at` = date
   - `status` = `submitted`
6. After 7-14 days, check result and update:
   - `indexed` if now indexed
   - keep `submitted` if still processing
   - `deferred` if intentionally paused

## Required update rule

When SEO-impacting files are changed, update `reindex-queue.csv` in the same commit.

Run this check before commit/push:

```bash
npm run seo:queue:check
```

If the check fails, add or update rows in `reindex-queue.csv`, then re-run.
