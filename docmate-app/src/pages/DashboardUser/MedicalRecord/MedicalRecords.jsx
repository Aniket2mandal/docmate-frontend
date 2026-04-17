import React from "react";
import "./MedicalRecords.css";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";

const medicalRecords = [
  {
    id: 1,
    title: "General Checkup",
    doctor: "Dr. Sarah Johnson",
    date: "12 March, 2026",
    hospital: "Docmate Care Center",
    status: "Completed",
    colorClass: "record-blue",
  },
  {
    id: 2,
    title: "Blood Test Report",
    doctor: "Dr. Michael Lee",
    date: "05 March, 2026",
    hospital: "Docmate Diagnostic Lab",
    status: "Pending Review",
    colorClass: "record-pink",
  },
  {
    id: 3,
    title: "Prescription Update",
    doctor: "Dr. Emily Brown",
    date: "28 February, 2026",
    hospital: "Docmate Clinic",
    status: "Completed",
    colorClass: "record-green",
  },
];

const MedicalRecords = () => {
  return (
    <div className="dashboard-medical-page">
      <SideBar />

      <div className="dashboard-medical-main">
        <Navbar />

        <div className="dashboard-medical-content">
          <div className="medical-record-header">
            <h1>Medical Records</h1>
            <p>View and manage your health history</p>
          </div>

          <div className="medical-record-summary">
            <div className="summary-card summary-blue">
              <h3>Total Records</h3>
              <span>12</span>
            </div>

            <div className="summary-card summary-pink">
              <h3>Pending Reports</h3>
              <span>03</span>
            </div>

            <div className="summary-card summary-green">
              <h3>Doctors Visited</h3>
              <span>08</span>
            </div>
          </div>

          <div className="medical-record-main">
            <div className="record-list-card">
              <div className="section-top">
                <h2>Recent Medical Records</h2>
                <button className="view-all-btn">View All</button>
              </div>

              <div className="record-list">
                {medicalRecords.map((record) => (
                  <div className={`record-item ${record.colorClass}`} key={record.id}>
                    <div className="record-item-left">
                      <h3>{record.title}</h3>
                      <p><strong>Doctor:</strong> {record.doctor}</p>
                      <p><strong>Date:</strong> {record.date}</p>
                      <p><strong>Hospital:</strong> {record.hospital}</p>
                    </div>

                    <div className="record-item-right">
                      <span
                        className={`status-badge ${
                          record.status === "Completed" ? "completed" : "pending"
                        }`}
                      >
                        {record.status}
                      </span>
                      <button className="details-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="record-profile-card">
              <h2>Record Overview</h2>
              <p>Your health record details</p>

              <div className="overview-row">
                <span>Last Visit</span>
                <strong>12 March, 2026</strong>
              </div>

              <div className="overview-row">
                <span>Primary Doctor</span>
                <strong>Dr. Sarah Johnson</strong>
              </div>

              <div className="overview-row">
                <span>Blood Group</span>
                <strong>B+</strong>
              </div>

              <div className="overview-row">
                <span>Allergies</span>
                <strong>None</strong>
              </div>

              <div className="overview-row">
                <span>Insurance</span>
                <strong>Active</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;