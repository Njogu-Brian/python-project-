import React, { useState, useEffect } from "react";
import { fetchTeachers } from "../../services/teacherService";
import { updateCourse } from "../../services/courseService";

const EditCourseForm = ({ course, onUpdateCourse, onCancel }) => {
  const [updatedCourse, setUpdatedCourse] = useState(course);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers()
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching teachers", err));
  }, []);

  const handleChange = (e) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCourse(updatedCourse.id, {
        name: updatedCourse.name,
        duration: parseInt(updatedCourse.duration),
        teacher_id: parseInt(updatedCourse.teacher_id),
      });
      onUpdateCourse(res.data);
    } catch (err) {
      console.error("Error updating course", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", background: "#f4f4f4", padding: "10px" }}>
      <h3>Edit {updatedCourse.name}</h3>
      <input name="name" value={updatedCourse.name} onChange={handleChange} required />
      <select name="teacher_id" value={updatedCourse.teacher_id} onChange={handleChange} required>
        <option value="">Select Instructor</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
      <input name="duration" type="number" value={updatedCourse.duration} onChange={handleChange} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCourseForm;
