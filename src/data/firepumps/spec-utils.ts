import type { SpecKey } from '../specLabels';
import type { ConnectionSpec, ConnectionSpecRow, MarketConnectionSpecs, SpecTableGroup } from './spec-types';

export function isConnectionRow(row: SpecTableGroup['rows'][number]): row is ConnectionSpecRow {
  return row.key === 'dischargeDiameterJis' || row.key === 'suctionDiameterJis';
}

export function formatConnectionSpec(spec: ConnectionSpec): string {
  const size = String(spec.size).trim();
  const standard = spec.standard.trim();
  if (standard.toUpperCase() === 'JIS') {
    return `${size} ${spec.unit} (JIS)`;
  }
  return `${size} ${spec.unit} ${standard}`;
}

export function selectPreferredConnectionSpec(markets: MarketConnectionSpecs): ConnectionSpec | null {
  return markets.na ?? markets.jp ?? markets.eu ?? null;
}

export function modelColumnsFromSpecsTable(columns: string[]): number {
  return columns.length > 2 ? Math.floor(columns.length / 2) : 1;
}

export function buildConnectionRowValues(row: ConnectionSpecRow, modelCount: number): string[] {
  const marketSet = Array.isArray(row.connections)
    ? row.connections
    : Array.from({ length: modelCount }, () => row.connections);

  return marketSet.flatMap((marketSpec) => {
    const selected = selectPreferredConnectionSpec(marketSpec);
    const display = selected ? formatConnectionSpec(selected) : '';
    return [display, display];
  });
}

export const SPEC_LABEL_UNIT_PATTERN = /\b(mm|cm|m|in|ft|MPa|L\/min|JIS|psi|gpm)\b/i;
export const UNIT_NEUTRAL_SPEC_KEYS = new Set<SpecKey>(['dimensions', 'dischargeDiameterJis', 'suctionDiameterJis']);
export const REPEATED_ALLOWED_SPEC_KEYS = new Set<SpecKey>(['dischargePerformance', 'maximumDischargePerformance']);
