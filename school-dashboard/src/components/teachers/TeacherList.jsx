import React from "react";

const TeacherList = ({ teachers, onEditClick, onDeleteClick }) => {
  return (
    <div className="card mt-4 p-3">
      <h4 className="text-center">Teacher List</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Experience (Years)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.experience}</td>
              <td>
                <button 
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => onEditClick(teacher)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteClick(teacher.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
