import { HERO_FEATURE_LABELS, REQUIRED_HERO_FEATURE_KEYS, type HeroFeatureLabelKey } from '../../i18n/heroFeatureLabels';
import { getSpecLabel, getSpecGroupKey, REQUIRED_SPEC_KEYS, SPEC_LABELS, type SpecKey } from '../specLabels';
import {
  buildConnectionRowValues,
  isConnectionRow,
  modelColumnsFromSpecsTable,
  REPEATED_ALLOWED_SPEC_KEYS,
  selectPreferredConnectionSpec,
  SPEC_LABEL_UNIT_PATTERN,
  UNIT_NEUTRAL_SPEC_KEYS,
} from './spec-utils';
import type { Firepump, LocalizedValue } from './types';

const isLocalizedValue = (value: string | LocalizedValue): value is LocalizedValue =>
  typeof value === 'object' &&
  value !== null &&
  typeof value.en === 'string' &&
  typeof value.fr === 'string';

export const validateHeroKeySpecs = (pumps: Firepump[]): void => {
  const errors: string[] = [];
  const validKeySet = new Set(Object.keys(HERO_FEATURE_LABELS) as HeroFeatureLabelKey[]);

  for (const pump of pumps) {
    const seen = new Set<HeroFeatureLabelKey>();
    const duplicates = new Set<HeroFeatureLabelKey>();
    const unknown: string[] = [];

    for (const spec of pump.keySpecs) {
      const rawKey = spec.key as string;
      if (!validKeySet.has(spec.key)) {
        unknown.push(rawKey);
        continue;
      }
      if (seen.has(spec.key)) duplicates.add(spec.key);
      seen.add(spec.key);

      if (!isLocalizedValue(spec.value)) {
        errors.push(`[${pump.slug}] hero key "${spec.key}" must use locale-specific value object { en, fr }`);
        continue;
      }
      if (!spec.value.en.trim()) {
        errors.push(`[${pump.slug}] hero key "${spec.key}" has empty EN value`);
      }
      if (!spec.value.fr.trim()) {
        errors.push(`[${pump.slug}] hero key "${spec.key}" has empty FR value`);
      }
    }

    const missing = REQUIRED_HERO_FEATURE_KEYS.filter((key) => !seen.has(key));
    if (missing.length > 0) {
      errors.push(`[${pump.slug}] missing hero key(s): ${missing.join(', ')}`);
    }
    if (duplicates.size > 0) {
      errors.push(`[${pump.slug}] duplicate hero key(s): ${Array.from(duplicates).join(', ')}`);
    }
    if (unknown.length > 0) {
      errors.push(`[${pump.slug}] unknown hero key(s): ${unknown.join(', ')}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid hero keySpecs in firepumps data:\n- ${errors.join('\n- ')}`);
  }
};

export const validateSpecTables = (pumps: Firepump[]): void => {
  const errors: string[] = [];
  const validSpecKeys = new Set<SpecKey>(Object.keys(SPEC_LABELS) as SpecKey[]);

  for (const pump of pumps) {
    for (const group of pump.specsTable.groups) {
      const groupKey = getSpecGroupKey(group.title);
      if (!groupKey) {
        errors.push(`[${pump.slug}] unknown spec group title "${group.title}"`);
        continue;
      }

      const requiredKeys = REQUIRED_SPEC_KEYS[groupKey];
      const seen = new Set<SpecKey>();
      const duplicates = new Set<SpecKey>();

      for (const row of group.rows) {
        if (!validSpecKeys.has(row.key)) {
          errors.push(`[${pump.slug}] unknown spec key "${row.key}" in "${group.title}"`);
          continue;
        }

        if (row.key === 'primingPerformance') {
          if (!row.qualifier || !row.qualifier.trim()) {
            errors.push(`[${pump.slug}] row "primingPerformance" is missing qualifier`);
          }
        }

        if (row.key === 'dischargePerformance' || row.key === 'maximumDischargePerformance') {
          if (!row.pressureMPa || !row.pressureMPa.trim()) {
            errors.push(`[${pump.slug}] ${row.key} row is missing pressureMPa`);
          }
          if (!row.suctionHeightM || !row.suctionHeightM.trim()) {
            errors.push(`[${pump.slug}] ${row.key} row is missing suctionHeightM`);
          }
        }

        if (seen.has(row.key) && !REPEATED_ALLOWED_SPEC_KEYS.has(row.key)) {
          duplicates.add(row.key);
        }
        seen.add(row.key);

        const rowLabelEn = getSpecLabel(row.key, 'en');
        if (UNIT_NEUTRAL_SPEC_KEYS.has(row.key) && SPEC_LABEL_UNIT_PATTERN.test(rowLabelEn)) {
          errors.push(`[${pump.slug}] centralized label for "${row.key}" must be unit-neutral`);
        }

        if (isConnectionRow(row)) {
          const marketSets = Array.isArray(row.connections) ? row.connections : [row.connections];
          const expectedModelCount = modelColumnsFromSpecsTable(pump.specsTable.columns);
          if (Array.isArray(row.connections) && row.connections.length !== expectedModelCount) {
            errors.push(
              `[${pump.slug}] row "${row.key}" has ${row.connections.length} market connection entries; expected ${expectedModelCount}`
            );
          }
          if (marketSets.length === 0) {
            errors.push(`[${pump.slug}] row "${row.key}" must include at least one market connection spec`);
          }

          for (const [marketIndex, marketSet] of marketSets.entries()) {
            const selected = selectPreferredConnectionSpec(marketSet);
            if (!selected) {
              errors.push(
                `[${pump.slug}] row "${row.key}" is missing preferred market spec at index ${marketIndex} (expected na, jp, or eu)`
              );
              continue;
            }
            if (!String(selected.size).trim()) {
              errors.push(`[${pump.slug}] row "${row.key}" has empty connection size at index ${marketIndex}`);
            }
            if (!selected.unit.trim()) {
              errors.push(`[${pump.slug}] row "${row.key}" has empty connection unit at index ${marketIndex}`);
            }
            if (!selected.standard.trim()) {
              errors.push(`[${pump.slug}] row "${row.key}" has empty connection standard at index ${marketIndex}`);
            }
          }

          const derivedValues = buildConnectionRowValues(row, modelColumnsFromSpecsTable(pump.specsTable.columns));
          if (derivedValues.length < 2) {
            errors.push(`[${pump.slug}] row "${row.key}" derived connection values must include display pairs`);
          }
          if (derivedValues.some((value) => !value.trim())) {
            errors.push(`[${pump.slug}] row "${row.key}" has empty derived connection display value`);
          }
        } else {
          if (row.values.length < 2) {
            errors.push(`[${pump.slug}] row "${row.key}" must include metric and imperial values`);
          }

          const [metric, imperial] = row.values;
          if (!metric || !metric.trim()) {
            errors.push(`[${pump.slug}] row "${row.key}" has empty metric value`);
          }
          if (!imperial || !imperial.trim()) {
            errors.push(`[${pump.slug}] row "${row.key}" has empty imperial value`);
          }
        }
      }

      const missing = requiredKeys.filter((key) => !seen.has(key));
      if (missing.length > 0) {
        errors.push(`[${pump.slug}] missing spec key(s) in "${group.title}": ${missing.join(', ')}`);
      }
      if (duplicates.size > 0) {
        errors.push(`[${pump.slug}] duplicate spec key(s) in "${group.title}": ${Array.from(duplicates).join(', ')}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid spec table data in firepumps:\n- ${errors.join('\n- ')}`);
  }
};
