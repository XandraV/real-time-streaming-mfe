import TradeGrid from "./TradeGrid/TradeGrid";
import CandlestickChart from "./CandlestickChart/Candlestickchart";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "20px", 
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <CandlestickChart />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <TradeGrid />
      </div>
    </div>
  );
}

export default App;
