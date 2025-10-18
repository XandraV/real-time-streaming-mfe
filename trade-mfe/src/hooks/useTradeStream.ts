import { useEffect, useRef, useState } from "react";
import protobuf from "protobufjs";
import tradeProtoUrl from "../proto/trade.proto?url";

export function useTradeStream() {
  const [trades, setTrades] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let isMounted = true;
    let tradeType: protobuf.Type;

    protobuf.load(tradeProtoUrl).then((root) => {
      if (!isMounted) return;
      tradeType = root.lookupType("Trade");

      // Only create one socket
      const socket = new WebSocket("ws://localhost:4000");
      socketRef.current = socket;

      socket.onopen = () => console.log("WebSocket connected");

      socket.onmessage = async (event) => {
        if (!tradeType) return;
        const buffer = await event.data.arrayBuffer();
        const message = tradeType.decode(new Uint8Array(buffer));
        const data = tradeType.toObject(message, {
          longs: String,
          enums: String,
          bytes: String,
        });
        setTrades((prev) => [data, ...prev.slice(0, 20)]);
      };

      socket.onerror = (err) => console.error("WebSocket error", err);
      socket.onclose = () => console.warn("WebSocket closed");
    });

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  return trades;
}
