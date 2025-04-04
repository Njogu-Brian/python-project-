import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = {
  marginRight: "10px",
  textDecoration: "none",
  color: "#333",
};

const activeStyle = {
  fontWeight: "bold",
  color: "#007bff",
};

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <NavLink to="/" end style={linkStyle} activeStyle={activeStyle}>
        Home
      </NavLink>
      <NavLink to="/students" style={linkStyle} activeStyle={activeStyle}>
        Students
      </NavLink>
      <NavLink to="/classrooms" style={linkStyle} activeStyle={activeStyle}>
        Classrooms
      </NavLink>
      <NavLink to="/staff" style={linkStyle} activeStyle={activeStyle}>
        Staff
      </NavLink>
      <NavLink to="/teachers" style={linkStyle} activeStyle={activeStyle}>
        Teachers
      </NavLink>
      <NavLink to="/finance" style={linkStyle} activeStyle={activeStyle}>
        Finance
      </NavLink>
    </nav>
  );
};

export default Navbar;
