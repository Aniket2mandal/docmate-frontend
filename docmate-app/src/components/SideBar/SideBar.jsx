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
                <a href="/dashboard/user" className="dashboard-link">
                  <div className="menu-text">
                    <span>Dashboard</span>
                    <span className="sub">Overview and stats</span>
                  </div>
                </a>
              )}
            </li>

            <li>
              <FaUserMd className="icon" />
              <a href="/dashboard/user/find-doctors" className="dashboard-link">
                {!collapsed && <span>Find Doctors</span>}
              </a>
            </li>

            <li>
              <FaFileMedical className="icon" />
              <a href="/dashboard/user/medical-records" className="dashboard-link">
                {!collapsed && <span>Medical Record</span>}
              </a>
            </li>

            <li>
              <FaCapsules className="icon" />
              <a href="/dashboard/user/medicine-reports" className="dashboard-link">
                {!collapsed && <span>Medicine Report</span>}
              </a>
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
                      <a
                        href="/dashboard/user/upcoming-appointments"
                        className="dashboard-link"
                      >
                        Upcoming Appointment
                      </a>
                    </p>

                    <p>
                      <a
                        href="/dashboard/user/previous-appointments"
                        className="dashboard-link"
                      >
                        Previous Appointment
                      </a>
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
                  <a href="/dashboard/doctor" className="dashboard-link">
                    <span>Doctor Dashboard</span>
                  </a>
                  <span className="sub">Doctor overview</span>
                </div>
              )}
            </li>

            <li>
              <FaCalendarPlus className="icon" />

              <a href="/dashboard/doctor/schedule" className="dashboard-link">
                {!collapsed && <span>Create Schedule</span>}
              </a>
            </li>

            <li>
              <FaCalendarAlt className="icon" />

              <a href="/dashboard/doctor/schedule-list" className="dashboard-link">
                {!collapsed && <span>View Schedule</span>}
              </a>
            </li>
          </>
        )}

        {isAdmin && (
          <>
            <li className="active">
              <FaHome className="icon" />

              {!collapsed && (
                <div className="menu-text">
                  <a href="/dashboard/admin" className="dashboard-link">
                    <span>Admin Dashboard</span>
                  </a>
                  <span className="sub">Admin overview</span>
                </div>
              )}
            </li>

            <li>
              <FaUserInjured className="icon" />
              <a href="/dashboard/admin/patients" className="dashboard-link">
                {!collapsed && <span>Patients</span>}
              </a>
            </li>

            <li>
              <FaUserMd className="icon" />
              <a href="/dashboard/admin/doctors" className="dashboard-link">
                {!collapsed && <span>Doctors</span>}
              </a>
            </li>

            <li>
              <FaHourglassHalf className="icon" />
              <a href="/dashboard/admin/doctor-requests" className="dashboard-link">
                {!collapsed && <span>Doctor Request</span>}
              </a>
            </li>

            <li>
              <FaAward className="icon" />
              <a href="/dashboard/admin/roles" className="dashboard-link">
                {!collapsed && <span>Role</span>}
              </a>
            </li>

            <li>
              <FaUsers className="icon" />
              <a href="/dashboard/admin/users" className="dashboard-link">
                {!collapsed && <span>All Users</span>}
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