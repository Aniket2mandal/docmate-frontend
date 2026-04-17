import React from "react";
import "./PreviousAppointment.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    hospital: "Docmate Care Center",
    date: "20 March, 2026",
  },
  {
    id: 2,
    doctor: "Dr. Michael Lee",
    hospital: "Docmate Eye Clinic",
    date: "22 March, 2026",
  },
  {
    id: 3,
    doctor: "Dr. Emily Brown",
    hospital: "Docmate Clinic",
    date: "25 March, 2026",
  },
];

const PreviousAppointments = () => {
  return (
    <div className="dashboard-upcoming-page">
      <SideBar />

      <div className="dashboard-upcoming-main">
        <Navbar />

        <div className="dashboard-upcoming-content">
          <div className="upcoming-header">
            <h1>Previous Appointments</h1>
            <p>Your scheduled previous visits</p>
          </div>

          <div className="table-card">
            <table className="upcoming-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Hospital</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.doctor}</td>
                    <td>{appt.hospital}</td>
                    <td>{appt.date}</td>
                    <td>
                      <button className="view-btn">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PreviousAppointments;