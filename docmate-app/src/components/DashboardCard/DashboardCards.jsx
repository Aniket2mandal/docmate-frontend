import React from "react";
import { FaUserMd } from "react-icons/fa";
import "./DashboardCards.css";

const DashboardCards = () => {
  return (
    <div className="cards">

      <div className="card">
        <div className="doctor-card-img">
          <FaUserMd className="doctor-icon" />
        </div>
        <h4>Find Doctors</h4>
        <p>Find best doctors near you</p>
        <button>Get Started →</button>
      </div>

      <div className="card">
        <h4>Medical Records</h4>
        <p>View your medical history</p>
        <button>Get Started →</button>
      </div>

      <div className="card">
        <h4>Medicine Reports</h4>
        <p>Check your prescriptions</p>
        <button>Get Started →</button>
      </div>

    </div>
  );
};

export default DashboardCards;