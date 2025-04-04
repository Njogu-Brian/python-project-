import React, { useEffect, useState } from 'react';
import api from '../services/api';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get('/students/')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} - Age {s.age} - Classroom {s.classroom_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
