import React, { useState, useEffect } from "react";

const AddStudentForm = ({ onAddStudent, classrooms }) => {
  const [student, setStudent] = useState({ name: "", classroom_id: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(student);
    setStudent({ name: "", classroom_id: "" });
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={student.name}
        onChange={handleChange}
        required
      />
      <select
        name="classroom_id"
        value={student.classroom_id}
        onChange={handleChange}
        required
      >
        <option value="">Select a class</option>
        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
