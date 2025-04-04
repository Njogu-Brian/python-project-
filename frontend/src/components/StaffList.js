import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";

function StaffList() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    api.get("/staff/")
      .then((res) => {
        setStaff(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch staff:", err);
      });
  }, []);

  return (
    <div>
      <h2>Staff</h2>
      <ul>
        {staff.map((s) => (
          <li key={s.id}>
            {s.name} - {s.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffList;
