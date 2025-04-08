import React, { useState, useEffect } from "react";
import StudentList from "../components/Students/StudentList";
import AddStudentForm from "../components/Students/AddStudentForm";
import EditStudentForm from "../components/Students/EditStudentForm";
import SortFilterControls from "../components/Students/SortFilterControls";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Students.css"; 

const Students = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [sortOption, setSortOption] = useState("name");
    const [showOnlyGrade, setShowOnlyGrade] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/students")
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);

    const addStudent = (newStudent) => {
        fetch("http://localhost:4000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent),
        })
        .then(res => res.json())
        .then(data => setStudents([...students, data]))
        .catch(error => console.error("Error adding student:", error));
    };

    const editStudent = (e) => {
        setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
    };

    const saveEditStudent = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/students/${editingStudent.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingStudent),
        })
        .then(res => res.json())
        .then(updatedStudent => {
            setStudents(students.map(student => 
                student.id === updatedStudent.id ? updatedStudent : student
            ));
            setEditingStudent(null);
        })
        .catch(error => console.error("Error updating student:", error));
    };

    const deleteStudent = (id) => {
        fetch(`http://localhost:4000/students/${id}`, {
            method: "DELETE",
        })
        .then(() => setStudents(students.filter(student => student.id !== id)))
        .catch(error => console.error("Error deleting student:", error));
    };

    const sortStudents = (a, b) => {
        if (sortOption === "name") return a.name.localeCompare(b.name);
        if (sortOption === "age") return a.age - b.age;
        return 0;
    };

    const filteredStudents = students
        .filter(student => showOnlyGrade ? student.grade.toLowerCase() === showOnlyGrade.toLowerCase() : true)
        .sort(sortStudents);

    return (
        <div className="container student-container">
            <h2 className="text-center mb-4">🎓 Students Management</h2>

            {/* Sorting & Filtering Controls */}
            <SortFilterControls 
                sortOption={sortOption} 
                setSortOption={setSortOption} 
                showOnlyGrade={showOnlyGrade} 
                setShowOnlyGrade={setShowOnlyGrade} 
            />

            {/* Row Layout for Forms & Student List */}
            <div className="row">
                <div className="col-md-5">
                    {/* Add Student Form */}
                    <div className="card shadow p-3">
                        <h5>Add Student</h5>
                        <AddStudentForm onAddStudent={addStudent} />
                    </div>

                    {/* Edit Student Form */}
                    {editingStudent && (
                        <div className="card shadow p-3 mt-3">
                            <h5>Edit Student</h5>
                            <EditStudentForm 
                                editingStudent={editingStudent} 
                                onEditChange={editStudent} 
                                onSaveEdit={saveEditStudent} 
                                onCancelEdit={() => setEditingStudent(null)} 
                            />
                        </div>
                    )}
                </div>

                {/* Student List Section */}
                <div className="col-md-7">
                    <div className="card shadow p-3">
                        <h5>Student List</h5>
                        <StudentList 
                            students={filteredStudents} 
                            onEditClick={setEditingStudent} 
                            onDeleteClick={deleteStudent} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Students;
