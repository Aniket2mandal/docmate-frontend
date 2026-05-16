import React from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
// import DoctorDashboardCards from "../../../components/DoctorDashboardCard/DoctorDashboardCards";
// import DoctorHistoryProfile from "../../../components/DoctorHistoryProfileCard/DoctorHistoryProfile";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
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
              Dr. Linda Subedi 👋
            </h2>
          </div>

          {/* <DoctorDashboardCards /> */}

          <div className="bottom-section">
            {/* <DoctorHistoryProfile /> */}
          </div>

        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;