import React from "react";

const SortFilterControls = ({ sortOption, setSortOption, instructorFilter, setInstructorFilter }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>Sort by: </label>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="title">Title</option>
        <option value="duration">Duration</option>
      </select>

      <label> Filter by Instructor: </label>
      <input type="text" placeholder="Enter instructor name" value={instructorFilter} onChange={(e) => setInstructorFilter(e.target.value)} />
    </div>
  );
};

export default SortFilterControls;
