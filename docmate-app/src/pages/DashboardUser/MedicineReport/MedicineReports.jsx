import React from "react";
import "./MedicineReports.css";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";

const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    dosage: "500mg",
    doctor: "Dr. Sarah Johnson",
    status: "Active",
    colorClass: "record-blue",
  },
  {
    id: 2,
    name: "Amoxicillin",
    dosage: "250mg",
    doctor: "Dr. Michael Lee",
    status: "Completed",
    colorClass: "record-pink",
  },
];

const MedicineReports = () => {
  return (
    <div className="dashboard-medicine-page">
      <SideBar />

      <div className="dashboard-medicine-main">
        <Navbar />

        <div className="dashboard-medicine-content">
          <div className="medicine-header">
            <h1>Medicine Reports</h1>
            <p>Check your prescriptions</p>
          </div>

          {/* small summary */}
          <div className="medicine-summary">
            <div className="summary-card summary-blue">
              <h3>Total Medicines</h3>
              <span>05</span>
            </div>

            <div className="summary-card summary-green">
              <h3>Active</h3>
              <span>02</span>
            </div>
          </div>

          {/* list */}
          <div className="medicine-list-card">
            <h2>Recent Medicines</h2>

            <div className="medicine-list">
              {medicines.map((med) => (
                <div className={`medicine-item ${med.colorClass}`} key={med.id}>
                  <div>
                    <h3>{med.name}</h3>
                    <p>Dosage: {med.dosage}</p>
                    <p>Doctor: {med.doctor}</p>
                  </div>

                  {/* <span
                    className={`status-badge ${
                      med.status === "Active" ? "active" : "completed"
                    }`}
                  >
                    {med.status}
                  </span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineReports;