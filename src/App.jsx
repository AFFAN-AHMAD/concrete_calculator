import { useState } from "react";
import "./App.css";
import { concrete_dry_volume } from "./utils/coefficients";
import { concrete_grades } from "./utils/concrete_grades";
import { qty_in_one_bag_of_cement } from "./utils/constants";

function App() {
  const [quantity, setQuantity] = useState(1);
  const [grade, setGrade] = useState("m5");
  const [calculations, setCalculations] = useState({
    cement: null,
    fine_aggregate: null,
    coarse_aggregate: null,
  });
  const calculateQuantity = (quantity, grade) => {
    const dry_volume = concrete_dry_volume(quantity);

    const { cement, fine_aggregate, coarse_aggregate } = concrete_grades[grade];
    const total_ratio = cement + fine_aggregate + coarse_aggregate;

    // cement
    const cement_proportion = dry_volume / total_ratio;
    const no_of_bags_of_cement = Math.round(
      cement_proportion / qty_in_one_bag_of_cement,
    );
    // console.log(no_of_bags);

    // fine_agg
    const fine_aggregate_proportion = fine_aggregate / total_ratio;
    const fine_aggregate_quantity = fine_aggregate_proportion * dry_volume;

    // sand
    const coarse_aggregate_proportion = coarse_aggregate / total_ratio;
    const coarse_aggregate_quantity = coarse_aggregate_proportion * dry_volume;

    setCalculations({
      cement: no_of_bags_of_cement,
      fine_aggregate: fine_aggregate_quantity.toFixed(2),
      coarse_aggregate: coarse_aggregate_quantity.toFixed(2),
    });
  };

  return (
    <>
      <form>
        <h1>Concrete Calculator</h1>

        <label>Grade</label>
        <select
          onChange={(event) => setGrade(event.target.value)}
          value={grade}
        >
          <option value="m5">m5</option>
          <option value="m7.5">m7.5</option>
          <option value="m10">m10</option>
          <option value="m20">m20</option>
        </select>

        <label>Quantity (in m³)</label>

        <input
          type="number"
          onChange={(event) => setQuantity(Number(event.target.value))}
          value={quantity}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            calculateQuantity(quantity, grade);
          }}
        >
          Calculate
        </button>

        <table style={{ border: "1px solid" }}>
          <tr>
            <th>Cement(bags)</th>
            <th>Fine Aggregate(cum)</th>
            <th>Coarse Aggregate(cum)</th>
          </tr>
          <tr>
            <th>{calculations.cement}</th>
            <th>{calculations.fine_aggregate}</th>
            <th>{calculations.coarse_aggregate}</th>
          </tr>
        </table>
      </form>
    </>
  );
}

export default App;
