import useTradeStream from "./hooks/useTradeStream";
import TradeGrid from "./TradeGrid/TradeGrid";

function App() {
  const trades = useTradeStream();
  return (
    <>
      <TradeGrid rowsMap={trades} />
    </>
  );
}

export default App;
