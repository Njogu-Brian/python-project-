import React from "react";
import { Table, Button } from "react-bootstrap";

const CourseList = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="mt-3">
      <h4 className="text-center">Course List</h4>
      <Table striped bordered hover responsive className="mt-2">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Duration (weeks)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.instructor}</td>
              <td>{course.duration}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(course)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(course.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseList;
