import { useEffect, useState, useRef } from "react";
import { webSocket } from "rxjs/webSocket";
import { map, tap, throttleTime } from "rxjs/operators";
import protobuf from "protobufjs";
import tradeProtoUrl from "../proto/trade.proto?url";
import type { RowsMap } from "../types";

const useTradeStreamRx = () => {
  const [rowsMap, setRowsMap] = useState<RowsMap>({});
  const rowsRef = useRef<RowsMap>({}); // mutable live store

  useEffect(() => {
    let subscription: any;

    protobuf.load(tradeProtoUrl).then((root) => {
      const tradeBatchType = root.lookupType("TradeBatch");

      const socket$ = webSocket({
        url: "ws://localhost:4000",
        binaryType: "arraybuffer",
        deserializer: (e) => e.data,
      });

      const stream$ = socket$.pipe(
        map((data: ArrayBuffer) => {
          const message = tradeBatchType.decode(new Uint8Array(data));
          const { trades } = tradeBatchType.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
          }) as any;
          return trades;
        }),

        // Update the ref synchronously (no React re-render)
        tap((trades) => {
          trades.forEach((trade: any) => {
            rowsRef.current[trade.ticker] = trade;
          });
        }),

        // Emit latest snapshot at most every 300ms
        throttleTime(300, undefined, { leading: true, trailing: true }),
        map(() => ({ ...rowsRef.current }))
      );

      subscription = stream$.subscribe({
        next: (snapshot) => setRowsMap(snapshot),
        error: (err) => console.error("WebSocket error", err),
      });
    });

    return () => subscription?.unsubscribe();
  }, []);

  return rowsMap;
};

export default useTradeStreamRx;
