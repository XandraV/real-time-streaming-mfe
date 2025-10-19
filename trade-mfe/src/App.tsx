import useTradeStream from "./hooks/useTradeStream";
import useTradeStreamRx from "./hooks/useTradeStreamRx";
import TradeGrid from "./TradeGrid/TradeGrid";

function App() {
  // const trades = useTradeStream();
  const trades = useTradeStreamRx();
  return (
    <>
      <TradeGrid rowsMap={trades} />
    </>
  );
}

export default App;
