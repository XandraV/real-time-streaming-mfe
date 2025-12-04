import { data } from "../data/data";

export const searchService = {
  search(query: string) {
    return data
      .filter((item) =>
        [item.name, item.ticker]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .map((item) => ({
        ticker: item.ticker,
        name: item.name,
        exchange: "NASDAQ",
        price: +(Math.random() * 500).toFixed(2),
        change: +(Math.random() * 10).toFixed(2),
        changePct: +(Math.random() * 10).toFixed(2),
        ask: +(100 + Math.random() * 100).toFixed(2),
        askSize: +(100 + Math.random() * 100).toFixed(2),
        bid: +(100 + Math.random() * 100).toFixed(2),
        bidSize: +(100 + Math.random() * 100).toFixed(2),
      }));
  },
};
