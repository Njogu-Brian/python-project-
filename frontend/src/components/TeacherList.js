import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers/")
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch teachers:", err);
      });
  }, []);

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} - {teacher.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
