import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentLists.css"; 

const StudentList = ({ students, onEditClick, onDeleteClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Sorting
  const [sortField, setSortField] = useState("name");
  const sortedStudents = [...students].sort((a, b) =>
    a[sortField].toString().localeCompare(b[sortField].toString())
  );

  // Pagination Logic
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="student-list-container">
      <h5 className="text-center">Student List</h5>

      {/* Sorting Controls */}
      <div className="sorting-controls">
        <label>Sort by:</label>
        <select className="form-select" onChange={(e) => setSortField(e.target.value)}>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>

      {/* Student Table */}
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
                <button className="btn btn-sm btn-danger" onClick={() => onDeleteClick(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button className="btn btn-sm btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>← Previous</button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button className="btn btn-sm btn-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
      </div>
    </div>
  );
};

export default StudentList;
