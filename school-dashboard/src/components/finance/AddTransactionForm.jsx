import React, { useState, useEffect } from "react";
import { fetchStudents, fetchTeachers } from "../../services/financeServices";
import "../../styles/Finance.css";

const AddTransactionForm = ({ onAdd }) => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    type: "income",
    date: "",
    student_id: "",
    teacher_id: "",
  });

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchStudents().then(setStudents);
    fetchTeachers().then(setTeachers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatted = {
      ...newTransaction,
      amount: Number(newTransaction.amount),
      student_id: newTransaction.student_id || null,
      teacher_id: newTransaction.teacher_id || null,
    };

    onAdd(formatted);
    setNewTransaction({
      description: "",
      amount: "",
      type: "income",
      date: "",
      student_id: "",
      teacher_id: "",
    });
  };

  return (
    <div className="card p-4 mt-4 shadow-sm form-card">
      <h4 className="text-center mb-4">Add a New Transaction</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={newTransaction.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={newTransaction.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Type</label>
          <select
            name="type"
            className="form-control"
            value={newTransaction.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={newTransaction.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Student</label>
          <select
            name="student_id"
            className="form-control"
            value={newTransaction.student_id}
            onChange={handleChange}
          >
            <option value="">-- None --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label>Teacher</label>
          <select
            name="teacher_id"
            className="form-control"
            value={newTransaction.teacher_id}
            onChange={handleChange}
          >
            <option value="">-- None --</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
