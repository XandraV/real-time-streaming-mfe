import { useEffect, useRef, useState } from "react";
import protobuf from "protobufjs";
import tradeProtoUrl from "../proto/trade.proto?url";
import type { RowsMap } from "../types";

const useTradeStream = () => {
  const [rowsMap, setRowsMap] = useState<RowsMap>({});

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let isMounted = true;
    //let tradeType: protobuf.Type;
    let tradeBatchType: protobuf.Type;

    protobuf.load(tradeProtoUrl).then((root) => {
      if (!isMounted) return;
      // tradeType = root.lookupType("Trade");
      tradeBatchType = root.lookupType("TradeBatch");
      const socket = new WebSocket("ws://localhost:4000");
      socketRef.current = socket;

      socket.onopen = () => console.log("WebSocket connected");

      socket.onmessage = async (event) => {
        if (!tradeBatchType) return;
        const buffer = await event.data.arrayBuffer();
        const message = tradeBatchType.decode(new Uint8Array(buffer));
        const batch = tradeBatchType.toObject(message, {
          longs: String,
          enums: String,
          bytes: String,
        });
        console.log("💬 Received new message: ", batch);
        setRowsMap((prev) => {
          const updated = { ...prev };
          for (const row of batch.trades) {
            updated[row.ticker] = row;
          }
          return updated;
        });
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
  return rowsMap;
};

export default useTradeStream;
