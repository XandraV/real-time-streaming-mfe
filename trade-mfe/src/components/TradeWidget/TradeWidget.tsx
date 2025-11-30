import { useState } from "react";
import CandlestickChart from "./CandlestickChart";
import InstrumentSearch from "./InstrumentSearch";
import styled from "styled-components";
import { useGetInstrumentsQuery } from "../../redux/services/instrumentSearchApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetCandlestickDataQuery } from "../../redux/services/candlestickDataApi";
import { AccountSelector } from "./AccountSelector";
import type { Account } from "../../types";

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
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 1000);
  const [selectedInstrument, setSelectedInstrument] = useState("AAPL");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [open, setOpen] = useState(false);
  // const { searchResults, isLoading, error } = useSearchFetch({
  //   searchString,
  // });

  const {
    data: searchResults,
    error,
    isLoading,
  } = useGetInstrumentsQuery(
    { searchString: debouncedSearchString },
    {
      skip: searchString.length < 3,
    }
  );

  const {
    data: candlestickDataResults,
    error: candlestickDataError,
    isLoading: candlestickDataIsLoading,
  } = useGetCandlestickDataQuery({ searchString: selectedInstrument });

  const handleChange = (value: string) => {
    setSearchString(value);
    setOpen(true);
  };

  const onInstrumentSelectResult = (value: string) => {
    setSelectedInstrument(value);
    setOpen(false);
    setSearchString("");
  };

  const onSelectAccount = (value: Account) => {
    setSelectedAccount(value);
  };

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          gap: 12,
        }}
      >
        <div style={{ color: "white", fontSize: 20 }}>
          Ticker: {selectedInstrument}
        </div>
        <AccountSelector
          accounts={[
            { name: "Account 1", id: "12345" },
            { name: "Account 2", id: "67890" },
          ]}
          selected={selectedAccount}
          onSelect={onSelectAccount}
        />
        <InstrumentSearch
          value={searchString}
          onChange={handleChange}
          results={searchResults ?? []}
          showResults={open}
          onSelectResult={onInstrumentSelectResult}
          onClickOutside={() => setOpen(false)}
        />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <CandlestickChart data={candlestickDataResults ?? []} />
      </div>
    </Wrapper>
  );
}

export default TradeWidget;
