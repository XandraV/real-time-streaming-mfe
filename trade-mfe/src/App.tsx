import { useState, useCallback } from "react";
import { useTradeStream } from "./hooks/useTradeStream";

function App() {
  const trades = useTradeStream();

  return (
    <>
      <div>TRADE APP</div>
      <div style={{ padding: "1rem" }}>
        <h1>Live Trades</h1>
        <ul>
          {trades.map((trade, index) => (
            <li key={index}>
              {trade.symbol}: ${trade.price} and {trade.volume}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
