import React, { useEffect, useState } from "react";
import axios from "axios";

function FinanceList() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/finance").then((res) => {
      setPayments(res.data);
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
