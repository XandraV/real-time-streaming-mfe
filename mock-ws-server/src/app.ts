import express from "express";
import cors from "cors";

import searchRoutes from "./routes/search";
import candlesRoutes from "./routes/candles";
import blotterRoutes from "./routes/blotter";

const app = express();

// ---- Middleware ----
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

app.use(express.json());

// ---- Routes ----
app.use("/search", searchRoutes);
app.use("/candles", candlesRoutes);
app.use("/blotter", blotterRoutes);

export default app;
