import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import path from "path";
import protobuf from "protobufjs";
import { data } from "./data";
import { generateDailyCandles } from "./utils";

const PORT = 4000;

import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

app.get("/search", (req, res) => {
  const result = data.filter((item) =>
    [item.name, item.ticker]
      .join(" ")
      .toLowerCase()
      .includes((req.query.searchString as string).toLowerCase())
  );
  res.json({
    result,
  });
});

app.get("/candles", (req, res) => {
  const ticker = (req.query.searchString as string)?.toUpperCase();

  if (!ticker) {
    return res
      .status(400)
      .json({ error: "Missing required query param: ticker" });
  }
  const data1 = generateDailyCandles(2020);
  const data2 = generateDailyCandles(2021);
  const data3 = generateDailyCandles(2022);
  const data4 = generateDailyCandles(2023);
  const data5 = generateDailyCandles(2024);
  const data6 = generateDailyCandles(2025);
  const result = [...data1, ...data2, ...data3, ...data4, ...data5, ...data6];


  if (!result) {
    return res
      .status(404)
      .json({ error: `No candlestick data found for ${ticker}` });
  }

  res.json({
    ticker,
    result,
  });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

protobuf.load(path.resolve(__dirname, "./trade.proto"), (err, maybeRoot) => {
  if (err || !maybeRoot) {
    throw err ?? new Error("Failed to load trade.proto");
  }
  const root = maybeRoot;
  const TradeBatch = root.lookupType("TradeBatch");
  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");
    // send the entire dataset once on initial connection
    const fullMessage = TradeBatch.create({ trades: data });
    const fullBuffer = TradeBatch.encode(fullMessage).finish();
    ws.send(fullBuffer);

    const interval = setInterval(() => {
      const count = Math.floor(3 + Math.random() * 20);
      const updates = Array.from({ length: count }).map(() => {
        const row = data[Math.floor(Math.random() * data.length)];
        return {
          ...row,
          quantity: +(100 + Math.random() * 10).toFixed(2),
          price: +(100 + Math.random() * 100).toFixed(2),
          purchasePrice: +(Math.random() * 500).toFixed(2),
        };
      });

      const message = TradeBatch.create({ trades: updates });
      const buffer = TradeBatch.encode(message).finish();

      ws.send(buffer);
    }, 1000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("❌ Client disconnected");
    });
  });
});

server.listen(PORT, () => {
  console.log(`✅ Mock WebSocket server running at ws://localhost:${PORT}`);
});
