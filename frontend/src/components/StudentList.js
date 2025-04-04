import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Student from './Student';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/students/')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      {students.map(student => (
        <Student key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentList;
