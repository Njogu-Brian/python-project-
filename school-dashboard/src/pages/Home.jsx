import React from "react";
import dashboardData from "../Data/dashboardData";
import DashboardCard from "../components/Dashboard/dashboardCard";
import "../styles/Home.css"; // Importing custom styles

const Home = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">🎓 Welcome to the School Dashboard</h2>
      <p className="text-center">Manage different aspects of the school system efficiently.</p>

      <div className="row">
        {dashboardData.map((item, index) => (
          <div key={index} className="col-md-4">
            <DashboardCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
