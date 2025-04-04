import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Classroom from './Classroom';

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/classrooms/')
      .then(response => setClassrooms(response.data))
      .catch(error => console.error('Error fetching classrooms:', error));
  }, []);

  return (
    <div>
      <h2>Classroom List</h2>
      {classrooms.map(classroom => (
        <Classroom key={classroom.id} classroom={classroom} />
      ))}
    </div>
  );
}

export default ClassroomList;
