import React from "react";

const FinanceSummary = ({ summary }) => {
  return (
    <div className="card p-3 my-3 shadow-sm text-center">
      <h4>📊 Financial Summary</h4>
      <p><strong>Total Revenue:</strong> <span className="text-success">${summary.totalRevenue}</span></p>
      <p><strong>Outstanding Balance:</strong> <span className="text-danger">${summary.outstandingBalance}</span></p>
      <p><strong>Recent Transactions:</strong> {summary.recentTransactions} entries</p>
    </div>
  );
};

export default FinanceSummary;
