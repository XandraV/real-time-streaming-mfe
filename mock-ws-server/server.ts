import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import path from "path";
import fs from "fs";
import protobuf from "protobufjs";
import { data } from "./data";

const PORT = 4000;

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    const iconPath = path.join(__dirname, "favicon.ico");
    if (fs.existsSync(iconPath)) {
      const icon = fs.readFileSync(iconPath);
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      res.end(icon);
    } else {
      res.writeHead(404).end();
    }
  } else {
    res.writeHead(426).end("Upgrade Required");
  }
});

const wss = new WebSocketServer({ server });

protobuf.load(path.resolve(__dirname, "./trade.proto"), (err, maybeRoot) => {
  if (err || !maybeRoot) {
    throw err ?? new Error("Failed to load trade.proto");
  }
  const root = maybeRoot;
  const TradeBatch = root.lookupType("TradeBatch");
  wss.on("connection", (ws: WebSocket) => {
    console.log("🔗 Client connected");
    // send the entire dataset once on initial connection
    const fullMessage = TradeBatch.create({ trades: data });
    const fullBuffer = TradeBatch.encode(fullMessage).finish();
    ws.send(fullBuffer);

    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * data.length);
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
function getData() {
  throw new Error("Function not implemented.");
}
