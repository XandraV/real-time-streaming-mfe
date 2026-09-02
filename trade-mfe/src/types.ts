export type Instrument = {
  ticker: string;
  name: string;
  instrument: string;
  quantity: number;
  purchasePrice: number;
  price: number;
  timeline: number[];
};
export type InstrumentGridRow = {
  ticker: string;
  name: string;
  instrument: string;
  quantity: number;
  purchasePrice: number;
  price: number;
  timeline: number[];
};
export type RowsMap = Record<string, InstrumentGridRow>;

export type Account = {
  id: string;
  name: string;
};
