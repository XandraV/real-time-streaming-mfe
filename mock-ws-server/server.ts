import WebSocket, { WebSocketServer } from "ws";
import path from "path";
import protobuf from "protobufjs";
import { data } from "./src/data/data";

import http from "http";
import app from "./src/app";

const PORT = process.env.PORT || 4000;

export const server = http.createServer(app);

// Websocket setup for instrument grid
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
  console.log(`Mock server running at http://localhost:${PORT}`);
});
