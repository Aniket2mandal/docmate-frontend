import React from "react";
import { FaUserMd, FaArrowRight, FaFileMedical, FaPrescriptionBottleAlt } from "react-icons/fa";
import "./HistoryProfile.css";

const HistoryProfile = () => {
    return (
        <div className="history-cards">

            <div className="history-card">
                <h4>Recent History</h4>
                <p>Your recent activities here</p>
                <div className="history-one">
                    <p>History one</p>
                </div>
                <div className="history-two">
                    <p>History two</p>
                </div>
                <div className="history-three">
                    <p>History three</p>
                </div>
                <button className="history-card-button">View Full History <FaArrowRight /></button>
            </div>

            <div className="profile-card">
                <h4>Profile Information</h4>
                <p>Your account details</p>
                <div className="profile-item">
                    <span className="label">Plan</span>
                    <span className="badge free">Free</span>
                </div>

                <div className="profile-item">
                    <span className="label">Status</span>
                    <span className="badge active">Active</span>
                </div>

                <div className="profile-item">
                    <span className="label">Email</span>
                    <span className="text-muted">linda@gmail.com</span>
                </div>

                <div className="profile-item">
                    <span className="label">Member since</span>
                    <span className="text-muted">March, 2026</span>
                </div>
                <button className="profile-card-button">View Profile <FaArrowRight /></button>
            </div>
        </div>
    );
};

export default HistoryProfile;