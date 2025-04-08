import React from "react";

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-list">
      <h3>📜 Transaction History</h3>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {transaction.date} - {transaction.description} - 
              <strong className={transaction.type === "income" ? "text-success" : "text-danger"}>
                ${transaction.amount} ({transaction.type})
              </strong>
            </span>
            <button 
              onClick={() => onDelete(transaction.id)} 
              className="btn btn-danger btn-sm"
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
