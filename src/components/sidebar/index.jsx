import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  Calculator,
  Building2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./index.css";
function Sidebar() {
  const [openModule, setOpenModule] = useState(true);

  const [openShuttering, setOpenShuttering] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Building2 size={24} />

          {!collapsed && <h2>Crew Estimators</h2>}
        </div>

        {/* TOGGLE BUTTON */}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* MODULE */}
      <div
        className="sidebar-module"
        onClick={() => setOpenModule(!openModule)}
      >
        <div className="sidebar-module-left">
          <Calculator size={18} />

          {!collapsed && <span>Calculators</span>}
        </div>

        {!collapsed &&
          (openModule ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
      </div>

      {/* SUBMODULES */}
      {!collapsed && openModule && (
        <div className="sidebar-submodules">
          {/* Concrete */}
          <Link to="/concrete-calculator" className="sidebar-link">
            Concrete Calculator
          </Link>

          {/* Shuttering */}
          <div
            className="sidebar-link shuttering-link"
            onClick={() => setOpenShuttering(!openShuttering)}
          >
            <span>Shuttering Calculator</span>

            {openShuttering ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>

          {/* NESTED */}
          {openShuttering && (
            <div className="nested-links">
              <Link to="/slab-shuttering" className="nested-link">
                Slab Shuttering
              </Link>

              <Link to="/beam-shuttering" className="nested-link">
                Beam Shuttering
              </Link>

              <Link to="/slab-beam-shuttering" className="nested-link">
                Slab + Beam Shuttering
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
