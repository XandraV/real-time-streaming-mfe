import { Request, Response } from "express";
import { candlesService } from "../services/candles";

export const candlesController = {
  getCandles(req: Request, res: Response) {
    const ticker = String(req.query.searchString ?? "").toUpperCase();

    if (!ticker) {
      return res
        .status(400)
        .json({ error: "Missing required query param: ticker" });
    }

    const result = candlesService.getCandles();

    if (!result) {
      return res
        .status(404)
        .json({ error: `No candlestick data found for ${ticker}` });
    }

    res.json({
      ticker,
      result,
    });
  },
};
