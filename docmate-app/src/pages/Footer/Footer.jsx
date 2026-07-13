import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h1>Docmate</h1>
            <p>
              Health Driven By
              <br />
              Technology
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3>Platform</h3>
              <Link to="/">Features</Link>
              <Link to="/">How It Works</Link>
              <Link to="/">Search Doctors</Link>
            </div>

            <div className="footer-column">
              <h3>Company</h3>
              <Link to="/">About Us</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Privacy Policy</Link>
            </div>

            <div className="footer-column">
              <h3>Contact</h3>
              <Link to="/">Linked In</Link>
              <Link to="/">Instagram</Link>
              <Link to="/">Facebook</Link>
            </div>
          </div>
        </div>

        <div className="footer-line"></div>

        <p className="footer-copy">© 2026 Docmate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;