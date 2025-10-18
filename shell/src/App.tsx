import React, { Suspense } from "react";
// const RemotePortfolioApp = React.lazy(() => import("portfolio/PortfolioApp"));
const RemoteTradeApp = React.lazy(() => import("trade/TradeApp"));
function App() {
  return (
    <div>
      <h1 style={{ color: "white" }}>Shell App</h1>
      <Suspense fallback={<div>Loading Portfolio...</div>}>
        {/* <RemotePortfolioApp /> */}
        <RemoteTradeApp />
      </Suspense>
    </div>
  );
}

export default App;
