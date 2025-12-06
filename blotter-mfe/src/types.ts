export type Trade = {
  ticker: string;
  name: string;
  instrument: string;
  quantity: number;
  price: number;
  purchasePrice: number;
  status: string;
  timestamp: string;
};
export type RowsMap = Record<string, Trade>;
