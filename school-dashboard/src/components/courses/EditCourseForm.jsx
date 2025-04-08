import React, { useState, useEffect } from "react";

const EditCourseForm = ({ course, onUpdateCourse, onCancel }) => {
    const [updatedCourse, setUpdatedCourse] = useState(course);
    const [teachers, setTeachers] = useState([]); // Store teachers list

    // Fetch teachers to populate dropdown
    useEffect(() => {
        fetch("http://localhost:4000/teachers")
            .then((res) => res.json())
            .then((data) => setTeachers(data))
            .catch((error) => console.error("Error fetching teachers:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/courses/${updatedCourse.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCourse),
        })
        .then((res) => res.json())
        .then((data) => {
            onUpdateCourse(data); // Update UI
        })
        .catch((error) => console.error("Error updating course:", error));
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", background: "#f4f4f4", padding: "10px" }}>
            <h3>Editing {updatedCourse.title}</h3>
            <input 
                type="text"
                name="title"
                value={updatedCourse.title}
                onChange={handleChange}
                required
            />

            {/* Dropdown for Instructor */}
            <select 
                name="instructor" 
                value={updatedCourse.instructor} 
                onChange={handleChange}
                required
            >
                <option value="">Select Instructor</option>
                {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.name}>
                        {teacher.name}
                    </option>
                ))}
            </select>

            <input 
                type="number"
                name="duration"
                value={updatedCourse.duration}
                onChange={handleChange}
                required
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditCourseForm;
