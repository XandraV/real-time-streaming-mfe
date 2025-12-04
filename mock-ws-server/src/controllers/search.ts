import { Request, Response } from "express";
import { searchService } from "../services/search";

export const searchController = {
  search: (req: Request, res: Response) => {
    const { searchString } = req.query;
    const result = searchService.search(String(searchString || ""));
    res.json({ result });
  },
};
