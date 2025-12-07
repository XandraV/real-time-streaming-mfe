import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import RemoteTradeApp from "trade/TradeApp";
// import RemotePortfolioApp from "portfolio/PortfolioApp";
const RemoteBlotterApp = React.lazy(() => import("blotter/BlotterApp"));

const RouteContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
`;

// <Routes> normally unmount on navigation ie local state is lost
// KeepAliveRoutes keeps components mounted and hence state is preserved
function KeepAliveRoutes() {
  const { pathname } = useLocation();

  return (
    <>
      <RouteContainer show={pathname === "/trade"}>
        <RemoteTradeApp />
        <RemoteBlotterApp />
      </RouteContainer>

      <RouteContainer show={pathname === "/portfolio"}>
        <h2>Welcome to the Portfolio App</h2>
      </RouteContainer>

      <RouteContainer show={pathname === "/watchlist"}>
        <h2>Welcome to the Watchlist App</h2>
      </RouteContainer>

      <RouteContainer show={pathname === "/dashboard"}>
        <h2>Welcome to Dashboard App</h2>
      </RouteContainer>
    </>
  );
}

export default KeepAliveRoutes;
