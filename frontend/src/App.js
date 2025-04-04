// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import Student from './components/Student';
import ClassroomList from './components/ClassroomList';
import Classroom from './components/Classroom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<Student />} />
        <Route path="/classrooms" element={<ClassroomList />} />
        <Route path="/add-classroom" element={<Classroom />} />
      </Routes>
    </Router>
  );
}

export default App;
