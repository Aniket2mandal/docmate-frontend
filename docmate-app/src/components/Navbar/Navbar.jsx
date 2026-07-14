import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
 const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { profile } = useProfile();

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email") || "User";

  // Apply dark mode class on initial mount and whenever it changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };


const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};

  const handleLogout = async () => {

    if (logoutLoading) return;

    setLogoutLoading(true);

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
    finally {
      setLogoutLoading(false);
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

            <Link to="/profile"
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
            </Link>

            <div className="dropdown-item">
              <FaCog className="dropdown-icon" />
              <span>Settings</span>
            </div>

            <div className="dropdown-divider"></div>

            <div
              className={`dropdown-item logout ${logoutLoading ? "disabled" : ""}`}
              onClick={!logoutLoading ? handleLogout : undefined}
            >
              <FaSignOutAlt className="dropdown-icon" />
              <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;