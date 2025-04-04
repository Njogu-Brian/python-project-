import React, { useEffect, useState } from "react";
import api from '../services/axiosConfig';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Use your custom axios instance (api)
    api.get("/students/")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch students:", err);
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
