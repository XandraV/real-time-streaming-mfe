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
    console.log(
      `Initial send: ${data.length} instruments, ${fullBuffer.length} bytes`,
    );
    ws.send(fullBuffer);

    const interval = setInterval(() => {
      // Pick a unique random subset of instruments to update this tick.
      const count = Math.min(data.length, Math.floor(3 + Math.random() * 10));
      const pool = [...data];
      const picked: typeof data = [];
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        picked.push(pool[idx]);
        pool.splice(idx, 1);
      }

      const updates = picked.map((row) => ({
        ...row,
        quantity: +(100 + Math.random() * 10).toFixed(2),
        price: +(100 + Math.random() * 100).toFixed(2),
        purchasePrice: +(Math.random() * 500).toFixed(2),
      }));

      const message = TradeBatch.create({ trades: updates });
      const buffer = TradeBatch.encode(message).finish();

      ws.send(buffer);
    }, 500);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("❌ Client connected"); // Note: "Client disconnected" in logic
    });
  });
});

server.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
