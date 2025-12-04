import { Request, Response } from "express";
import { blotterService } from "../services/blotter";

export const blotterController = {
  getBlotter(req: Request, res: Response) {
    const account = String(req.query.searchString ?? "").toUpperCase();

    if (!account) {
      return res
        .status(400)
        .json({ error: "Missing required query param: account" });
    }

    const result = blotterService.generateBlotter();

    res.json({ result });
  },
};
