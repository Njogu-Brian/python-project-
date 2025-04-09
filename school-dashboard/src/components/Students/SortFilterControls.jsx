import React from "react";

const SortFilterControls = ({ sortOption, setSortOption }) => {
    return (
      <div style={{ marginBottom: "20px" }}>
        <label>Sort by: </label>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="name">Name</option>
        </select>
      </div>
    );
  };
  

export default SortFilterControls;
