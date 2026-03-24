import fs from 'node:fs';
import path from 'node:path';

const snapshotDate = process.argv[2] || '2026-03-24';
const rootDir = process.cwd();
const baseDir = path.join(rootDir, 'docs', 'seo', 'screaming-frog', snapshotDate);
const rawDir = path.join(baseDir, 'raw');
const inputPath = process.argv[3] || path.join(rawDir, 'internal-all.csv');

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
  const normalizedHeader = header.map((key) => String(key ?? '').replace(/^\uFEFF/, ''));
  return dataRows.map((cells) => {
    const entry = {};
    normalizedHeader.forEach((key, index) => {
      entry[key] = cells[index] ?? '';
    });
    return entry;
  });
}

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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function asInt(value) {
  const normalized = Number.parseInt(String(value ?? '').trim(), 10);
  return Number.isFinite(normalized) ? normalized : 0;
}

function asFloat(value) {
  const normalized = Number.parseFloat(String(value ?? '').trim());
  return Number.isFinite(normalized) ? normalized : 0;
}

function normalizeText(value) {
  return String(value ?? '').replace(/^\uFEFF/, '').trim();
}

ensureDir(baseDir);

const rawCsv = fs.readFileSync(inputPath, 'utf8');
const parsedRows = parseCsv(rawCsv);

const normalizedRows = parsedRows.map((row) => {
  const address = normalizeText(row.Address);
  let url;

  try {
    url = new URL(address);
  } catch {
    url = null;
  }

  const contentType = normalizeText(row['Content Type']);
  const statusCode = asInt(row['Status Code']);
  const status = normalizeText(row.Status);
  const indexability = normalizeText(row.Indexability);
  const canonical = normalizeText(row['Canonical Link Element 1']);
  const redirectUrl = normalizeText(row['Redirect URL']);
  const redirectType = normalizeText(row['Redirect Type']);
  const isHtml = contentType.startsWith('text/html');
  const isRedirect = statusCode >= 300 && statusCode < 400;
  const isAsset = !isHtml;
  const pathName = url?.pathname ?? '';
  const host = url?.host ?? '';
  const isLocalizedEn = /^\/en(\/|$)/.test(pathName);
  const isLocalizedFr = /^\/fr(\/|$)/.test(pathName);
  const isNonlocalizedHtml = isHtml && !isLocalizedEn && !isLocalizedFr;
  const hasTrailingSlash = pathName.endsWith('/');
  const canonicalMatchesSelf = canonical.length > 0 && canonical === address;
  const redirectTargetPath = redirectUrl ? new URL(redirectUrl).pathname : '';

  return {
    address,
    content_type: contentType,
    status_code: statusCode,
    status,
    indexability,
    indexability_status: normalizeText(row['Indexability Status']),
    title_1: normalizeText(row['Title 1']),
    meta_description_1: normalizeText(row['Meta Description 1']),
    h1_1: normalizeText(row['H1-1']),
    meta_robots_1: normalizeText(row['Meta Robots 1']),
    canonical_link_element_1: canonical,
    crawl_depth: asInt(row['Crawl Depth']),
    inlinks: asInt(row.Inlinks),
    outlinks: asInt(row.Outlinks),
    response_time: asFloat(row['Response Time']),
    redirect_url: redirectUrl,
    redirect_type: redirectType,
    language: normalizeText(row.Language),
    crawl_timestamp: normalizeText(row['Crawl Timestamp']),
    path: pathName,
    host,
    is_html: isHtml ? 'true' : 'false',
    is_indexable_html: isHtml && indexability === 'Indexable' ? 'true' : 'false',
    is_redirect: isRedirect ? 'true' : 'false',
    is_asset: isAsset ? 'true' : 'false',
    is_localized_en: isLocalizedEn ? 'true' : 'false',
    is_localized_fr: isLocalizedFr ? 'true' : 'false',
    is_nonlocalized_html: isNonlocalizedHtml ? 'true' : 'false',
    has_trailing_slash: hasTrailingSlash ? 'true' : 'false',
    canonical_matches_self: canonicalMatchesSelf ? 'true' : 'false',
    redirect_target_path: redirectTargetPath,
  };
});

const summary = {
  snapshot_date: snapshotDate,
  generated_at: new Date().toISOString(),
  input_file: path.relative(rootDir, inputPath),
  totals: {
    rows: normalizedRows.length,
    html_rows: normalizedRows.filter((row) => row.is_html === 'true').length,
    indexable_html_rows: normalizedRows.filter((row) => row.is_indexable_html === 'true').length,
    redirect_rows: normalizedRows.filter((row) => row.is_redirect === 'true').length,
    localized_en_rows: normalizedRows.filter((row) => row.is_localized_en === 'true').length,
    localized_fr_rows: normalizedRows.filter((row) => row.is_localized_fr === 'true').length,
    nonlocalized_html_rows: normalizedRows.filter((row) => row.is_nonlocalized_html === 'true').length,
  },
};

fs.writeFileSync(path.join(baseDir, 'internal-all-normalized.csv'), `${toCsv(normalizedRows)}\n`);
fs.writeFileSync(path.join(baseDir, 'internal-all-normalized.json'), `${JSON.stringify(normalizedRows, null, 2)}\n`);
fs.writeFileSync(path.join(baseDir, 'crawl-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);

console.log(JSON.stringify(summary, null, 2));
