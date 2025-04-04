// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClassroomList from "./ClassroomList";
import StudentList from "./StudentList";

function App() {
  return (
    <Router>
      <div>
        <h1>📚 School Management System</h1>
        <nav>
          <ul>
            <li><Link to="/classrooms">Classrooms</Link></li>
            <li><Link to="/students">Students</Link></li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/classrooms" element={<ClassroomList />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
