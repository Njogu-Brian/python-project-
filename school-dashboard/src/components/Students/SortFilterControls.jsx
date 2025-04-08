import React from "react";

const SortFilterControls = ({ sortOption, setSortOption, showOnlyGrade, setShowOnlyGrade }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label>Sort by: </label>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="name">Name</option>
                <option value="age">Age</option>
            </select>

            <label> Filter by Grade: </label>
            <input 
                type="text" 
                placeholder="Enter grade (e.g. Grade 5)" 
                value={showOnlyGrade} 
                onChange={(e) => setShowOnlyGrade(e.target.value)}
            />
        </div>
    );
};

export default SortFilterControls;
