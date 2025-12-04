import { Router } from "express";
import { candlesController } from "../controllers/candles";

const router = Router();

router.get("/", candlesController.getCandles);

export default router;
