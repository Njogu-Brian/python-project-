// src/services/financeService.js

const BASE_URL = "http://localhost:8000/finance";

export const fetchTransactions = async () => {
  const res = await fetch(BASE_URL);
  return await res.json();
};

export const addTransaction = async (transaction) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return await res.json();
};

export const deleteTransaction = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

export const updateTransaction = async (id, transaction) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return await res.json();
};

export const fetchStudents = async () => {
  const res = await fetch("http://localhost:8000/students/");
  return await res.json();
};

export const fetchTeachers = async () => {
  const res = await fetch("http://localhost:8000/teachers/");
  return await res.json();
};
