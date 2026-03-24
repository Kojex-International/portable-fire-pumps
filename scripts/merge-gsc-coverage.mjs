import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const rootDir = process.cwd();
const snapshotDate = process.argv[2] || '2026-03-24';
const baseDir = path.join(rootDir, 'docs', 'seo', 'search-console', snapshotDate);
const rawDir = path.join(baseDir, 'raw');

const canonicalHost = 'www.portable-fire-pumps.com';
const redirectFile = path.join(rootDir, 'public', '_redirects');

function parseCsv(text) {
  const rows = [];
  let current = '';
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        i += 1;
      }
      row.push(current);
      current = '';
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const [header, ...dataRows] = rows;
  return dataRows.map((cells) => {
    const entry = {};
    header.forEach((key, index) => {
      entry[key] = cells[index] ?? '';
    });
    return entry;
  });
}

function readZipEntry(zipPath, entryName) {
  return execFileSync('unzip', ['-p', zipPath, entryName], { encoding: 'utf8' });
}

function loadRedirects() {
  const lines = fs.readFileSync(redirectFile, 'utf8').split(/\r?\n/);
  return lines
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/))
    .filter((parts) => parts.length >= 2)
    .map(([from, to]) => ({ from, to }));
}

const redirects = loadRedirects();
const exactRedirects = new Map(
  redirects
    .filter((rule) => rule.from.startsWith('/') && !rule.from.includes('*'))
    .map((rule) => [rule.from, rule.to])
);

function canonicalizeAndRedirect(rawUrl) {
  const parsed = new URL(rawUrl);
  const original = parsed.toString();
  const notes = [];

  if (parsed.protocol !== 'https:' || parsed.host !== canonicalHost) {
    parsed.protocol = 'https:';
    parsed.host = canonicalHost;
    parsed.port = '';
    notes.push('canonical_host_redirect');
  }

  let redirectCount = 0;
  while (redirectCount < 10) {
    const currentPath = parsed.pathname;
    const nextPath = exactRedirects.get(currentPath);
    if (!nextPath) {
      break;
    }
    parsed.pathname = nextPath;
    parsed.search = '';
    parsed.hash = '';
    redirectCount += 1;
    notes.push(`path_redirect:${currentPath}->${nextPath}`);
  }

  return {
    originalUrl: original,
    finalUrl: parsed.toString(),
    redirectApplied: parsed.toString() !== original,
    notes,
  };
}

function classifyUrl(rawUrl, finalUrl) {
  const url = new URL(rawUrl);
  const final = new URL(finalUrl);
  const isLocalized = /^\/(en|fr)(\/|$)/.test(url.pathname);
  const isLegacyHashbang = url.hash.startsWith('#!');
  const isCanonicalHost = url.host === canonicalHost && url.protocol === 'https:';

  let classification = 'other';
  if (isLegacyHashbang) {
    classification = 'legacy_hashbang';
  } else if (!isCanonicalHost) {
    classification = 'noncanonical_host_or_protocol';
  } else if (!isLocalized && url.pathname !== '/') {
    classification = 'legacy_or_nonlocalized_path';
  } else if (isLocalized) {
    classification = 'localized_current_style';
  } else if (url.pathname === '/') {
    classification = 'root_path';
  }

  return {
    classification,
    locale: final.pathname.startsWith('/fr') ? 'fr' : final.pathname.startsWith('/en') ? 'en' : '',
    path: url.pathname,
    finalPath: final.pathname,
    host: url.host,
    finalHost: final.host,
  };
}

function normalizeLastCrawled(value) {
  if (!value || value === '1970-01-01') {
    return '';
  }
  return value;
}

function coverageGroup(issue) {
  return issue === 'Valid' ? 'Valid' : 'Excluded';
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

ensureDir(baseDir);

const rawZipFiles = fs
  .readdirSync(rawDir)
  .filter((name) => name.endsWith('.zip'))
  .sort();

const unifiedRows = [];

for (const fileName of rawZipFiles) {
  const zipPath = path.join(rawDir, fileName);
  const metadataRows = parseCsv(readZipEntry(zipPath, 'Metadata.csv'));
  const tableRows = parseCsv(readZipEntry(zipPath, 'Table.csv'));
  const metadata = Object.fromEntries(metadataRows.map((row) => [row.Property, row.Value]));
  const issue = metadata.Issue || 'Valid';
  const sitemap = metadata.Sitemap || '';

  for (const row of tableRows) {
    const rawUrl = row.URL;
    const redirectInfo = canonicalizeAndRedirect(rawUrl);
    const classified = classifyUrl(rawUrl, redirectInfo.finalUrl);

    unifiedRows.push({
      snapshot_date: snapshotDate,
      source_file: fileName,
      coverage_group: coverageGroup(issue),
      issue,
      sitemap,
      url: rawUrl,
      last_crawled: normalizeLastCrawled(row['Last crawled']),
      host: classified.host,
      path: classified.path,
      final_url: redirectInfo.finalUrl,
      final_host: classified.finalHost,
      final_path: classified.finalPath,
      classification: classified.classification,
      locale: classified.locale,
      redirect_applied: redirectInfo.redirectApplied ? 'true' : 'false',
      redirect_notes: redirectInfo.notes.join(';'),
    });
  }
}

unifiedRows.sort((a, b) => {
  if (a.coverage_group !== b.coverage_group) {
    return a.coverage_group.localeCompare(b.coverage_group);
  }
  if (a.issue !== b.issue) {
    return a.issue.localeCompare(b.issue);
  }
  return a.url.localeCompare(b.url);
});

const summary = {
  snapshot_date: snapshotDate,
  generated_at: new Date().toISOString(),
  source_files: rawZipFiles,
  totals: {
    rows: unifiedRows.length,
    valid: unifiedRows.filter((row) => row.coverage_group === 'Valid').length,
    excluded: unifiedRows.filter((row) => row.coverage_group === 'Excluded').length,
    redirect_sources: unifiedRows.filter((row) => row.redirect_applied === 'true').length,
  },
  by_issue: Object.fromEntries(
    [...new Set(unifiedRows.map((row) => row.issue))]
      .sort()
      .map((issue) => [issue, unifiedRows.filter((row) => row.issue === issue).length])
  ),
  by_classification: Object.fromEntries(
    [...new Set(unifiedRows.map((row) => row.classification))]
      .sort()
      .map((classification) => [
        classification,
        unifiedRows.filter((row) => row.classification === classification).length,
      ])
  ),
};

function toCsv(rows) {
  if (rows.length === 0) {
    return '';
  }

  const headers = Object.keys(rows[0]);
  const escapeCell = (value) => {
    const stringValue = String(value ?? '');
    if (/[",\n]/.test(stringValue)) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  return [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(',')),
  ].join('\n');
}

fs.writeFileSync(path.join(baseDir, 'coverage-unified.csv'), `${toCsv(unifiedRows)}\n`);
fs.writeFileSync(path.join(baseDir, 'coverage-unified.json'), `${JSON.stringify(unifiedRows, null, 2)}\n`);
fs.writeFileSync(path.join(baseDir, 'coverage-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      output_dir: baseDir,
      rows: summary.totals.rows,
      valid: summary.totals.valid,
      excluded: summary.totals.excluded,
      redirect_sources: summary.totals.redirect_sources,
    },
    null,
    2
  )
);
