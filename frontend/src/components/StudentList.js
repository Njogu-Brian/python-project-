import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - Age: {student.age} - Class: {student.classroom_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
