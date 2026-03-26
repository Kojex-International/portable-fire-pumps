# Search Console Datasets

Snapshot folders:

- `2026-03-24/`
- `2026-03-26/`

Cross-snapshot merged datasets:

- `coverage-unified-history.csv`
- `coverage-unified-history.json`
- `coverage-history-summary.json`

## Rebuild per snapshot

```bash
node scripts/merge-gsc-coverage.mjs 2026-03-24
node scripts/merge-gsc-coverage.mjs 2026-03-26
```
