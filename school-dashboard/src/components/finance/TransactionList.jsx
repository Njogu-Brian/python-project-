import React from "react";
import "../../styles/Finance.css";

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="transaction-list mt-4">
      <h4 className="mb-3">📜 Transaction History</h4>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="list-group-item d-flex justify-content-between align-items-center transaction-item"
          >
            <div>
              <div className="transaction-details">
                <span className="transaction-date">{transaction.date}</span> -{" "}
                <span className="transaction-description">
                  {transaction.description}
                </span>{" "}
                -{" "}
                <strong
                  className={
                    transaction.type === "income"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  ${transaction.amount} ({transaction.type})
                </strong>
              </div>
              <div className="transaction-meta">
                {transaction.student && (
                  <span className="badge bg-info text-dark me-2">
                    👩‍🎓 {transaction.student.name}
                  </span>
                )}
                {transaction.teacher && (
                  <span className="badge bg-secondary text-light">
                    👨‍🏫 {transaction.teacher.name}
                  </span>
                )}
              </div>
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(transaction.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
