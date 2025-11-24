import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavMenu from "./NavMenu";

const RemoteTradeApp = React.lazy(() => import("trade/TradeApp"));
const RemotePortfolioApp = React.lazy(() => import("portfolio/PortfolioApp"));

function Home() {
  return <h2 style={{ color: "white" }}>Welcome to Dashboard App</h2>;
}
function Watchlist() {
  return <h2 style={{ color: "white" }}>Welcome to the Watchlist App</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <NavMenu />
        <Suspense fallback={<div style={{ color: "white" }}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/trade" replace />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/dashboard" element={<Home />} />
            <Route path="/trade" element={<RemoteTradeApp />} />
            <Route path="/portfolio" element={<RemotePortfolioApp />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
