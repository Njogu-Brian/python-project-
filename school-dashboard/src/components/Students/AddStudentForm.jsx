import React, { useState } from "react";
import "./AddStudentForm.css";

const AddStudentForm = ({ onAddStudent }) => {
  const [student, setStudent] = useState({ name: "", age: "", grade: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(student);
    setStudent({ name: "", age: "", grade: "" });
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Student Name" value={student.name} onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" value={student.age} onChange={handleChange} required />
      <input type="text" name="grade" placeholder="Grade (e.g., Grade 5)" value={student.grade} onChange={handleChange} required />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
