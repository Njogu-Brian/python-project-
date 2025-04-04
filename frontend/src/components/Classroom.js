import React, { useState } from "react";
import api from '../services/axiosConfig';  // This is your custom axios instance

function Classroom() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/classrooms/", { name });  // Use `api` instead of `axios`
      setName("");
    } catch (err) {
      console.error("Error creating classroom:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Classroom</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Classroom Name"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Classroom;
