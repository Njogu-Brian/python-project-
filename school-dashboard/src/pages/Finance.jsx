import React, { useState, useEffect } from "react";
import FinanceSummary from "../components/finance/FinanceSummary";
import AddTransactionForm from "../components/finance/AddTransactionForm";
import TransactionList from "../components/finance/TransactionList";
import SortFilterControls from "../components/finance/SortFilterControls";
import "../styles/Finance.css"; // Import styles

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    fetch("http://localhost:4000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTransaction, id: Date.now() }),
    })
    .then((res) => res.json())
    .then((data) => setTransactions([...transactions, data]))
    .catch((error) => console.error("Error adding transaction:", error));
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:4000/transactions/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    })
    .catch((error) => console.error("Error deleting transaction:", error));
  };

  const sortedFilteredTransactions = transactions
    .filter(transaction => filterType ? transaction.type === filterType : true)
    .sort((a, b) => (sortOption === "amount" ? b.amount - a.amount : new Date(b.date) - new Date(a.date)));

  const financeSummary = {
    totalRevenue: transactions.filter(t => t.type === "income").reduce((acc, t) => acc + Number(t.amount), 0),
    outstandingBalance: transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + Number(t.amount), 0),
    recentTransactions: transactions.length,
  };

  return (
    <div className="finance-container">
      <h2 className="text-center mt-4">💰 Financial Overview</h2>
      <FinanceSummary summary={financeSummary} />
      <SortFilterControls sortOption={sortOption} setSortOption={setSortOption} filterType={filterType} setFilterType={setFilterType} />
      <AddTransactionForm onAdd={handleAddTransaction} />
      <TransactionList transactions={sortedFilteredTransactions} onDelete={handleDeleteTransaction} />
    </div>
  );
};

export default Finance;
