import React, { useState, useEffect } from "react";
import FinanceSummary from "../components/finance/FinanceSummary";
import AddTransactionForm from "../components/finance/AddTransactionForm";
import TransactionList from "../components/finance/TransactionList";
import SortFilterControls from "../components/finance/SortFilterControls";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from "../services/financeServices";
import "../styles/Finance.css";

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortOption, setSortOption] = useState("date");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchTransactions().then(setTransactions);
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    const created = await addTransaction(newTransaction);
    setTransactions([...transactions, created]);
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const sortedFilteredTransactions = transactions
    .filter((t) => (filterType ? t.type === filterType : true))
    .sort((a, b) =>
      sortOption === "amount"
        ? b.amount - a.amount
        : new Date(b.date) - new Date(a.date)
    );

  const summary = {
    totalRevenue: transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0),
    outstandingBalance: transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0),
    recentTransactions: transactions.length,
  };

  return (
    <div className="finance-container">
      <h2 className="text-center mt-4">💰 Financial Overview</h2>
      <FinanceSummary summary={summary} />
      <SortFilterControls
        sortOption={sortOption}
        setSortOption={setSortOption}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <AddTransactionForm onAdd={handleAddTransaction} />
      <TransactionList
        transactions={sortedFilteredTransactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

export default Finance;
