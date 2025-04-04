import React, { useEffect, useState } from "react";
import axios from "axios";

function StaffList() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/staff").then((res) => {
      setStaff(res.data);
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
