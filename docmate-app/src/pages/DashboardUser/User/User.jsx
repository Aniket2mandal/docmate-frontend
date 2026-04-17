import React from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import DashboardCards from "../../../components/DashboardCard/DashboardCards";
// import HistoryCard from "../../components/HistoryCard/HistoryCard";
// import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./User.css";
import HistoryProfile from "../../../components/HistoryProfileCard/HistoryProfile";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <SideBar />
      
    
      <div className="main-content">
      <Navbar />
      <div className="bodyPart">

<div className="welcome">
        <h2 className="welcome-back">
          Welcome back,
        </h2>
        <h2 className="user-name">
          Linda Subedi 👋
        </h2>
        </div>

        <DashboardCards />

        <div className="bottom-section">
          <HistoryProfile/>
        </div>

      </div>
      </div>

    </div>
  );
};

export default Dashboard;