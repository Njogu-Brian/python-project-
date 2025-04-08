import React, { useState } from "react";
import api from "../../services/axiosConfig";

const AddTeacherForm = ({ onAddTeacher }) => {
    const [newTeacher, setNewTeacher] = useState({
        name: "",
        subject: "",
        experience: "",
    });

    const handleChange = (e) => {
        setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newTeacher.name || !newTeacher.subject || !newTeacher.experience) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await api.post("/teachers", newTeacher);
            onAddTeacher(response.data);  // Notify parent to update UI
            setNewTeacher({ name: "", subject: "", experience: "" });  // Clear form
        } catch (error) {
            console.error("Error adding teacher:", error);
            alert("Failed to add teacher. Please try again.");
        }
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
