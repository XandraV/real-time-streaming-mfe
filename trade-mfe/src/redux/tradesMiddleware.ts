import { createListenerMiddleware } from "@reduxjs/toolkit";
import { webSocket } from "rxjs/webSocket";
import { map, retry, tap } from "rxjs/operators";
import { timer, Subscription } from "rxjs";
import protobuf from "protobufjs";
import tradeProtoUrl from "../proto/trade.proto?url";
import { updateTrades } from "./services/instrumentSlice";
import { publishTradesUpdate } from "./tradesUpdateStream";
import type { InstrumentGridRow, RowsMap } from "../types";

const WS_URL = import.meta.env.VITE_WS_URL;

let subscription: Subscription | null = null;

export const tradesListenerMiddleware = createListenerMiddleware();

tradesListenerMiddleware.startListening({
  predicate: () => true,
  effect: async (_, { dispatch }) => {
    if (subscription) return;

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
          });
          return trades as InstrumentGridRow[];
        }),
        tap((trades) => {
          // Accumulate: initial WS message seeds all rows; subsequent ticks
          // overwrite only the tickers that changed. Emitting the full state
          // means late subscribers (and the ReplaySubject) always see every row.
          trades.forEach((t) => (rowsRef[t.ticker] = t));
        }),
        map(() => Object.values(rowsRef)),
        retry({
          count: 5,
          delay: (_, attempt) => {
            const timeout = Math.min(30000, 1000 * 2 ** attempt);
            console.warn(
              `[WS] disconnected – retrying in ${timeout / 1000}s (attempt ${
                attempt + 1
              })`,
            );
            return timer(timeout);
          },
        }),
      );

      subscription = stream$.subscribe({
        next: (trades: InstrumentGridRow[]) => {
          dispatch(updateTrades(trades));
          publishTradesUpdate(trades);
        },
        error: (err) => console.error("WebSocket error", err),
      });
    });
  },
});
