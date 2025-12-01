import { useEffect, useState } from "react";
import CandlestickChart from "./CandlestickChart";
import InstrumentSearch from "./InstrumentSearch";
import styled from "styled-components";
import { useGetInstrumentsQuery } from "../../redux/services/instrumentSearchApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetCandlestickDataQuery } from "../../redux/services/candlestickDataApi";
import InstrumentInfo from "./InstrumentInfo";
import { useDispatch, useSelector } from "react-redux";
import type { Instrument } from "../../redux/types";
import { setSelectedInstrument } from "../../redux/services/instrumentSlice";
import type { RootState } from "../../redux/store";

const Wrapper = styled.div`
  font-family: poppins, sans-serif;
  display: flex;
  minheight: 540px;
  background: #172034;
  justify-content: space-between;
  border-radius: 4px;
  padding: 20px;
  flex-direction: column;
  flex: 4;
  border: 1px solid #3a4153;
`;

function TradeWidget() {
  const dispatch = useDispatch();
  const selectedInstrument = useSelector(
    (state: RootState) => state.instruments.selectedInstrument
  );
  
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 1000);

  // Fetch default instrument data (AAPL) only on initial render
  const { data: defaultInstrumentData } = useGetInstrumentsQuery(
    { searchString: "AAPL" },
    { skip: searchString.length > 0 } // skip if user started searching
  );
  useEffect(() => {
    if (defaultInstrumentData && defaultInstrumentData.length > 0) {
      dispatch(setSelectedInstrument(defaultInstrumentData[0]));
    }
  }, [defaultInstrumentData, dispatch]);

  // Fetch search results dynamically
  const { data: searchResults } = useGetInstrumentsQuery(
    { searchString: debouncedSearchString },
    { skip: debouncedSearchString.length < 3 }
  );

  const {
    data: candlestickDataResults,
    error: candlestickDataError,
    isLoading: candlestickDataIsLoading,
  } = useGetCandlestickDataQuery({
    searchString: selectedInstrument?.ticker || "AAPL",
  });
  console.log("Candlestick data:", searchResults);
  const handleChange = (value: string) => {
    setSearchString(value);
  };

  const onInstrumentSelectResult = (value: Instrument) => {
    setSelectedInstrument(value);
    setSearchString("");
    dispatch(setSelectedInstrument(value));
  };

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: -20,
          gap: 12,
        }}
      >
        {selectedInstrument && (
          <InstrumentInfo selectedInstrument={selectedInstrument} />
        )}

        <InstrumentSearch
          value={searchString}
          onChange={handleChange}
          results={searchResults ?? []}
          onSelectResult={onInstrumentSelectResult}
        />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <CandlestickChart data={candlestickDataResults ?? []} />
      </div>
    </Wrapper>
  );
}

export default TradeWidget;
