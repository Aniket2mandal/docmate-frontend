import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "light-mode" : "dark-mode";
  };

  return (
    <div className="navbar">

      <h2 className="logo-nav">Docmate</h2>

      <input
        className="search"
        type="text"
        placeholder="Search"
      />

      <div className="profile">
        {/* Dark/Light Mode Icon */}
        <span className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </span>
        <FaBell className="notification-icon" />
        <img className="profile-img"
          src="https://i.pravatar.cc/40"
          alt="profile"
        />
      </div>

    </div>
  );
};

export default Navbar;