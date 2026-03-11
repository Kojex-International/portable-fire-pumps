export type SpecLocale = 'en' | 'fr';

export type SpecGroupKey = 'modelGroup' | 'pumpGroup' | 'engineGroup' | 'vacuumPumpGroup' | 'featuresGroup';

export const SPEC_LABELS = {
  metric: { en: 'Metric', fr: 'Metric' },
  imperial: { en: 'Imperial', fr: 'Imperial' },
  specification: { en: 'Specification', fr: 'Spécification' },
  modelGroup: { en: 'Model', fr: 'Modèle' },
  pumpGroup: { en: 'Pump', fr: 'Pompe' },
  engineGroup: { en: 'Engine', fr: 'Moteur' },
  vacuumPumpGroup: { en: 'Vacuum Pump', fr: 'Pompe à vide' },
  featuresGroup: { en: 'Features', fr: 'Caractéristiques' },
  model: { en: 'Model', fr: 'Modèle' },
  type: { en: 'Type', fr: 'Type' },
  dimensions: { en: 'Overall Dimensions (L × W × H)', fr: 'Dimensions hors tout (L × l × H)' },
  dryWeight: { en: 'Dry Weight', fr: 'Poids à sec' },
  dischargePerformance: { en: 'Discharge performance', fr: 'Débit' },
  primingPerformance: { en: 'Priming performance at', fr: 'Temps d’amorçage à' },
  dischargeDiameterJis: { en: 'Discharge Diameter', fr: 'Diamètre de refoulement' },
  suctionDiameterJis: { en: 'Suction Diameter', fr: 'Diamètre d’aspiration' },
  coolingSystem: { en: 'Cooling system', fr: 'Système de refroidissement' },
  cylinderCount: { en: 'No of cylinder', fr: 'Nombre de cylindres' },
  fuelSystem: { en: 'Fuel system', fr: 'Système d’alimentation' },
  displacement: { en: 'Displacement', fr: 'Cylindrée' },
  boreStroke: { en: 'Bore x Stroke', fr: 'Alésage × course' },
  maxOutput: { en: 'Max output', fr: 'Puissance maximale' },
  ratedOutput: { en: 'Rated output', fr: 'Puissance nominale' },
  startingSystem: { en: 'Starting', fr: 'Système de démarrage' },
  fuelTankCapacity: { en: 'Fuel tank capacity', fr: 'Capacité du réservoir de carburant' },
  fuelConsumption: { en: 'Fuel Consumption', fr: 'Consommation de carburant' },
  fuelType: { en: 'Fuel type', fr: 'Type de carburant' },
  vaneMaterial: { en: 'Blade type', fr: 'Matériau des palettes' },
  maxSuctionHeight: { en: 'Maximum suction height', fr: 'Hauteur d’aspiration maximale' },
  featureOriginalEngine: {
    en: 'Shibaura Original 2 cycle Gasoline Engine',
    fr: 'Moteur essence 2 temps original Shibaura',
  },
  featureOriginalCentrifugalPump: {
    en: 'Shibaura Original Centrifugal Pump',
    fr: 'Pompe centrifuge originale Shibaura',
  },
  featureOriginalVacuumPump: {
    en: 'Shibaura Original Vacuum Pump',
    fr: 'Pompe à vide originale Shibaura',
  },
  featureAlertMonitoringSystem: {
    en: 'Alert Monitoring System',
    fr: 'Système de surveillance avec alerte',
  },
  featureQuickDischargeValve: {
    en: 'Quick Discharge Valve',
    fr: 'Vanne de refoulement rapide',
  },
} as const;

export type SpecKey = keyof typeof SPEC_LABELS;
export type SpecLabelKey = SpecKey;

export const MODEL_SPEC_KEYS = ['dimensions', 'dryWeight'] as const;
export const PUMP_SPEC_KEYS = [
  'model',
  'type',
  'dischargePerformance',
  'primingPerformance',
  'dischargeDiameterJis',
  'suctionDiameterJis',
] as const;
export const ENGINE_SPEC_KEYS = [
  'model',
  'type',
  'coolingSystem',
  'cylinderCount',
  'fuelSystem',
  'displacement',
  'boreStroke',
  'ratedOutput',
  'startingSystem',
  'fuelTankCapacity',
  'fuelConsumption',
  'fuelType',
] as const;
export const VACUUM_PUMP_SPEC_KEYS = ['type', 'vaneMaterial', 'maxSuctionHeight'] as const;
export const FEATURES_SPEC_KEYS = [
  'featureOriginalEngine',
  'featureOriginalCentrifugalPump',
  'featureOriginalVacuumPump',
  'featureAlertMonitoringSystem',
  'featureQuickDischargeValve',
] as const;

export type ModelSpecKey = (typeof MODEL_SPEC_KEYS)[number];
export type PumpSpecKey = (typeof PUMP_SPEC_KEYS)[number];
export type EngineSpecKey = (typeof ENGINE_SPEC_KEYS)[number];
export type VacuumPumpSpecKey = (typeof VACUUM_PUMP_SPEC_KEYS)[number];
export type FeaturesSpecKey = (typeof FEATURES_SPEC_KEYS)[number];

const SPEC_LABEL_ALIASES: Record<string, SpecKey> = {
  Metric: 'metric',
  Imperial: 'imperial',
  Model: 'model',
  Type: 'type',
  'Dimensions LxWxH (mm)': 'dimensions',
  'Dimensions (L × W × H)': 'dimensions',
  'Overall Dimensions (L × W × H)': 'dimensions',
  'Dry Weight': 'dryWeight',
  'Discharge Diameter': 'dischargeDiameterJis',
  'Discharge Diameter JIS': 'dischargeDiameterJis',
  'Suction Diameter': 'suctionDiameterJis',
  'Suction Diameter JIS': 'suctionDiameterJis',
  'Cooling system': 'coolingSystem',
  'No of cylinder': 'cylinderCount',
  'Fuel system': 'fuelSystem',
  Displacement: 'displacement',
  'Bore x Stroke': 'boreStroke',
  'Max output': 'maxOutput',
  'Rated output': 'ratedOutput',
  Starting: 'startingSystem',
  'Fuel tank capacity': 'fuelTankCapacity',
  'Fuel consumption': 'fuelConsumption',
  'Fuel Consumption': 'fuelConsumption',
  'Fuel type': 'fuelType',
  'Blade type': 'vaneMaterial',
  'Maximum suction height': 'maxSuctionHeight',
  Features: 'featuresGroup',
  Engine: 'engineGroup',
  Pump: 'pumpGroup',
  'Vacuum Pump': 'vacuumPumpGroup',
  'Vacuum Pompe': 'vacuumPumpGroup',
  Modèle: 'modelGroup',
  Pompe: 'pumpGroup',
  Moteur: 'engineGroup',
  'Pompe à vide': 'vacuumPumpGroup',
  Caractéristiques: 'featuresGroup',
  'Poids à sec': 'dryWeight',
  'Dimensions (L × l × H) (mm)': 'dimensions',
  'Dimensions (L × l × H)': 'dimensions',
  'Dimensions hors tout (L × l × H)': 'dimensions',
  'Temps d’amorçage à': 'primingPerformance',
  'Temps d’amorçage à hauteur d’aspiration': 'primingPerformance',
  Débit: 'dischargePerformance',
  'Diamètre de refoulement (JIS)': 'dischargeDiameterJis',
  'Diamètre de refoulement': 'dischargeDiameterJis',
  'Diamètre d’aspiration (JIS)': 'suctionDiameterJis',
  'Diamètre d’aspiration': 'suctionDiameterJis',
  'Système de refroidissement': 'coolingSystem',
  'Nombre de cylindres': 'cylinderCount',
  'Système d’alimentation': 'fuelSystem',
  Cylindrée: 'displacement',
  'Alésage × course': 'boreStroke',
  'Puissance maximale': 'maxOutput',
  'Puissance nominale': 'ratedOutput',
  'Système de démarrage': 'startingSystem',
  'Capacité du réservoir de carburant': 'fuelTankCapacity',
  'Consommation de carburant': 'fuelConsumption',
  'Type de carburant': 'fuelType',
  'Matériau des palettes': 'vaneMaterial',
  'Hauteur d’aspiration maximale': 'maxSuctionHeight',
  'Moteur essence 2 temps original Shibaura': 'featureOriginalEngine',
  'Pompe centrifuge originale Shibaura': 'featureOriginalCentrifugalPump',
  'Pompe à vide originale Shibaura': 'featureOriginalVacuumPump',
  'Système de surveillance avec alerte': 'featureAlertMonitoringSystem',
  'Vanne de refoulement rapide': 'featureQuickDischargeValve',
  'Shibaura Original 2 cycle Gasoline Engine': 'featureOriginalEngine',
  'Shibaura Original 2 cycle Gasoline Moteur': 'featureOriginalEngine',
  'Shibaura Original Centrifugal Pump': 'featureOriginalCentrifugalPump',
  'Shibaura Original Centrifugal Pompe': 'featureOriginalCentrifugalPump',
  'Shibaura Original Vacuum Pump': 'featureOriginalVacuumPump',
  'Shibaura Original Vacuum Pompe': 'featureOriginalVacuumPump',
  'Alert Monitoring System': 'featureAlertMonitoringSystem',
  'Quick Discharge Valve': 'featureQuickDischargeValve',
};

const SPEC_GROUP_TITLE_ALIASES: Record<string, SpecGroupKey> = {
  Model: 'modelGroup',
  Modèle: 'modelGroup',
  Pump: 'pumpGroup',
  Pompe: 'pumpGroup',
  Engine: 'engineGroup',
  Moteur: 'engineGroup',
  'Vacuum Pump': 'vacuumPumpGroup',
  'Vacuum Pompe': 'vacuumPumpGroup',
  'Pompe à vide': 'vacuumPumpGroup',
  Features: 'featuresGroup',
  Caractéristiques: 'featuresGroup',
};

export const REQUIRED_SPEC_KEYS: Record<SpecGroupKey, readonly SpecKey[]> = {
  modelGroup: MODEL_SPEC_KEYS,
  pumpGroup: PUMP_SPEC_KEYS,
  engineGroup: ENGINE_SPEC_KEYS,
  vacuumPumpGroup: VACUUM_PUMP_SPEC_KEYS,
  featuresGroup: FEATURES_SPEC_KEYS,
};

const normalizeDischargeQualifierFr = (qualifier: string): string =>
  qualifier
    .replace(/(\d)\.(\d)\s*MPa/g, '$1,$2 MPa')
    .replace(/(\d(?:,\d+)?)\s*MPa/g, '$1 MPa')
    .replace(/(\d)\s*m suction head/g, 'hauteur d’aspiration $1 m')
    .replace(/(\d)m suction head/g, 'hauteur d’aspiration $1 m')
    .replace(/\s+/g, ' ')
    .trim();

const extractDischargeQualifier = (label: string): string | null => {
  const match = label.match(/^(?:Discharge performance|Performance de refoulement|Débit)\s*\((.+)\)\s*$/i);
  return match ? match[1].trim() : null;
};

const extractPrimingHead = (label: string): string | null => {
  const match = label.match(/^(?:Priming performance at|Temps d’amorçage à hauteur d’aspiration|Temps d’amorçage à)\s+(\d)\s*m/i);
  return match ? `${match[1]} m` : null;
};

export const getSpecLabel = (key: SpecKey, locale: SpecLocale): string => SPEC_LABELS[key][locale];

export const getSpecLabelKey = (label: string): SpecKey | null => {
  if (SPEC_LABEL_ALIASES[label]) return SPEC_LABEL_ALIASES[label];
  if (extractDischargeQualifier(label)) return 'dischargePerformance';
  if (extractPrimingHead(label)) return 'primingPerformance';
  return null;
};

export const isDischargePerformanceLabel = (label: string): boolean => getSpecLabelKey(label) === 'dischargePerformance';

export const getDischargeSubLabel = (
  pressureMPa: string,
  suctionHeightM: string,
  locale: SpecLocale
): string => {
  const normalizedPressure = pressureMPa.trim();
  const normalizedSuctionHeight = suctionHeightM.trim();
  if (locale === 'fr') {
    return `${normalizedPressure.replace('.', ',')} MPa, hauteur d’aspiration ${normalizedSuctionHeight} m`;
  }
  return `${normalizedPressure}MPa, ${normalizedSuctionHeight}m suction head`;
};

export const getPrimingQualifierLabel = (qualifier: string, locale: SpecLocale): string => {
  const normalizedQualifier = qualifier.trim();
  if (locale === 'fr') {
    return normalizedQualifier.replace('.', ',');
  }
  return normalizedQualifier;
};

export const localizeSpecLabel = (label: string, locale: SpecLocale): string => {
  const key = getSpecLabelKey(label);
  if (!key) return label;

  if (key === 'dischargePerformance') {
    const qualifier = extractDischargeQualifier(label);
    if (!qualifier) return getSpecLabel(key, locale);
    const localQualifier = locale === 'fr' ? normalizeDischargeQualifierFr(qualifier) : qualifier;
    return `${getSpecLabel(key, locale)} (${localQualifier})`;
  }

  if (key === 'primingPerformance') {
    const head = extractPrimingHead(label);
    if (!head) return getSpecLabel(key, locale);
    return `${getSpecLabel(key, locale)} ${head}`;
  }

  return getSpecLabel(key, locale);
};

export const localizeSpecGroupTitle = (title: string, locale: SpecLocale): string => {
  const key = SPEC_GROUP_TITLE_ALIASES[title];
  if (key) return getSpecLabel(key, locale);
  return title;
};

export const getSpecGroupKey = (title: string): SpecGroupKey | null => {
  const key = SPEC_GROUP_TITLE_ALIASES[title];
  if (!key) return null;
  if (key === 'modelGroup' || key === 'pumpGroup' || key === 'engineGroup' || key === 'vacuumPumpGroup' || key === 'featuresGroup') {
    return key;
  }
  return null;
};
