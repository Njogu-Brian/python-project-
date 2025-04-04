import React, { useEffect, useState } from "react";
import axios from "axios";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/teachers").then((res) => {
      setTeachers(res.data);
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
