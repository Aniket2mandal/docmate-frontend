import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaSun, FaMoon, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "light-mode" : "dark-mode";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="navbar">

      <h2 className="logo-nav">Docmate</h2>

      <input
        className="search"
        type="text"
        placeholder="Search"
      />

      <div className="profile" ref={menuRef}>
        {/* Dark/Light Mode Icon */}
        <span className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </span>
        <FaBell className="notification-icon" />
        <img
          className="profile-img"
          src="https://i.pravatar.cc/40"
          alt="profile"
          onClick={toggleMenu}
        />


        {menuOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">aniketmandal778@gmail.com</div>

            <div className="dropdown-item">
              <FaUser className="dropdown-icon" />
              <span>Profile</span>
            </div>

            <div className="dropdown-item">
              <FaCog className="dropdown-icon" />
              <span>Settings</span>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-item logout">
              <FaSignOutAlt className="dropdown-icon" />
              <span>Logout</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default Navbar;