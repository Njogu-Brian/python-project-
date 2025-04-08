import React from "react";
import { Link } from "react-router-dom";
import "../../styles/DashboardCard.css"; // Importing custom styles

const DashboardCard = ({ title, image, description, link }) => {
  return (
    <div className="card dashboard-card shadow-sm">
      <img src={image} alt={title} className="card-img-top img-fluid" />
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to={link} className="btn btn-primary">Go to {title}</Link>
      </div>
    </div>
  );
};

export default DashboardCard;
