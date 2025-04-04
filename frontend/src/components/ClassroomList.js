import React, { useEffect, useState } from 'react';
import api from '../services/api';

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    api.get('/classrooms/')
      .then(res => setClassrooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Classrooms</h2>
      <ul>
        {classrooms.map((c) => (
          <li key={c.id}>{c.name} - {c.capacity} students</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassroomList;
