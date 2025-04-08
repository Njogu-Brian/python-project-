import React, { useState } from "react";

const AddTeacherForm = ({ onAddTeacher }) => {
    const [newTeacher, setNewTeacher] = useState({
        name: "",
        subject: "",
        experience: "",
    });

    const handleChange = (e) => {
        setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure no empty values
        if (!newTeacher.name || !newTeacher.subject || !newTeacher.experience) {
            alert("All fields are required!");
            return;
        }

        // Send new teacher to parent component
        onAddTeacher(newTeacher);

        // Reset form
        setNewTeacher({ name: "", subject: "", experience: "" });
    };

    return (
        <div className="card p-3 mt-3 shadow-sm bg-light">
            <h4 className="text-center">Add New Teacher</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newTeacher.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={newTeacher.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Years of Experience</label>
                    <input
                        type="number"
                        className="form-control"
                        name="experience"
                        value={newTeacher.experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Add Teacher</button>
            </form>
        </div>
    );
};

export default AddTeacherForm;
