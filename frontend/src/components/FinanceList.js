import React, { useEffect, useState } from "react";
import api from '../services/axiosConfig';

function FinanceList() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get("/finance")
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch finance records:", err);
      });
  }, []);

  return (
    <div>
      <h2>Finance Records</h2>
      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            Student: {p.student_id} | Term: {p.term} | Amount: {p.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FinanceList;
