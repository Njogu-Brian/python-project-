import React from "react";

const SortFilterControls = ({ sortOption, setSortOption, filterType, setFilterType }) => {
  return (
    <div className="sort-filter-controls">
      <label>Sort by: </label>
      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>

      <label> Filter by Type: </label>
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
};

export default SortFilterControls;
