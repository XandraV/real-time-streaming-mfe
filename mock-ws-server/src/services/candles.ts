import { generateDailyCandles } from "../utils/utils";

export const candlesService = {
  getCandles() {
    const years = [2020, 2021, 2022, 2023, 2024, 2025];

    return years.flatMap((y) => generateDailyCandles(y));
  },
};
