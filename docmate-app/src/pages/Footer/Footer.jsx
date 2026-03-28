import React from "react";
import "./Footer.css";

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
              <a href="/">Features</a>
              <a href="/">How It Works</a>
              <a href="/">Search Doctors</a>
            </div>

            <div className="footer-column">
              <h3>Company</h3>
              <a href="/">About Us</a>
              <a href="/">Contact</a>
              <a href="/">Privacy Policy</a>
            </div>

            <div className="footer-column">
              <h3>Contact</h3>
              <a href="/">Linked In</a>
              <a href="/">Instagram</a>
              <a href="/">Facebook</a>
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