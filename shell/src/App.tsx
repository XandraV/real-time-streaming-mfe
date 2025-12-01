import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { Suspense } from "react";
import NavMenu from "./NavMenu";

const RemoteTradeApp = React.lazy(() => import("trade/TradeApp"));
const RemotePortfolioApp = React.lazy(() => import("portfolio/PortfolioApp"));

// <Routes> normally unmount on navigation ie local state is lost
// Simple KeepAliveRoutes keeps components mounted and hence state is preserved
function KeepAliveRoutes() {
  const location = useLocation();
  const route = location.pathname;

  return (
    <div>
      <div style={{ display: route === "/trade" ? "block" : "none" }}>
        <RemoteTradeApp />
      </div>

      <div style={{ display: route === "/portfolio" ? "block" : "none" }}>
        <RemotePortfolioApp />
      </div>

      <div style={{ display: route === "/watchlist" ? "block" : "none" }}>
        <h2 style={{ color: "white" }}>Welcome to the Watchlist App</h2>
      </div>

      <div style={{ display: route === "/dashboard" ? "block" : "none" }}>
        <h2 style={{ color: "white" }}>Welcome to Dashboard App</h2>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavMenu />
      <Suspense fallback={<div style={{ color: "white" }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/trade" replace />} />
        </Routes>
        {/* Keep-alive renderer */}
        <KeepAliveRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
