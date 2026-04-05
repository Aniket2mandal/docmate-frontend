import React, { useState } from "react";
import {
  FaHome,
  FaUserMd,
  FaFileMedical,
  FaCapsules,
  FaCalendarAlt,
  FaHistory,
  FaCog,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Docmate</h2>

      <ul className="menu">
        <li className="active">
          <FaHome className="icon" />
          <div className="menu-text">
            <a href="/dashboard" className="dashboard-link"><span>Dashboard</span></a>
            <span className="sub">Overview and stats</span>
          </div>
        </li>

        <li>
          <FaUserMd className="icon" />
          <a href="/dashboard/doctors" className="dashboard-link"><span>Doctors</span></a>
        </li>

        <li>
          <FaFileMedical className="icon" />
          <a href="/dashboard/medical-record" className="dashboard-link"><span>Medical Record</span></a>
        </li>

        <li>
          <FaCapsules className="icon" />
          <a href="/dashboard/medicine-report" className="dashboard-link"><span>Medicine Report</span></a>
        </li>

        <li className="appointment" onClick={toggleDropdown}>
          <div className="appointment-header">
            <div className="appointment-left">
              <FaCalendarAlt className="icon" />
              <span>Appointment Details</span>
            </div>
            {open ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
          </div>

          {open && (
            <div className="dropdown">
              <p>Upcoming appointment</p>
              <p>Previous appointment</p>
            </div>
          )}
        </li>
      </ul>

      <hr className="historyHr" />

      <ul className="history">
        <li>
          <FaHistory className="icon" />
          <a href="/dashboard/history" className="dashboard-link"><span>History</span></a>
        </li>
        <li>
          <FaCog className="icon" />
          <a href="/dashboard/settings" className="dashboard-link"><span>Settings</span></a>
        </li>
      </ul>

      <hr className="versionHr" />

      <ul className="version">
        <li>
          <FaCog className="icon" />
          <span>V.1.0 Docmate</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;