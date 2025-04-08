import React, { useState, useEffect } from "react";
import StudentList from "../components/Students/StudentList";
import AddStudentForm from "../components/Students/AddStudentForm";
import EditStudentForm from "../components/Students/EditStudentForm";
import SortFilterControls from "../components/Students/SortFilterControls";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "../services/studentService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [showOnlyGrade, setShowOnlyGrade] = useState("");

  // Fetch students on load
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await fetchStudents();
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      await addStudent(newStudent);
      loadStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(editingStudent.id, editingStudent);
      setEditingStudent(null);
      loadStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const sortStudents = (a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "age") return a.age - b.age;
    return 0;
  };

  const filteredStudents = students
    .filter(student => showOnlyGrade ? student.grade?.toLowerCase() === showOnlyGrade.toLowerCase() : true)
    .sort(sortStudents);

  return (
    <div className="container student-container">
      <h2 className="text-center mb-4">🎓 Students Management</h2>

      <SortFilterControls
        sortOption={sortOption}
        setSortOption={setSortOption}
        showOnlyGrade={showOnlyGrade}
        setShowOnlyGrade={setShowOnlyGrade}
      />

      <div className="row">
        <div className="col-md-5">
          <div className="card shadow p-3">
            <h5>Add Student</h5>
            <AddStudentForm onAddStudent={handleAddStudent} />
          </div>

          {editingStudent && (
            <div className="card shadow p-3 mt-3">
              <h5>Edit Student</h5>
              <EditStudentForm
                editingStudent={editingStudent}
                onEditChange={handleEditChange}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditingStudent(null)}
              />
            </div>
          )}
        </div>

        <div className="col-md-7">
          <div className="card shadow p-3">
            <h5>Student List</h5>
            <StudentList
              students={filteredStudents}
              onEditClick={setEditingStudent}
              onDeleteClick={handleDeleteStudent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
