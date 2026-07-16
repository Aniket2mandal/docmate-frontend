import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getDoctorUpcomingAppointments } from "../../../api/BackendApi";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const name = localStorage.getItem("name") || "User";
  const doctorId = localStorage.getItem("doctorId");

  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getDoctorUpcomingAppointments(doctorId);

      if (response.data.status) {
        const data = response.data.data;

        setAppointments(data);

        const today = new Date().toISOString().split("T")[0];

        const todayData = data.filter(
          (item) => item.appointmentDate === today
        );

        setTodayAppointments(todayData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <SideBar />

      <div className="main-content">
        <Navbar />

        <div className="bodyPart">

          <div className="welcome">
            <h2 className="welcome-back">Welcome back,</h2>
            <h2 className="user-name">Dr. {name} 👋</h2>
          </div>

          {/* Dashboard Cards */}

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Upcoming Appointments</h3>
              <h1>{appointments.length}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Previous Appointments</h3>
              <h1>0</h1>
            </div>

          </div>

          {/* Today's Appointments */}

          <div className="today-card">

            <h2>Today's Appointments</h2>

            {todayAppointments.length === 0 ? (
              <p className="empty-text">No appointments today.</p>
            ) : (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.appointmentId}
                  className="appointment-item"
                >
                  <div>
                    <h3>
                      {appointment.patient.user.firstName}{" "}
                      {appointment.patient.user.lastName}
                    </h3>

                    <p>
                      {appointment.appointmentTime.slice(0, 5)}
                    </p>

                    <p>
                      {appointment.reasonForVisit || "No reason provided"}
                    </p>
                  </div>

                  <span className="status">
                    {appointment.status}
                  </span>
                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;