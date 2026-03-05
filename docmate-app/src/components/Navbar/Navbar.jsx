import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Docmate</h2>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="start-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;