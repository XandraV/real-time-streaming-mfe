import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Instrument } from "../types";

interface InstrumentsState {
  selectedInstrument: Instrument | null;
}

const initialState: InstrumentsState = { selectedInstrument: null };

export const instrumentSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setSelectedInstrument: (state, action: PayloadAction<Instrument>) => {
      state.selectedInstrument = action.payload;
    },
  },
});

export const { setSelectedInstrument } = instrumentSlice.actions;
export default instrumentSlice.reducer;
