import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import DoctorList from "../../components/DoctorList/DoctorList";
import "./DashboardUserDoctor.css";

const DashboardUserDoctors = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="dashboard-doctors-page">
      <SideBar />

      <div className="dashboard-doctors-main">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="dashboard-doctors-content">
          <div className="dashboard-doctors-header">
            <h2>Find Doctors</h2>
            <p>Search doctors by province, district, and specialization.</p>
          </div>

          <div className="dashboard-search-wrapper">
            <SearchBar />
          </div>

          <div className="dashboard-doctor-list-wrapper">
            <DoctorList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserDoctors;