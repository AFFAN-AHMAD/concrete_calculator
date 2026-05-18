import { useState } from "react";
import { concrete_dry_volume } from "../../../utils/coefficients";
import { concrete_grades } from "../../../utils/concrete_grades";

import {
  CUM_to_CFT_conversion_factor,
  qty_in_one_bag_of_cement,
} from "../../../utils/constants";

import "./index.css";

const ConcreteCalculator = () => {
  const [quantity, setQuantity] = useState(1);
  const [grade, setGrade] = useState("M20");
  const [UOM, setUOM] = useState("CUM");

  const [cementPrice, setCementPrice] = useState(400);
  const [fineAggregartePrice, setFineAggregartePrice] = useState(45);
  const [coarseAggregatePrice, setCoarseAggregatePrice] = useState(55);

  const [calculations, setCalculations] = useState({
    cement: 0,
    fine_aggregate: 0,
    coarse_aggregate: 0,
    cement_cost: 0,
    fine_aggregate_cost: 0,
    coarse_aggregate_cost: 0,
    total_cost: 0,
  });

  const calculateQuantity = ({
    quantity,
    grade,
    UOM,
    cementPrice,
    fineAggregartePrice,
    coarseAggregatePrice,
  }) => {
    const dry_volume = concrete_dry_volume(quantity);

    const { cement, fine_aggregate, coarse_aggregate } = concrete_grades[grade];

    const total_ratio = cement + fine_aggregate + coarse_aggregate;

    // Cement
    const cement_proportion = dry_volume / total_ratio;
    const no_of_bags_of_cement = Math.ceil(
      cement_proportion / qty_in_one_bag_of_cement,
    );

    // Fine Aggregate
    const fine_aggregate_proportion = fine_aggregate / total_ratio;
    let fine_aggregate_quantity = fine_aggregate_proportion * dry_volume;

    // Coarse Aggregate
    const coarse_aggregate_proportion = coarse_aggregate / total_ratio;
    let coarse_aggregate_quantity = coarse_aggregate_proportion * dry_volume;

    if (UOM === "CFT") {
      fine_aggregate_quantity *= CUM_to_CFT_conversion_factor;
      coarse_aggregate_quantity *= CUM_to_CFT_conversion_factor;
    }

    // Cost Calculation
    const cement_cost = no_of_bags_of_cement * cementPrice;

    const fine_aggregate_cost = Math.ceil(
      fine_aggregate_quantity * fineAggregartePrice,
    );

    const coarse_aggregate_cost = Math.ceil(
      coarse_aggregate_quantity * coarseAggregatePrice,
    );

    const total_cost =
      cement_cost + fine_aggregate_cost + coarse_aggregate_cost;

    setCalculations({
      cement: no_of_bags_of_cement,
      fine_aggregate: fine_aggregate_quantity.toFixed(2),
      coarse_aggregate: coarse_aggregate_quantity.toFixed(2),
      cement_cost,
      fine_aggregate_cost,
      coarse_aggregate_cost,
      total_cost,
    });
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="hero">
        <h1>Concrete Calculator</h1>

        <p>Calculate material quantity & project cost instantly</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-grid">
        {/* LEFT PANEL */}
        <div className="glass-card">
          <h2>Project Inputs</h2>

          <div className="row">
            {/* Grade */}
            <div className="form-group">
              <label>Concrete Grade</label>

              <div className="select-wrapper">
                <select
                  className="custom-select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="M5">M5</option>

                  <option value="M7.5">M7.5</option>

                  <option value="M10">M10</option>

                  <option value="M20">M20</option>
                </select>
              </div>
            </div>

            {/* UOM */}
            <div className="form-group">
              <label>Unit</label>

              <div className="select-wrapper">
                <select
                  className="custom-select"
                  value={UOM}
                  onChange={(e) => setUOM(e.target.value)}
                >
                  <option value="CUM">CUM</option>

                  <option value="CFT">CFT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label>Quantity ({UOM})</label>

            <input
              type="number"
              value={quantity}
              placeholder="Enter Quantity"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Cement */}
          <div className="form-group">
            <label>Cement Price / Bag</label>

            <input
              type="number"
              value={cementPrice}
              placeholder="Enter Cement Price"
              onChange={(e) => setCementPrice(Number(e.target.value))}
            />
          </div>

          {/* Sand */}
          <div className="form-group">
            <label>Fine Aggregate Price / {UOM}</label>

            <input
              type="number"
              value={fineAggregartePrice}
              placeholder="Enter Sand Price"
              onChange={(e) => setFineAggregartePrice(Number(e.target.value))}
            />
          </div>

          {/* Aggregate */}
          <div className="form-group">
            <label>Coarse Aggregate Price / {UOM}</label>

            <input
              type="number"
              value={coarseAggregatePrice}
              placeholder="Enter Aggregate Price"
              onChange={(e) => setCoarseAggregatePrice(Number(e.target.value))}
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

              calculateQuantity({
                quantity,
                grade,
                UOM,
                cementPrice,
                fineAggregartePrice,
                coarseAggregatePrice,
              });
            }}
          >
            Calculate Estimate
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="glass-card">
          <h2>Estimation Results</h2>

          <div className="results-grid">
            <div className="result-card">
              <span>Cement Bags</span>
              <h3>{calculations.cement}</h3>
            </div>

            <div className="result-card">
              <span>Cement Cost</span>
              <h3>₹{calculations.cement_cost}</h3>
            </div>

            <div className="result-card">
              <span>Fine Aggregate ({UOM})</span>

              <h3>{calculations.fine_aggregate}</h3>
            </div>

            <div className="result-card">
              <span>Fine Aggregate Cost</span>

              <h3>₹{calculations.fine_aggregate_cost}</h3>
            </div>

            <div className="result-card">
              <span>Coarse Aggregate ({UOM})</span>

              <h3>{calculations.coarse_aggregate}</h3>
            </div>

            <div className="result-card">
              <span>Coarse Aggregate Cost</span>

              <h3>₹{calculations.coarse_aggregate_cost}</h3>
            </div>
          </div>

          {/* TOTAL */}
          <div className="total-box">
            <span>Total Project Cost</span>

            <h1>₹{calculations.total_cost}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcreteCalculator;
