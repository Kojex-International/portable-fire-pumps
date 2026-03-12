#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['src/pages', 'src/components', 'src/layouts'];
const FILE_EXTENSIONS = new Set(['.astro', '.ts', '.tsx', '.js', '.jsx']);

const WEAK_ALT_VALUES = new Set(['image', 'photo', 'picture', 'logo']);

const GENERIC_ASSET_BASENAME_PATTERNS = [
  /^(img|image|photo|picture)[-_]?\d*$/i,
  /^img_\d+$/i,
  /^dsc\d+$/i,
  /^final(?:[-_]?v?\d+)?$/i,
  /^(new|test|temp)$/i,
];

const findings = {
  missingAlt: [],
  weakAlt: [],
  genericAssetNames: [],
};

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath.includes(`${path.sep}archive${path.sep}`)) continue;
      files.push(...walkFiles(fullPath));
      continue;
    }
    if (entry.isFile() && FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function lineNumberFromIndex(content, index) {
  return content.slice(0, index).split('\n').length;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const tagRegex = /<(img|Image)\b[\s\S]*?>/g;
  for (const match of content.matchAll(tagRegex)) {
    const tag = match[0];
    const at = match.index ?? 0;
    const line = lineNumberFromIndex(content, at);

    if (!/\balt\s*=/.test(tag)) {
      findings.missingAlt.push({ filePath, line, tag: tag.replace(/\s+/g, ' ').slice(0, 180) });
      continue;
    }

    const literalMatch = tag.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/);
    const literalAlt = (literalMatch?.[1] ?? literalMatch?.[2] ?? '').trim().toLowerCase();

    if (literalAlt && WEAK_ALT_VALUES.has(literalAlt)) {
      findings.weakAlt.push({ filePath, line, alt: literalAlt });
    }
  }

  const assetRegex = /@assets\/([^\s'"`]+)/g;
  for (const match of content.matchAll(assetRegex)) {
    const assetPath = match[1];
    const basename = path.basename(assetPath, path.extname(assetPath));
    if (GENERIC_ASSET_BASENAME_PATTERNS.some((pattern) => pattern.test(basename))) {
      const at = match.index ?? 0;
      const line = lineNumberFromIndex(content, at);
      findings.genericAssetNames.push({ filePath, line, asset: `@assets/${assetPath}` });
    }
  }
}

for (const root of ROOTS) {
  for (const filePath of walkFiles(root)) {
    auditFile(filePath);
  }
}

const totalFindings =
  findings.missingAlt.length +
  findings.weakAlt.length +
  findings.genericAssetNames.length;

console.log('Image audit scope: src/pages, src/components, src/layouts (archive excluded)');

if (findings.missingAlt.length) {
  console.log(`\nMissing alt attributes (${findings.missingAlt.length}):`);
  for (const issue of findings.missingAlt) {
    console.log(`- ${issue.filePath}:${issue.line}`);
  }
}

if (findings.weakAlt.length) {
  console.log(`\nWeak alt text values (${findings.weakAlt.length}):`);
  for (const issue of findings.weakAlt) {
    console.log(`- ${issue.filePath}:${issue.line} alt=\"${issue.alt}\"`);
  }
}

if (findings.genericAssetNames.length) {
  console.log(`\nGeneric asset filename references (${findings.genericAssetNames.length}):`);
  for (const issue of findings.genericAssetNames) {
    console.log(`- ${issue.filePath}:${issue.line} -> ${issue.asset}`);
  }
}

if (!totalFindings) {
  console.log('\nNo missing alt attributes or weak literal alt text found.');
  process.exit(0);
}

console.log(`\nTotal findings: ${totalFindings}`);
process.exit(1);
