import React, { useEffect, useState } from "react";
import api from '../services/axiosConfig';  // use this, not axios directly

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    api.get("/classrooms/")
      .then((res) => {
        setClassrooms(res.data);
      })
      .catch((err) => {
        console.error("Error fetching classrooms:", err);
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
