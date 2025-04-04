import React, { useState } from "react";
import axios from "axios";

function Classroom() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/classrooms", { name });
    setName("");
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
