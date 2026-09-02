import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Instrument } from "../redux/types";
import {
  setSelectedInstrument,
  useGetInstrumentsQuery,
} from "../redux/services";
import type { RootState } from "../redux/store";

/**
 * Hook to automatically select a default instrument if none is selected.
 * @param defaultTicker The ticker to use as default ("AAPL")
 * @returns selectedInstrument
 */
export const useDefaultInstrument = (
  defaultTicker: string = "AAPL",
): Instrument | null => {
  const dispatch = useDispatch();
  const selectedInstrument = useSelector(
    (state: RootState) => state.instruments.selectedInstrument,
  );

  const { data: defaultInstrumentData } = useGetInstrumentsQuery(
    { searchString: defaultTicker },
    { skip: !!selectedInstrument }, // skip if already selected
  );

  useEffect(() => {
    if (!selectedInstrument && defaultInstrumentData?.length) {
      dispatch(setSelectedInstrument(defaultInstrumentData[0]));
    }
  }, [defaultInstrumentData, selectedInstrument, dispatch]);

  return selectedInstrument;
};
