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
