import { getHeroFeatureLabel } from '../../i18n/heroFeatureLabels';
import { localizeSpecGroupTitle, localizeSpecLabel } from '../specLabels';
import { replaceAllFr } from './frReplacements';
import { buildConnectionRowValues, isConnectionRow, modelColumnsFromSpecsTable } from './spec-utils';
import type { Firepump, FirepumpLocale, LocalizedValue } from './types';

export const localizeString = (value: string, locale: FirepumpLocale): string => {
  if (locale !== 'fr') return value;
  return replaceAllFr(value)
    .replace(/\b(\d+)\.(\d+)\b/g, '$1,$2')
    .replace(/(\d(?:,\d+)?)\s*sec\b/g, '$1 s')
    .replace(/(\d(?:,\d+)?)\s*in\b/g, '$1 po')
    .replace(/(\d(?:,\d+)?)\s*ft\b/g, '$1 pi');
};

export const localizeHeroFeatureValue = (value: string | LocalizedValue, locale: FirepumpLocale): string =>
  typeof value === 'string' ? localizeString(value, locale) : value[locale];

export const localizePrimingSpecValueFr = (value: string): string =>
  replaceAllFr(value)
    .replace(/\b(\d+)\.(\d+)\b/g, '$1,$2')
    .replace(/(\d(?:,\d+)?)\s*sec\b/g, '$1 s')
    .replace(/suction head/g, 'de hauteur d’aspiration');

export const localizePump = (pump: Firepump, locale: FirepumpLocale): Firepump => {
  return {
    ...pump,
    subtitle: localizeString(pump.subtitle, locale),
    description: localizeString(pump.description, locale),
    valueProp: localizeString(pump.valueProp, locale),
    features: pump.features.map((feature) => ({
      ...feature,
      label: localizeString(feature.label, locale),
    })),
    keySpecs: pump.keySpecs.map((spec) => ({
      ...spec,
      label: getHeroFeatureLabel(spec.key, locale),
      value: localizeHeroFeatureValue(spec.value, locale),
    })),
    benefits: pump.benefits.map((benefit) => ({
      title: localizeString(benefit.title, locale),
      description: localizeString(benefit.description, locale),
    })),
    specsTable: {
      columns: pump.specsTable.columns.map((column) => localizeSpecLabel(column, locale)),
      groups: pump.specsTable.groups.map((group) => ({
        title: localizeSpecGroupTitle(group.title, locale),
        rows: group.rows.map((row) => {
          if (isConnectionRow(row)) {
            return {
              ...row,
              values: buildConnectionRowValues(row, modelColumnsFromSpecsTable(pump.specsTable.columns)),
            };
          }

          return {
            ...row,
            values: row.values.map((value) =>
              locale === 'fr' && row.key === 'primingPerformance'
                ? localizePrimingSpecValueFr(value)
                : localizeString(value, locale)
            ),
          };
        }),
      })),
    },
    performance: pump.performance.map((item) => ({
      label: localizeSpecLabel(item.label, locale),
      value: localizeString(item.value, locale),
    })),
  };
};

