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
  FaChevronUp,
  FaCalendarPlus,
  FaUsers,
  FaUserInjured,
  FaClipboardList,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const role = localStorage.getItem("role");

  const isPatient = role === "PATIENT";
  const isDoctor = role === "DOCTOR";
  const isAdmin = role === "ADMIN";

  return (
    <div className="sidebar">
      <h2 className="logo">Docmate</h2>

      <ul className="menu">
        {isPatient && (
          <>
            <li className="active">
              <FaHome className="icon" />
              <div className="menu-text">
                <a href="/dashboard/user" className="dashboard-link">
                  <span>Dashboard</span>
                </a>
                <span className="sub">Overview and stats</span>
              </div>
            </li>

            <li>
              <FaUserMd className="icon" />
              <a href="/dashboard/user/find-doctors" className="dashboard-link">
                <span>Find Doctors</span>
              </a>
            </li>

            <li>
              <FaFileMedical className="icon" />
              <a href="/dashboard/user/medical-records" className="dashboard-link">
                <span>Medical Record</span>
              </a>
            </li>

            <li>
              <FaCapsules className="icon" />
              <a href="/dashboard/user/medicine-reports" className="dashboard-link">
                <span>Medicine Report</span>
              </a>
            </li>

            <li className="appointment" onClick={toggleDropdown}>
              <div className="appointment-header">
                <div className="appointment-left">
                  <FaCalendarAlt className="icon" />
                  <span>Appointment Details</span>
                </div>

                {open ? (
                  <FaChevronUp className="arrow-icon" />
                ) : (
                  <FaChevronDown className="arrow-icon" />
                )}
              </div>

              {open && (
                <div className="dropdown">
                  <p>
                    <a
                      href="/dashboard/user/upcoming-appointments"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Upcoming appointment
                    </a>
                  </p>

                  <p>
                    <a
                      href="/dashboard/user/previous-appointments"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Previous appointment
                    </a>
                  </p>
                </div>
              )}
            </li>
          </>
        )}

        {isDoctor && (
          <>
            <li className="active">
              <FaHome className="icon" />
              <div className="menu-text">
                <a href="/dashboard/doctor" className="dashboard-link">
                  <span>Doctor Dashboard</span>
                </a>
                <span className="sub">Doctor overview</span>
              </div>
            </li>

            <li>
              <FaCalendarPlus className="icon" />
              <a href="/dashboard/doctor/schedule" className="dashboard-link">
                <span>Create Schedule</span>
              </a>
            </li>

            <li>
              <FaCalendarAlt className="icon" />
              <a href="/dashboard/doctor/schedule-list" className="dashboard-link">
                <span>View Schedule</span>
              </a>
            </li>
          </>
        )}

        {isAdmin && (
          <>
            <li className="active">
              <FaHome className="icon" />
              <div className="menu-text">
                <a href="/dashboard/admin" className="dashboard-link">
                  <span>Admin Dashboard</span>
                </a>
                <span className="sub">Admin overview</span>
              </div>
            </li>

            <li>
              <FaUserInjured className="icon" />
              <a href="/dashboard/admin/patients" className="dashboard-link">
                <span>Patients</span>
              </a>
            </li>

            <li>
              <FaUserMd className="icon" />
              <a href="/dashboard/admin/doctors" className="dashboard-link">
                <span>Doctors</span>
              </a>
            </li>

            <li>
              <FaCalendarAlt className="icon" />
              <a href="/dashboard/admin/appointments" className="dashboard-link">
                <span>Appointments</span>
              </a>
            </li>

            <li>
              <FaFileMedical className="icon" />
              <a href="/dashboard/admin/medical-records" className="dashboard-link">
                <span>Medical Records</span>
              </a>
            </li>

            <li>
              <FaClipboardList className="icon" />
              <a href="/dashboard/admin/reports" className="dashboard-link">
                <span>Reports</span>
              </a>
            </li>

            <li>
              <FaUsers className="icon" />
              <a href="/dashboard/admin/users" className="dashboard-link">
                <span>All Users</span>
              </a>
            </li>
          </>
        )}
      </ul>

      <hr className="historyHr" />

      <ul className="history">
        {isPatient && (
          <li>
            <FaHistory className="icon" />
            <a href="/dashboard/history" className="dashboard-link">
              <span>History</span>
            </a>
          </li>
        )}

        {/* {isAdmin && (
       
        )} */}

        <li>
          <FaCog className="icon" />
          <a href="/dashboard/settings" className="dashboard-link">
            <span>Settings</span>
          </a>
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