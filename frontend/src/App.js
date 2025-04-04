// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Classroom from "./components/Classroom";
import ClassroomList from "./components/ClassroomList";
import Student from "./components/Student";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import StaffList from "./components/StaffList";
import FinanceList from "./components/FinanceList";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classrooms" element={<ClassroomList />} />
          <Route path="/add-classroom" element={<Classroom />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<Student />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/finance" element={<FinanceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
