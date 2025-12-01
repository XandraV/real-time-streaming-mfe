import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Instrument } from "../types";

interface InstrumentsState {
  list: Instrument[];
  selectedInstrument: Instrument | null;
}

const initialState: InstrumentsState = { list: [], selectedInstrument: null };

export const instrumentSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setInstruments: (state, action: PayloadAction<Instrument[]>) => {
      state.list = action.payload;
    },
    setSelectedInstrument: (state, action: PayloadAction<Instrument>) => {
      state.selectedInstrument = action.payload;
    },
  },
});

export const { setInstruments, setSelectedInstrument } =
  instrumentSlice.actions;
export default instrumentSlice.reducer;
