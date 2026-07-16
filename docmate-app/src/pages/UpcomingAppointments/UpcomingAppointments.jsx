import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UpcomingAppointment.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { getPatientUpcomingAppointments } from "../../api/BackendApi";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("fetchAppointments started");
      try {
        const res = await getPatientUpcomingAppointments(patientId);
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchAppointments();
    }
  }, [patientId]);

  const formatDate = (date) => {
    if (!date) return "-";

    const [year, month, day] = date.split("-");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
  };

  const formatTime = (time) => {
    if (!time) return "-";

    const [hour, minute] = time.split(":");

    const h = Number(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;

    return `${hour12}:${minute} ${suffix}`;
  };

  return (
    <div className="dashboard-upcoming-page">
      <SideBar />

      <div className="dashboard-upcoming-main">
        <Navbar />

        <div className="dashboard-upcoming-content">
          <div className="upcoming-header">
            <h1>Upcoming Appointments</h1>
            <p>Your scheduled upcoming visits</p>
          </div>

          <div className="table-card">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="upcoming-table">
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appt, index) => {
                      console.log(appt);

                      return (
                        <tr key={appt.appointmentId}>
                          <td>{index + 1}</td>

                          <td>
                            {appt.doctor?.user?.firstName}{" "}
                            {appt.doctor?.user?.lastName}
                          </td>

                          <td>{appt.hospitalName || "-"}</td>

                          <td>{formatDate(appt.appointmentDate)}</td>

                          <td>{formatTime(appt.appointmentTime)}</td>

                          <td>
                            <Link
                              to={`/dashboard/user/appointment-detail/${appt.appointmentId}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <button className="view-btn">
                                View Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6">No upcoming appointments</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;