import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    api.get('/teachers/')
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((t) => (
          <li key={t.id}>{t.name} - {t.subject}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
