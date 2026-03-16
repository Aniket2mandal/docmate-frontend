import React, { useState } from "react";
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
                    🏠 Dashboard
                    <span className="sub">Overview and stats</span>
                </li>

                <li>👨‍⚕️ Doctors</li>
                <li>📋 Medical Record</li>
                <li>💊 Medicine Report</li>

                {/* Dropdown */}
                <li className="appointment" onClick={toggleDropdown}>
                    Appointment Details {open ? "▲" : "▼"}

                    {open && (
                        <div className="dropdown">
                            <p>Upcoming appointment</p>
                            <p>Previous appointment</p>
                        </div>
                    )}
                </li>
               
            </ul>
             <hr className="historyHr"></hr>
            <ul className="history">
                <li>🕘 History</li>
                <li>⚙️ Settings</li>
            </ul>
             <hr className="versionHr"></hr>
            <ul className="version">
                <li>⚙️️ V.1.0 Docmate </li>
            </ul>

            

        </div>
    );
};

export default Sidebar;