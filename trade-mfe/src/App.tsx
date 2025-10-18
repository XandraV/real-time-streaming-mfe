import useTradeStream from "./hooks/useTradeStream";
import TradeGrid from "./TradeGrid/TradeGrid";

function App() {
  const trades = useTradeStream();
  return (
    <>
      <div>TRADE APP</div>
      <TradeGrid rowsMap={trades} />
    </>
  );
}

export default App;
