import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaArrowRight, FaFileMedical, FaPrescriptionBottleAlt } from "react-icons/fa";
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
        <Link
          to={`/dashboard/user/find-doctors`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        ><button className="doctor-card-button">Get Started <FaArrowRight /></button></Link>
      </div>

      <div className="card">
        <div className="record-img">
          <FaFileMedical className="record-icon" />
        </div>
        <h4>Medical Records</h4>
        <p>View your medical history</p>
        <Link
          to={`/dashboard/user/medical-records`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <button className="doctor-card-button">Get Started <FaArrowRight /></button>
        </Link>
      </div>

      <div className="card">
        <div className="report-img">
          <FaPrescriptionBottleAlt className="report-icon" />
        </div>
        <h4>Medicine Reports</h4>
        <p>Check your prescriptions</p>
        <Link
          to={`/dashboard/user/medicine-reports`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <button className="doctor-card-button">Get Started <FaArrowRight /></button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCards;