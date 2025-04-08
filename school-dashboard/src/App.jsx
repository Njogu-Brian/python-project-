import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Outlet />  {/* This will render the current page */}
      </div>
    </div>
  );
}

export default App;
