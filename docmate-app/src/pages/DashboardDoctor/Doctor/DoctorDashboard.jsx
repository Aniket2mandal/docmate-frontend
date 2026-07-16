import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import {
  getDoctorUpcomingAppointments,
  getDoctorPreviousAppointments,
} from "../../../api/BackendApi";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const name = localStorage.getItem("name") || "User";
  const doctorId = localStorage.getItem("doctorId");

  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);

  const [todayCount, setTodayCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [previousCount, setPreviousCount] = useState(0);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const [upcomingResponse, previousResponse] = await Promise.all([
        getDoctorUpcomingAppointments(doctorId),
        getDoctorPreviousAppointments(doctorId),
      ]);

      if (upcomingResponse.data.status) {
        const upcomingData = upcomingResponse.data.data;

        setAppointments(upcomingData);

        const today = new Date().toISOString().split("T")[0];

        const todayData = upcomingData.filter(
          (appointment) => appointment.appointmentDate === today
        );

        setTodayAppointments(todayData);

        setTodayCount(todayData.length);
        setUpcomingCount(upcomingData.length);
      }

      if (previousResponse.data.status) {
        setPreviousCount(previousResponse.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
              <h3>Today's Appointments</h3>
              <h1>{todayCount}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Upcoming Appointments</h3>
              <h1>{upcomingCount}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Previous Appointments</h3>
              <h1>{previousCount}</h1>
            </div>
          </div>

          {/* Today's Appointment List */}

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
                      <strong>Time:</strong>{" "}
                      {appointment.appointmentTime.slice(0, 5)}
                    </p>

                    <p>
                      <strong>Reason:</strong>{" "}
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