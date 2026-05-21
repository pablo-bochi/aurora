import type { CSSProperties } from "react";
import { useEffect } from "react";
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";

import ConversationalPageV2 from "./pages/ConversationalPageV2";
import FinancialHealthPageV3 from "./pages/FinancialHealthPageV3";
import HomePageV2 from "./pages/HomePageV2";
import InitialSnapshotPage from "./pages/InitialSnapshotPage";
import JourneyPage from "./pages/JourneyPage";
import LifeProjectsPage from "./pages/LifeProjectsPage";
import MonthlyReviewPageV2 from "./pages/MonthlyReviewPageV2";
import ObjectivesPageV2 from "./pages/ObjectivesPageV2";
import ReservoirsPage from "./pages/ReservoirsPage";

const pages: { path: string; label: string }[] = [
  { path: "/home", label: "Home" },
  { path: "/snapshot", label: "Snapshot" },
  { path: "/score", label: "Score" },
  { path: "/journey", label: "Journey" },
  { path: "/objectives", label: "Projects" },
  { path: "/reservoirs", label: "Reservoirs" },
  { path: "/review", label: "Monthly Review" },
  { path: "/assistant", label: "Assistant" },
];

const navStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  backdropFilter: "blur(6px)",
  background: "rgba(243, 247, 252, 0.92)",
  borderBottom: "1px solid #d8e3ef",
  padding: "10px 12px",
  display: "flex",
  gap: 8,
  overflowX: "auto",
};

const baseButtonStyle: CSSProperties = {
  border: "1px solid #c8d8e9",
  borderRadius: 999,
  padding: "8px 12px",
  background: "#ffffff",
  color: "#2f4a67",
  fontWeight: 600,
  fontSize: "0.84rem",
  whiteSpace: "nowrap",
  cursor: "pointer",
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <nav style={navStyle}>
        {pages.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...baseButtonStyle,
              textDecoration: "none",
              background: isActive ? "#183454" : "#ffffff",
              color: isActive ? "#ffffff" : "#2f4a67",
              borderColor: isActive ? "#183454" : "#c8d8e9",
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePageV2 />} />
        <Route path="/snapshot" element={<InitialSnapshotPage />} />
        <Route path="/score" element={<FinancialHealthPageV3 />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/objectives" element={<LifeProjectsPage />} />
        <Route path="/legacy-objectives" element={<ObjectivesPageV2 />} />
        <Route path="/reservoirs" element={<ReservoirsPage />} />
        <Route path="/review" element={<MonthlyReviewPageV2 />} />
        <Route path="/assistant" element={<ConversationalPageV2 />} />
      </Routes>
    </BrowserRouter>
  );
}
