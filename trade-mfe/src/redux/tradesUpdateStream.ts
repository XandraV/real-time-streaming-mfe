import { ReplaySubject } from "rxjs";
import type { InstrumentGridRow } from "../types";

// Replay the last full snapshot to late subscribers so a grid that mounts
// after the initial WS message still receives the seed data.
export const tradesUpdateStream$ = new ReplaySubject<InstrumentGridRow[]>(1);

export const publishTradesUpdate = (trades: InstrumentGridRow[]) => {
  tradesUpdateStream$.next(trades);
};
