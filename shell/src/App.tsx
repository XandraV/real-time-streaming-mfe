import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";
import Header from "./components/Header";
import KeepAliveRoutes from "./KeepAliveRoutes";

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div style={{ color: "white" }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/trade" replace />} />
        </Routes>
        <KeepAliveRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
