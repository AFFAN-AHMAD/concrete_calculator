import "./App.css";

import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import ConcreteCalculator from "./pages/ConcreteCalculator";

// import SlabShuttering from "./pages/shuttering/SlabShuttering";

// import BeamShuttering from "./pages/shuttering/BeamShuttering";

// import SlabBeamShuttering from "./pages/shuttering/SlabBeamShuttering";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="layout">
        {/* SIDEBAR */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* PAGE */}
        <div className={`page-content ${collapsed ? "page-expanded" : ""}`}>
          <Routes>
            <Route path="/" element={<ConcreteCalculator />} />

            <Route
              path="/concrete-calculator"
              element={<ConcreteCalculator />}
            />

            {/* <Route
              path="/slab-shuttering"
              element={
                <SlabShuttering />
              }
            />

            <Route
              path="/beam-shuttering"
              element={
                <BeamShuttering />
              }
            />

            <Route
              path="/slab-beam-shuttering"
              element={
                <SlabBeamShuttering />
              }
            /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
