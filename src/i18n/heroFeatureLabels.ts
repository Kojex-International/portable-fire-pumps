export type HeroFeatureLocale = 'en' | 'fr';

export type HeroFeatureLabelKey =
  | 'coolingSystem'
  | 'pumpModel'
  | 'engineType'
  | 'maxPressure'
  | 'primingTime'
  | 'flowRate';

export const HERO_FEATURE_LABELS: Record<HeroFeatureLabelKey, { en: string; fr: string }> = {
  coolingSystem: { en: 'Cooling system', fr: 'Système de refroidissement' },
  pumpModel: { en: 'Pump model', fr: 'Modèle de pompe' },
  engineType: { en: 'Engine type', fr: 'Type de moteur' },
  maxPressure: { en: 'Max pressure', fr: 'Pression maximale' },
  primingTime: { en: 'Priming performance', fr: 'Temps d’amorçage' },
  flowRate: { en: 'Discharge performance', fr: 'Débit' },
};

export const REQUIRED_HERO_FEATURE_KEYS: HeroFeatureLabelKey[] = [
  'pumpModel',
  'coolingSystem',
  'engineType',
  'maxPressure',
  'primingTime',
  'flowRate',
];

export const getHeroFeatureLabel = (key: HeroFeatureLabelKey, locale: HeroFeatureLocale): string =>
  HERO_FEATURE_LABELS[key][locale];
