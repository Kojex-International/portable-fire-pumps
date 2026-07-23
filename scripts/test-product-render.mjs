#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');

const checks = [
  {
    label: 'EN FT510 product page',
    file: path.join(distDir, 'en/products/ft510-a/index.html'),
    mustInclude: [
      'FT510-A',
      'Technical',
      'Specifications',
      'Maximum Discharge',
      'Discharge Performance',
      '*Independent test',
      'Manufacturer standard',
      'Performance values represent maximum output under standard factory test conditions; actual performance may vary depending on operating conditions.',
      'Performance Curve',
      'Pump Operation',
      'Related',
      'Pumps',
    ],
  },
  {
    label: 'FR FT510 product page',
    file: path.join(distDir, 'fr/products/ft510-a/index.html'),
    mustInclude: [
      'FT510-A',
      'Spécifications',
      'techniques',
      'Performance maximale de refoulement',
      'Performance de refoulement',
      'Données d’essai indépendantes',
      'Données standard du fabricant',
      'Les valeurs de performance représentent la sortie maximale dans des conditions d’essai standard en usine; les performances réelles peuvent varier selon les conditions d’utilisation.',
      'Courbe de performance',
      'Fonctionnement de la pompe',
      'Pompes',
      'associées',
    ],
  },
  {
    label: 'EN P572 product page',
    file: path.join(distDir, 'en/products/p572s-a/index.html'),
    mustInclude: [
      'P572S-A',
      'Technical',
      'Specifications',
      'Maximum Discharge',
      'Discharge Performance',
      '*Independent test',
      'Manufacturer standard',
      'Performance values represent maximum output under standard factory test conditions; actual performance may vary depending on operating conditions.',
      'Performance Curve',
      'Pump Operation',
      'Related',
      'Pumps',
    ],
  },
  {
    label: 'FR P572 product page',
    file: path.join(distDir, 'fr/products/p572s-a/index.html'),
    mustInclude: [
      'P572S-A',
      'Spécifications',
      'techniques',
      'Performance maximale de refoulement',
      'Performance de refoulement',
      'Données d’essai indépendantes',
      'Données standard du fabricant',
      'Performance values represent maximum output under standard factory test conditions; actual performance may vary depending on operating conditions.',
      'Courbe de performance',
      'Fonctionnement de la pompe',
      'Pompes',
      'associées',
    ],
  },
];

const failures = [];

const normalizeVisibleText = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const repeatedUnitPattern =
  /\b(US gal(?:\/h)?|US GPM|L\/h|L\/min|psi|MPa|ft|in|lb|hp)\s+\1\b/i;

const productPageDirs = ['en', 'fr'].flatMap((locale) => {
  const productsDir = path.join(distDir, locale, 'products');
  if (!fs.existsSync(productsDir)) return [];

  return fs.readdirSync(productsDir, { withFileTypes: true })
    .filter((entry) =>
      entry.isDirectory() &&
      !['air-cooled', 'water-cooled', 'p572sw-a'].includes(entry.name)
    )
    .map((entry) => ({
      label: `${locale.toUpperCase()} ${entry.name}`,
      file: path.join(productsDir, entry.name, 'index.html'),
    }));
});

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    failures.push(`[${check.label}] Missing file: ${check.file}`);
    continue;
  }

  const html = fs.readFileSync(check.file, 'utf8');
  for (const marker of check.mustInclude) {
    if (!html.includes(marker)) {
      failures.push(`[${check.label}] Missing marker: "${marker}"`);
    }
  }
}

for (const productPage of productPageDirs) {
  if (!fs.existsSync(productPage.file)) {
    failures.push(`[${productPage.label}] Missing file: ${productPage.file}`);
    continue;
  }

  const html = fs.readFileSync(productPage.file, 'utf8');
  if (!html.trim()) continue;

  const visibleText = normalizeVisibleText(html);
  const repeatedUnit = visibleText.match(repeatedUnitPattern)?.[0];
  if (repeatedUnit) {
    failures.push(`[${productPage.label}] Repeated unit label: "${repeatedUnit}"`);
  }
  if (/\bUS\s+US\b/i.test(visibleText)) {
    failures.push(`[${productPage.label}] Repeated US unit prefix`);
  }
  if (/(?<!\bUS\s)\bgal(?:\/h)?\b/i.test(visibleText)) {
    failures.push(`[${productPage.label}] Gallon unit is missing its US prefix`);
  }
  if (/(?<!\bUS\s)\bGPM\b/i.test(visibleText)) {
    failures.push(`[${productPage.label}] GPM unit is missing its US prefix`);
  }
}

const p572Html = fs.readFileSync(path.join(distDir, 'en/products/p572s-a/index.html'), 'utf8');
const p572VisibleText = normalizeVisibleText(p572Html);
if (!p572VisibleText.includes('4.62 US gal/h') || p572VisibleText.includes('4.62 US US gal/h')) {
  failures.push('[EN P572 product page] Fuel consumption unit is not rendered as "4.62 US gal/h"');
}

if (failures.length > 0) {
  console.error('Product render regression checks failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Product render regression checks passed for ${productPageDirs.length} EN/FR product pages.`);
