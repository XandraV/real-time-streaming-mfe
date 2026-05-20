import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Instrument } from "../../types";

interface InstrumentsState {
  selectedInstrument: Instrument | null;
  tradeUpdates: Instrument[];
}

const initialState: InstrumentsState = {
  selectedInstrument: null,
  tradeUpdates: [],
};

export const instrumentSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setSelectedInstrument: (state, action: PayloadAction<Instrument>) => {
      state.selectedInstrument = action.payload;
    },
    updateTrades: (state, action: PayloadAction<Instrument[]>) => {
      state.tradeUpdates = action.payload;
    },
  },
});

export const { setSelectedInstrument, updateTrades } = instrumentSlice.actions;
export default instrumentSlice.reducer;
