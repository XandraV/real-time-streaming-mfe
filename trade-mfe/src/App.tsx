import styled from "styled-components";
import TradeGrid from "./InstrumentGrid/InstrumentGrid";
import TradeWidget from "./components/TradeWidget/TradeWidget";
import { queryClient } from "./redux/queryClient";
import { store } from "./redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

const Wrapper = styled.div`
  font-family: poppins, sans-serif;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 20px;
`;

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <div style={{ flex: 1 }}>
            <TradeWidget />
          </div>
          <div style={{ flex: 1 }}>
            <TradeGrid />
          </div>
        </Wrapper>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
