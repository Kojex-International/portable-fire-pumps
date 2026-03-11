import type { EngineSpecKey, FeaturesSpecKey, ModelSpecKey, PumpSpecKey, SpecKey, VacuumPumpSpecKey } from '../specLabels';

export type SpecRow<K extends SpecKey> = {
  key: K;
  values: string[];
};

export type ConnectionKey = 'dischargeDiameterJis' | 'suctionDiameterJis';

export type ConnectionSpec = {
  size: number | string;
  unit: 'mm' | 'in';
  standard: string;
};

export type MarketConnectionSpecs = {
  jp?: ConnectionSpec;
  na?: ConnectionSpec;
  eu?: ConnectionSpec;
};

export type ConnectionSpecRow<K extends ConnectionKey = ConnectionKey> = {
  key: K;
  connections: MarketConnectionSpecs | MarketConnectionSpecs[];
  values?: string[];
};

export type PrimingPerformanceSpecRow = SpecRow<'primingPerformance'> & {
  qualifier: string;
};

export type DischargePerformanceSpecRow = SpecRow<'dischargePerformance'> & {
  pressureMPa: string;
  suctionHeightM: string;
};

export type ModelSpecRow = SpecRow<ModelSpecKey>;
export type PumpSpecRow =
  | SpecRow<Exclude<PumpSpecKey, 'dischargePerformance' | 'primingPerformance' | ConnectionKey>>
  | ConnectionSpecRow
  | PrimingPerformanceSpecRow
  | DischargePerformanceSpecRow;
export type EngineSpecRow = SpecRow<EngineSpecKey | 'maxOutput'>;
export type VacuumPumpSpecRow = SpecRow<VacuumPumpSpecKey>;
export type FeaturesSpecRow = SpecRow<FeaturesSpecKey>;

export type ModelSpecGroup = {
  title: 'Model';
  rows: ModelSpecRow[];
};

export type PumpSpecGroup = {
  title: 'Pump';
  rows: PumpSpecRow[];
};

export type EngineSpecGroup = {
  title: 'Engine';
  rows: EngineSpecRow[];
};

export type VacuumPumpSpecGroup = {
  title: 'Vacuum Pump';
  rows: VacuumPumpSpecRow[];
};

export type FeaturesSpecGroup = {
  title: 'Features';
  rows: FeaturesSpecRow[];
};

export type SpecTableGroup =
  | ModelSpecGroup
  | PumpSpecGroup
  | EngineSpecGroup
  | VacuumPumpSpecGroup
  | FeaturesSpecGroup;
