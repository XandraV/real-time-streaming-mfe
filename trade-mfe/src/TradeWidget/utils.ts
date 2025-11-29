import {
  type CandlestickData,
} from "lightweight-charts";

export function generateDailyCandles(year: number): CandlestickData[] {
  const candles: CandlestickData[] = [];

  // Start with a random base price
  let currentPrice = 100 + Math.random() * 20;

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const open = currentPrice;

      // Random small percentage movement (±3%)
      const change = open * (Math.random() * 0.06 - 0.03);

      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;

      currentPrice = close; // next day starts from previous close

      candles.push({
        time: dateStr,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
      });
    }
  }

  return candles;
}