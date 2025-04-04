import React, { useState } from "react";
import axios from "axios";

function Student() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [classroom_id, setClassroomId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/students", {
      name,
      age: parseInt(age),
      classroom_id: parseInt(classroom_id),
    });
    setName("");
    setAge("");
    setClassroomId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <input value={classroom_id} onChange={(e) => setClassroomId(e.target.value)} placeholder="Classroom ID" />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default Student;
