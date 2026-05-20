import { useState } from "react";
// import "./SlabShutteringCalculato r.css";
import "./index.css";
const SlabShutteringCalculator = () => {
  const [slabDimensions, setSlabDimensions] = useState({
    length: 0,
    width: 0,
    thickness: 0,
    plySheetSize: 0,
    propSpacing: 0,
    totalArea: 0,
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setSlabDimensions((dim) => ({
      ...dim,
      [name]: Number(value),
    }));
  };

  const calculateArea = (event) => {
    event.preventDefault();

    const { length, width, thickness } = slabDimensions;

    const bottomArea = length * width;

    const sideArea = 2 * (length + width) * thickness;

    const totalArea = bottomArea + sideArea;

    setSlabDimensions((dim) => ({
      ...dim,
      totalArea: totalArea.toFixed(2),
    }));
  };

  return (
    <div className="slab-page">
      {/* HEADER */}
      <div className="slab-header">
        <h1>Slab Shuttering Calculator</h1>

        <p>Calculate slab shuttering area, props & material estimation</p>
      </div>

      {/* MAIN CARD */}
      <div className="slab-grid">
        {/* INPUT CARD */}
        <div className="slab-card">
          <h2>Project Inputs</h2>

          <form>
            <div className="input-grid">
              {/* LENGTH */}
              <div className="form-group">
                <label>Slab Length (m)</label>

                <input
                  type="number"
                  name="length"
                  value={slabDimensions.length}
                  onChange={handleInputs}
                  placeholder="Enter slab length"
                />
              </div>

              {/* WIDTH */}
              <div className="form-group">
                <label>Slab Width (m)</label>

                <input
                  type="number"
                  name="width"
                  value={slabDimensions.width}
                  onChange={handleInputs}
                  placeholder="Enter slab width"
                />
              </div>

              {/* THICKNESS */}
              <div className="form-group">
                <label>Slab Thickness (m)</label>

                <input
                  type="number"
                  name="thickness"
                  value={slabDimensions.thickness}
                  onChange={handleInputs}
                  placeholder="Enter thickness"
                />
              </div>

              {/* PLY SHEET */}
              <div className="form-group">
                <label>Ply Sheet Size (sqft)</label>

                <input
                  type="number"
                  name="plySheetSize"
                  value={slabDimensions.plySheetSize}
                  onChange={handleInputs}
                  placeholder="Enter ply sheet size"
                />
              </div>

              {/* PROP SPACING */}
              <div className="form-group full-width">
                <label>Prop Spacing (m)</label>

                <input
                  type="number"
                  name="propSpacing"
                  value={slabDimensions.propSpacing}
                  onChange={handleInputs}
                  placeholder="Enter prop spacing"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button className="calculate-btn" onClick={calculateArea}>
              Calculate Shuttering
            </button>
          </form>
        </div>

        {/* RESULT CARD */}
        <div className="slab-card">
          <h2>Estimation Results</h2>

          <div className="results-grid">
            <div className="result-box">
              <span>Bottom Area</span>

              <h3>
                {(slabDimensions.length * slabDimensions.width).toFixed(2)} m²
              </h3>
            </div>

            <div className="result-box">
              <span>Side Area</span>

              <h3>
                {(
                  2 *
                  (slabDimensions.length + slabDimensions.width) *
                  slabDimensions.thickness
                ).toFixed(2)}{" "}
                m²
              </h3>
            </div>

            <div className="result-box total-result">
              <span>Total Shuttering Area</span>

              <h1>{slabDimensions.totalArea} m²</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlabShutteringCalculator;
