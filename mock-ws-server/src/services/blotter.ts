import { data } from "../data/data";

export const blotterService = {
  generateBlotter() {
    const numRows = 5 + Math.floor(Math.random() * 2); // 5–10
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selection = shuffled.slice(0, numRows);

    return selection.map((instr) => {
      const time = new Date(
        todayStr +
          "T" +
          `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:` +
          `${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:` +
          `${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`
      ).toISOString();

      return {
        ticker: instr.ticker,
        name: instr.name,
        instrument: instr.instrument,
        quantity: Math.floor(100 + Math.random() * 10),
        price: +(100 + Math.random() * 100).toFixed(2),
        purchasePrice: +(Math.random() * 500).toFixed(2),
        status: Math.random() > 0.5 ? "Booked" : "Pending",
        timestamp: time,
      };
    });
  },
};
