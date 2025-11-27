import styled from "styled-components";
import TradeGrid from "./InstrumentGrid/InstrumentGrid";
import TradeWidget from "./TradeWidget/TradeWidget";

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
    <Wrapper>
      <div style={{ flex: 1, minWidth: 0 }}>
        <TradeWidget />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <TradeGrid />
      </div>
    </Wrapper>
  );
}

export default App;
