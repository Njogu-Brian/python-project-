import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../services/axiosConfig";

const AddCourseForm = ({ onAddCourse }) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructor: "",
    duration: "",
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get("/teachers")
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("Error fetching teachers", err));
  }, []);

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/courses/", newCourse)
      .then((res) => {
        onAddCourse(res.data);
        setNewCourse({ title: "", instructor: "", duration: "" });
      })
      .catch((err) => console.error("Error adding course", err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5 className="text-center">Add a New Course</h5>
      <Form.Group className="mb-3">
        <Form.Label>Course Title</Form.Label>
        <Form.Control name="title" value={newCourse.title} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Instructor</Form.Label>
        <Form.Select name="instructor" value={newCourse.instructor} onChange={handleChange} required>
          <option value="">Select Instructor</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Duration (weeks)</Form.Label>
        <Form.Control name="duration" type="number" value={newCourse.duration} onChange={handleChange} required />
      </Form.Group>
      <Button type="submit" variant="primary" className="w-100">Add Course</Button>
    </Form>
  );
};

export default AddCourseForm;
