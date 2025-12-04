import { Router } from "express";
import { blotterController } from "../controllers/blotter";

const router = Router();

router.get("/", blotterController.getBlotter);

export default router;
