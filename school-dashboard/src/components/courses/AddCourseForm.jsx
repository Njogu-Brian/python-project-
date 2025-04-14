import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { addCourse } from "../../services/courseService";
import { fetchTeachers } from "../../services/teacherService";

const AddCourseForm = ({ onAddCourse }) => {
  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
    teacher_id: "",
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers()
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching teachers", err));
  }, []);

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseToSend = {
        name: newCourse.name.trim(),
        duration: parseInt(newCourse.duration),
        teacher_id: parseInt(newCourse.teacher_id),
      };

      const res = await addCourse(courseToSend);
      onAddCourse(res.data);
      setNewCourse({ name: "", duration: "", teacher_id: "" });
    } catch (err) {
      console.error("Error adding course", err);
      alert("Failed to add course. Please check your data and try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5 className="text-center">Add a New Course</h5>

      <Form.Group className="mb-3">
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          name="name"
          value={newCourse.name}
          onChange={handleChange}
          placeholder="e.g. Mathematics"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instructor</Form.Label>
        <Form.Select
          name="teacher_id"
          value={newCourse.teacher_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Instructor</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Duration (weeks)</Form.Label>
        <Form.Control
          name="duration"
          type="number"
          value={newCourse.duration}
          onChange={handleChange}
          placeholder="e.g. 8"
          min="1"
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Add Course
      </Button>
    </Form>
  );
};

export default AddCourseForm;
