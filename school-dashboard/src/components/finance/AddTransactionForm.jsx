import React, { useState } from "react";

const AddTransactionForm = ({ onAdd }) => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "income",
    date: "",
  });

  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newTransaction);
    setNewTransaction({ description: "", amount: "", type: "income", date: "" });
  };

  return (
    <div className="card p-3 mt-3 shadow-sm">
      <h4 className="text-center">Add a New Transaction</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input 
            type="text" 
            name="description" 
            className="form-control"
            placeholder="Enter description"
            value={newTransaction.description} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount ($)</label>
          <input 
            type="number" 
            name="amount" 
            className="form-control"
            placeholder="Enter amount"
            value={newTransaction.amount} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select name="type" className="form-control" value={newTransaction.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" name="date" className="form-control" value={newTransaction.date} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
