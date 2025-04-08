import React, { useState, useEffect } from "react";
import api from "../..//services/axiosConfig";

const EditCourseForm = ({ course, onUpdateCourse, onCancel }) => {
  const [updatedCourse, setUpdatedCourse] = useState(course);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers")
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching teachers", err));
  }, []);

  const handleChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/courses/${updatedCourse.id}`, updatedCourse)
      .then((res) => onUpdateCourse(res.data))
      .catch((err) => console.error("Error updating course", err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", background: "#f4f4f4", padding: "10px" }}>
      <h3>Edit {updatedCourse.title}</h3>
      <input name="title" value={updatedCourse.title} onChange={handleChange} required />
      <select name="instructor" value={updatedCourse.instructor} onChange={handleChange} required>
        <option value="">Select Instructor</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
        ))}
      </select>
      <input name="duration" type="number" value={updatedCourse.duration} onChange={handleChange} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCourseForm;
