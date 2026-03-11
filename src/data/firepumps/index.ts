import type { Firepump, FirepumpLocale } from './types';
import { localizePump } from './localize';
import { validateHeroKeySpecs, validateSpecTables } from './validation';
import { ft510_a } from './pumps/ft510-a';
import { ft300_400_a } from './pumps/ft300-400-a';
import { tf516mh_ab } from './pumps/tf516mh-ab';
import { p572s_a } from './pumps/p572s-a';
import { fk500_a } from './pumps/fk500-a';
import { ff500ar_a } from './pumps/ff500ar-a';

export const firepumps: Firepump[] = [
  ft510_a,
  ft300_400_a,
  tf516mh_ab,
  p572s_a,
  fk500_a,
  ff500ar_a,
];

validateHeroKeySpecs(firepumps);
validateSpecTables(firepumps);

export const getFirepumps = (locale: FirepumpLocale = 'en'): Firepump[] =>
  firepumps.map((pump) => localizePump(pump, locale));

export type { Firepump, FirepumpFeature, FirepumpLocale, LocalizedValue } from './types';
export type {
  ConnectionKey,
  ConnectionSpec,
  MarketConnectionSpecs,
  ConnectionSpecRow,
  PrimingPerformanceSpecRow,
  DischargePerformanceSpecRow,
  ModelSpecRow,
  PumpSpecRow,
  EngineSpecRow,
  VacuumPumpSpecRow,
  FeaturesSpecRow,
  ModelSpecGroup,
  PumpSpecGroup,
  EngineSpecGroup,
  VacuumPumpSpecGroup,
  FeaturesSpecGroup,
  SpecTableGroup,
} from './spec-types';
export {
  isConnectionRow,
  formatConnectionSpec,
  selectPreferredConnectionSpec,
  modelColumnsFromSpecsTable,
  buildConnectionRowValues,
} from './spec-utils';
