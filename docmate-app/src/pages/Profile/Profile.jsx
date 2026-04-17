import React from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  return (
    <div className="dashboard-profile-page">
      <SideBar />

      <div className="dashboard-profile-main">
        <Navbar />

        <div className="dashboard-profile-content">
          <div className="profile-header">
            <h1>Profile Information</h1>
            <p>View your personal account details</p>
          </div>

          <div className="profile-center-wrapper">
            <div className="profile-card">
              <div className="profile-top">
                <div className="profile-avatar-section">
                  <div className="profile-avatar">L</div>
                  <button className="upload-image-btn">Upload Image</button>
                </div>

                <div className="profile-user-info">
                  <h2>Linda Subedi</h2>
                  <p>linda@gmail.com</p>
                  <span className="profile-badge">Active Member</span>
                </div>
              </div>

              <div className="profile-info-list">
                <div className="profile-row">
                  <span>Full Name</span>
                  <strong>Linda Subedi</strong>
                </div>

                <div className="profile-row">
                  <span>Email</span>
                  <strong>linda@gmail.com</strong>
                </div>

                <div className="profile-row">
                  <span>Phone</span>
                  <strong>+977 98XXXXXXXX</strong>
                </div>

                <div className="profile-row">
                  <span>Address</span>
                  <strong>Kathmandu, Nepal</strong>
                </div>

                <div className="profile-row">
                  <span>Member Since</span>
                  <strong>March, 2026</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;