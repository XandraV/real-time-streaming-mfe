import { useEffect } from "react";
import { webSocket } from "rxjs/webSocket";
import { map, tap } from "rxjs/operators";
import protobuf from "protobufjs";
import tradeProtoUrl from "../proto/trade.proto?url";
import type { RowsMap, Trade } from "../types";

/**
 * Streams trade data over WebSocket and calls onTrades() with new batches.
 * Emits an array of trades each time new data arrives (not a map).
 */
const useTradeStreamRx = (onTrades?: (trades: Trade[]) => void) => {
  useEffect(() => {
    let subscription: any;

    protobuf.load(tradeProtoUrl).then((root) => {
      const tradeBatchType = root.lookupType("TradeBatch");
      const socket$ = webSocket({
        url: "ws://localhost:4000",
        binaryType: "arraybuffer",
        deserializer: (e) => e.data,
      });

      let rowsRef: RowsMap = {};

      const stream$ = socket$.pipe(
        map((data: ArrayBuffer) => {
          const message = tradeBatchType.decode(new Uint8Array(data));
          const { trades } = tradeBatchType.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
          }) as any;
          return trades as Trade[];
        }),
        tap((trades) => {
          // update local snapshot
          rowsRef = {};
          trades.forEach((t) => (rowsRef[t.ticker] = t));
        }),
        // Throttle updates (optional)
       // throttleTime(300, undefined, { leading: true, trailing: true }),
        tap(() => {
          // update local snapshot
         console.log('hi ref', Object.values(rowsRef).length)
        }),
        map(() => Object.values(rowsRef)),
      );

      subscription = stream$.subscribe({
        next: (trades: Trade[]) => {
          onTrades?.(trades);
        },
        error: (err) => console.error("WebSocket error", err),
      });
    });

    return () => {
      subscription?.unsubscribe();};
  }, [onTrades]);
};

export default useTradeStreamRx;
