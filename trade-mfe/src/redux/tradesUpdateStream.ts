import { Subject } from "rxjs";
import type { Instrument } from "../types";

// shared Subject for trade updates
export const tradesUpdateStream$ = new Subject<Instrument[]>();

export const publishTradesUpdate = (trades: Instrument[]) => {
  tradesUpdateStream$.next(trades);
};
