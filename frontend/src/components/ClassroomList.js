import React, { useEffect, useState } from "react";
import axios from "axios";

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/classrooms").then((res) => {
      setClassrooms(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Classroom List</h2>
      <ul>
        {classrooms.map((classroom) => (
          <li key={classroom.id}>{classroom.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassroomList;
