import React from 'react';

function Student({ student }) {
  return (
    <div>
      <h4>{student.name}</h4>
      <p>Age: {student.age}</p>
      <p>Classroom ID: {student.classroom_id}</p>
    </div>
  );
}

export default Student;
