import React, { useState, useEffect } from "react";
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
  FaAward,
  FaHourglassHalf,
  FaBars,
} from "react-icons/fa";
import "./SideBar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);

  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const role = localStorage.getItem("role");

  const isPatient = role === "PATIENT";
  const isDoctor = role === "DOCTOR";
  const isAdmin = role === "ADMIN";

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>

        {!collapsed && <h2 className="logo">Docmate</h2>}
      </div>
      {/* <h2 className="logo">Docmate</h2> */}

      <ul className="menu">
        {isPatient && (
          <>
            <li className="active">
              <FaHome className="icon" />
              {!collapsed && (
                <Link to="/dashboard/user" className="dashboard-link">
                  <div className="menu-text">
                    <span>Dashboard</span>
                    <span className="sub">Overview and stats</span>
                  </div>
                </Link>
              )}
            </li>

            <li>
              <FaUserMd className="icon" />
              <Link to="/dashboard/user/find-doctors" className="dashboard-link">
                {!collapsed && <span>Find Doctors</span>}
              </Link>
            </li>

            <li>
              <FaFileMedical className="icon" />
              <Link to="/dashboard/user/medical-records" className="dashboard-link">
                {!collapsed && <span>Medical Record</span>}
              </Link>
            </li>

            <li>
              <FaCapsules className="icon" />
              <Link to="/dashboard/user/medicine-reports" className="dashboard-link">
                {!collapsed && <span>Medicine Report</span>}
              </Link>
            </li>

            {!collapsed && (
              <li className="appointment">
                <div className="appointment-header" onClick={toggleDropdown}>
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
                      <Link to="/dashboard/user/upcoming-appointments"
                        className="dashboard-link"
                      >
                        Upcoming Appointment
                      </Link>
                    </p>

                    <p>
                      <Link to="/dashboard/user/previous-appointments"
                        className="dashboard-link"
                      >
                        Previous Appointment
                      </Link>
                    </p>
                  </div>
                )}
              </li>
            )}
          </>
        )}

        {isDoctor && (
          <>
            <li className="active">
              <FaHome className="icon" />

              {!collapsed && (
                <div className="menu-text">
                  <Link to="/dashboard/doctor" className="dashboard-link">
                    <span>Doctor Dashboard</span>
                  </Link>
                  <span className="sub">Doctor overview</span>
                </div>
              )}
            </li>

            <li>
              <FaCalendarPlus className="icon" />

              <Link to="/dashboard/doctor/schedule" className="dashboard-link">
                {!collapsed && <span>Create Schedule</span>}
              </Link>
            </li>

            <li>
              <FaCalendarAlt className="icon" />

              <Link to="/dashboard/doctor/schedule-list" className="dashboard-link">
                {!collapsed && <span>View Schedule</span>}
              </Link>
            </li>

            {!collapsed && (
              <li className="appointment">
                <div className="appointment-header" onClick={toggleDropdown}>
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
                      <Link to="/dashboard/doctor/upcoming-appointments"
                        className="dashboard-link"
                      >
                        Upcoming Appointment
                      </Link>
                    </p>

                    <p>
                      <Link to="/dashboard/doctor/previous-appointments"
                        className="dashboard-link"
                      >
                        Previous Appointment
                      </Link>
                    </p>
                  </div>
                )}
              </li>
            )}

          </>
        )}

        {isAdmin && (
          <>
            <li className="active">
              <FaHome className="icon" />

              {!collapsed && (
                <div className="menu-text">
                  <Link to="/dashboard/admin" className="dashboard-link">
                    <span>Admin Dashboard</span>
                  </Link>
                  <span className="sub">Admin overview</span>
                </div>
              )}
            </li>

            <li>
              <FaUserInjured className="icon" />
              <Link to="/dashboard/admin/patients" className="dashboard-link">
                {!collapsed && <span>Patients</span>}
              </Link>
            </li>

            <li>
              <FaUserMd className="icon" />
              <Link to="/dashboard/admin/doctors" className="dashboard-link">
                {!collapsed && <span>Doctors</span>}
              </Link>
            </li>

            <li>
              <FaHourglassHalf className="icon" />
              <Link to="/dashboard/admin/doctor-requests" className="dashboard-link">
                {!collapsed && <span>Doctor Request</span>}
              </Link>
            </li>

            <li>
              <FaAward className="icon" />
              <Link to="/dashboard/admin/roles" className="dashboard-link">
                {!collapsed && <span>Role</span>}
              </Link>
            </li>

            <li>
              <FaUsers className="icon" />
              <Link to="/dashboard/admin/users" className="dashboard-link">
                {!collapsed && <span>All Users</span>}
              </Link>
            </li>

          </>
        )}
      </ul>

      <hr className="historyHr" />

      <ul className="history">
        {isPatient && (
          <li>
            <FaHistory className="icon" />
            <Link to="/dashboard/history" className="dashboard-link">
              <span>History</span>
            </Link>
          </li>
        )}

        {/* {isAdmin && (
       
        )} */}

        <li>
          <FaCog className="icon" />
          <Link to="/dashboard/settings" className="dashboard-link">
            <span>Settings</span>
          </Link>
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