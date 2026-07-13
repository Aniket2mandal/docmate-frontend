import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSun,
  FaMoon,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Navbar.css";
import { logoutUser } from "../../api/BackendApi";
import Swal from "sweetalert2";
import { useProfile } from "../../contexts/ProfileContext";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { profile } = useProfile();

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email") || "User";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "light-mode" : "dark-mode";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.clear();

      await Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been logged out successfully.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/");
    } catch (err) {
      console.error("Logout error", err);

      localStorage.clear();

      navigate("/login");
    }
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

  const profileImage = profile?.imageUrl;

  return (
    <div className="navbar">
      <h2 className="logo-nav">Docmate</h2>

      <input className="search" type="text" placeholder="Search" />

      <div className="profile" ref={menuRef}>
        <span className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </span>

        <FaBell className="notification-icon" />

        <img
          className="profile-img"
          src={profileImage}
          alt="profile"
          onClick={toggleMenu}
        />

        {menuOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">{userEmail}</div>

            <a
              href="/profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div className="dropdown-item">
                <FaUser className="dropdown-icon" />
                <span>Profile</span>
              </div>
            </a>

            <div className="dropdown-item">
              <FaCog className="dropdown-icon" />
              <span>Settings</span>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-item logout" onClick={handleLogout}>
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