import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import path from "path";
import fs from "fs";
import protobuf from "protobufjs";

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
  const root = maybeRoot; // now safely typed
  const Trade = root.lookupType("Trade");
  wss.on("connection", (ws: WebSocket) => {
    console.log("🔗 Client connected");
    const interval = setInterval(() => {
      const payload = {
        symbol: ["AAPL", "GOOG", "MSFT"][Math.floor(Math.random() * 3)],
        price: +(100 + Math.random() * 100).toFixed(2),
        volume: Math.floor(Math.random() * 500),
        timestamp: Date.now(),
      };
      const message = Trade.create(payload);
      const buffer = Trade.encode(message).finish();
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
