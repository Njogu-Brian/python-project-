import React from "react";

const SortFilterControls = ({ sortOption, setSortOption, subjectFilter, setSubjectFilter }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label>Sort by: </label>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="name">Name</option>
                <option value="experience">Experience</option>
            </select>

            <label> Filter by Subject: </label>
            <input 
                type="text" 
                placeholder="Enter subject (e.g. Math)" 
                value={subjectFilter} 
                onChange={(e) => setSubjectFilter(e.target.value)}
            />
        </div>
    );
};

export default SortFilterControls;
