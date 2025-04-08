import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddCourseForm = ({ onAddCourse }) => {
    const [newCourse, setNewCourse] = useState({
        title: "",
        instructor: "",
        duration: "",
    });
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/teachers")
            .then((res) => res.json())
            .then((data) => setTeachers(data))
            .catch((error) => console.error("Error fetching teachers:", error));
    }, []);

    const handleChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:4000/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCourse),
        })
        .then((res) => res.json())
        .then((data) => {
            onAddCourse(data);
            setNewCourse({ title: "", instructor: "", duration: "" });
        })
        .catch((error) => console.error("Error adding course:", error));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h5 className="text-center">Add a New Course</h5>

            <Form.Group className="mb-3">
                <Form.Label>Course Title</Form.Label>
                <Form.Control 
                    type="text"
                    name="title"
                    placeholder="Enter course title"
                    value={newCourse.title}
                    onChange={handleChange}
                    required
                />
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
                <Form.Control 
                    type="number"
                    name="duration"
                    placeholder="Enter duration"
                    value={newCourse.duration}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">Add Course</Button>
        </Form>
    );
};

export default AddCourseForm;
