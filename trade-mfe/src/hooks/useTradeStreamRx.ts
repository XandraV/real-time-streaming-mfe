import { useEffect } from "react";
import { webSocket } from "rxjs/webSocket";
import { map, tap } from "rxjs/operators";
import protobuf from "protobufjs";
import tradeProtoUrl from "../proto/trade.proto?url";
import type { RowsMap, Instrument } from "../types";

const WS_URL = import.meta.env.VITE_WS_URL;
/**
 * Streams trade data over WebSocket and calls onTrades() with new batches.
 * Emits an array of trades each time new data arrives.
 */
export const useTradeStreamRx = (onTrades?: (trades: Instrument[]) => void) => {
  useEffect(() => {
    let subscription: any;

    protobuf.load(tradeProtoUrl).then((root) => {
      const tradeBatchType = root.lookupType("TradeBatch");
      const socket$ = webSocket({
        url: WS_URL,
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
          return trades as Instrument[];
        }),
        tap((trades) => {
          // update local snapshot
          rowsRef = {};
          trades.forEach((t) => (rowsRef[t.ticker] = t));
        }),
        // Throttle updates
        // throttleTime(300, undefined, { leading: true, trailing: true }),

        map(() => Object.values(rowsRef))
      );

      subscription = stream$.subscribe({
        next: (trades: Instrument[]) => {
          onTrades?.(trades);
        },
        error: (err) => console.error("WebSocket error", err),
      });
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [onTrades]);
};

