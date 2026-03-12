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
      'Discharge Performance',
      'Performance values represent maximum pump output measured under standard factory test conditions using clean water.',
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
      'Performance de refoulement',
      'Les valeurs de performance représentent le débit maximal de la pompe mesuré selon les conditions d’essai standard en usine avec de l’eau propre.',
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
      'Discharge Performance',
      'Performance values represent maximum pump output measured under standard factory test conditions.',
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
      'Performance de refoulement',
      'Performance values represent maximum pump output measured under standard factory test conditions.',
      'Courbe de performance',
      'Fonctionnement de la pompe',
      'Pompes',
      'associées',
    ],
  },
];

const failures = [];

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

if (failures.length > 0) {
  console.error('Product render regression checks failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Product render regression checks passed for EN/FR product pages.');
