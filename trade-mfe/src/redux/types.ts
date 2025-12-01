export type Instrument = {
  ticker: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePct: number;
  ask: number;
  askSize: number;
  bid: number;
  bidSize: number;
};
