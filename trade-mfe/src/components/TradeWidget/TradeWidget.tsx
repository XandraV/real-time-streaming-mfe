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

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -20px;
  gap: 12;
`;

function TradeWidget() {
  const dispatch = useDispatch();
  const selectedInstrument = useSelector(
    (state: RootState) => state.instruments.selectedInstrument
  );

  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 1000);

  const { data: defaultInstrumentData } = useGetInstrumentsQuery(
    { searchString: "AAPL" },
    { skip: searchString.length > 0 }
  );

  useEffect(() => {
    if (defaultInstrumentData && defaultInstrumentData.length > 0) {
      dispatch(setSelectedInstrument(defaultInstrumentData[0]));
    }
  }, [defaultInstrumentData, dispatch]);

  const { data: searchResults } = useGetInstrumentsQuery(
    { searchString: debouncedSearchString },
    { skip: debouncedSearchString.length < 3 }
  );

  const {
    data: candlestickDataResults,
    error,
    isLoading,
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
      <StyledHeader>
        {selectedInstrument && (
          <InstrumentInfo selectedInstrument={selectedInstrument} />
        )}

        <InstrumentSearch
          value={searchString}
          onChange={handleChange}
          results={searchResults ?? []}
          onSelectResult={onInstrumentSelectResult}
        />
      </StyledHeader>
      <CandlestickChart data={candlestickDataResults ?? []} />
    </Wrapper>
  );
}

export default TradeWidget;
