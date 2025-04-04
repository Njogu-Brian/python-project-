import React from 'react';

function Classroom({ classroom }) {
  return (
    <div>
      <h4>{classroom.name}</h4>
      <p>Capacity: {classroom.capacity}</p>
    </div>
  );
}

export default Classroom;
