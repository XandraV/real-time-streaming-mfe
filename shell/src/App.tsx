import React, { Suspense } from "react";

const RemotePortfolioApp = React.lazy(() => import("portfolio/PortfolioApp"));
const RemoteTradeApp = React.lazy(() => import("trade/TradeApp"));
function App() {

  return (
    <>
      <h1>Shell App</h1>
      <Suspense fallback={<div>Loading Portfolio...</div>}>
        <RemotePortfolioApp />
        <RemoteTradeApp/>
      </Suspense>
    </>
  );
}

export default App;
