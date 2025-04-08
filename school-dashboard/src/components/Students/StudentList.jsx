import React, { useEffect, useState } from "react";
import { fetchStudents, deleteStudent } from "../../services/studentService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentList.css";

const StudentList = ({ onEditClick }) => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [sortField, setSortField] = useState("name");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await fetchStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  const sortedStudents = [...students].sort((a, b) =>
    a[sortField].toString().localeCompare(b[sortField].toString())
  );

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="student-list-container">
      <h5 className="text-center">Student List</h5>

      <div className="sorting-controls">
        <label>Sort by:</label>
        <select className="form-select" onChange={(e) => setSortField(e.target.value)}>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age} years</td>
              <td>{student.grade}</td>
              <td>
                <button className="btn btn-sm btn-success me-2" onClick={() => onEditClick(student)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button className="btn btn-sm btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>← Previous</button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button className="btn btn-sm btn-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
      </div>
    </div>
  );
};

export default StudentList;
