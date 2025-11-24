import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AboutTicks from "./AboutTicks.jsx";     // ✅ FIXED PATH
import ReportPage from "./pages/ReportPage.jsx"; // leave this if it's in /pages


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about-ticks" element={<AboutTicks />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
