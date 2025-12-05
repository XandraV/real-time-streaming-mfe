export type Instrument = {
  ticker: string;
  name: string;
  instrument: string;
  quantity: number;
  purchasePrice: number;
  price: number;
  timeline: number[];
};
export type RowsMap = Record<string, Instrument>;

export type Account = {
  id: string;
  name: string;
};
