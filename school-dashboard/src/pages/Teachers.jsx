import React, { useState, useEffect } from "react";
import TeacherList from "../components/teachers/TeacherList";
import AddTeacherForm from "../components/teachers/AddTeacherForm";
import EditTeacherForm from "../components/teachers/EditTeacherForm";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [editingTeacher, setEditingTeacher] = useState(null);

    // Fetch teachers from JSON Server
    useEffect(() => {
        fetch("http://localhost:4000/teachers")
            .then((res) => res.json())
            .then((data) => setTeachers(data))
            .catch((error) => console.error("Error fetching teachers:", error));
    }, []);

    // ✅ Add new teacher
    const addTeacher = (newTeacher) => {
        fetch("http://localhost:4000/teachers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTeacher),
        })
        .then((res) => res.json())
        .then((data) => {
            setTeachers([...teachers, data]); // Update UI
        })
        .catch((error) => console.error("Error adding teacher:", error));
    };

    // ✅ Edit teacher
    const editTeacher = (e) => {
        setEditingTeacher({ ...editingTeacher, [e.target.name]: e.target.value });
    };

    // ✅ Save edited teacher
    const saveEditTeacher = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/teachers/${editingTeacher.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingTeacher),
        })
        .then((res) => res.json())
        .then((updatedTeacher) => {
            setTeachers(teachers.map((teacher) => 
                teacher.id === updatedTeacher.id ? updatedTeacher : teacher
            ));
            setEditingTeacher(null);
        })
        .catch((error) => console.error("Error updating teacher:", error));
    };

    // ✅ Delete teacher
    const deleteTeacher = (id) => {
        fetch(`http://localhost:4000/teachers/${id}`, {
            method: "DELETE",
        })
        .then(() => setTeachers(teachers.filter((teacher) => teacher.id !== id)))
        .catch((error) => console.error("Error deleting teacher:", error));
    };

    return (
        <div>
            <h2>Teachers</h2>
            <AddTeacherForm onAddTeacher={addTeacher} />
            {editingTeacher && (
                <EditTeacherForm 
                    editingTeacher={editingTeacher} 
                    onEditChange={editTeacher} 
                    onSaveEdit={saveEditTeacher} 
                    onCancelEdit={() => setEditingTeacher(null)} 
                />
            )}
            <TeacherList teachers={teachers} onEditClick={setEditingTeacher} onDeleteClick={deleteTeacher} />
        </div>
    );
};

export default Teachers;
