export type Interval = ReturnType<typeof setInterval>;
export type Ticker = string;

export interface MapCell {
  rowName: string;
  colName: string;
  correlation: number;
  id: string;
  row: number;
  col: number;
}

export interface UseCorrelationMap {
  corrMap: MapCell[];
  createMap: (names: string[], colsCount: number) => void;
  updateMapValue: (colsCount: number) => void;
}
