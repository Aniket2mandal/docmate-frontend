import { useLocation } from "react-router-dom";
import "./AppointmentDetail.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";

const AppointmentDetail = () => {
  const { state } = useLocation();

  // ✅ Demo fallback data
  const demoData = {
    appointmentId: "demo-123",
    appointmentDateTime: "2026-04-19T09:35:00",
    status: "BOOKED",
    reasonForVisit: "General Checkup",
    doctor: {
      specialization: "Cardiology",
      experience: 8,
      consultation_fee: "2000",
      user: {
        firstName: "Doctor 2",
        lastName: "Subedi",
        email: "doctor2@gmail.com",
        phone: "9824790011"
      }
    },
    patient: {
      age: 20,
      weight: 59,
      height: 5.7,
      user: {
        firstName: "Linda",
        lastName: "Subedi"
      }
    }
  };

  // ✅ Use state OR fallback
  const appt = state || demoData;

  const doctor = appt.doctor?.user;
  const patient = appt.patient?.user;

  return (
    <div className="dashboard-upcoming-page">
      <SideBar />

      <div className="dashboard-upcoming-main">
        <Navbar />

       <div className="details-container">
  <h1 className="page-title">Appointment Details</h1>

  <div className="details-grid">

    {/* LEFT SIDE */}
    <div className="left-panel">

      {/* Doctor Card */}
      <div className="info-card">
        <div className="card-header">
          <h3>Doctor</h3>
        </div>

        <div className="profile-row">
          <img
            src={doctor?.imageUrl || "/default-user.png"}
            alt="doctor"
            className="profile-img"
          />

          <div>
            <h4>{doctor?.firstName} {doctor?.lastName}</h4>
            <p>{appt.doctor?.specialization}</p>
          </div>
        </div>

        <div className="info-grid">
          <p><span>Email:</span> {doctor?.email}</p>
          <p><span>Phone:</span> {doctor?.phone}</p>
          <p><span>Experience:</span> {appt.doctor?.experience} yrs</p>
          <p><span>Fee:</span> Rs. {appt.doctor?.consultation_fee}</p>
        </div>
      </div>

      {/* Patient Card */}
      <div className="info-card">
        <div className="card-header">
          <h3>Patient</h3>
        </div>

        <div className="profile-row">
          <img
            src={patient?.imageUrl || "/default-user.png"}
            alt="patient"
            className="profile-img"
          />

          <div>
            <h4>{patient?.firstName} {patient?.lastName}</h4>
          </div>
        </div>

        <div className="info-grid">
          <p><span>Age:</span> {appt.patient?.age}</p>
          <p><span>Weight:</span> {appt.patient?.weight} kg</p>
          <p><span>Height:</span> {appt.patient?.height} ft</p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="right-panel">

      <div className="info-card big">
        <div className="card-header">
          <h3>Appointment Info</h3>
          <span className={`status ${appt.status.toLowerCase()}`}>
            {appt.status}
          </span>
        </div>

        <div className="info-grid">
          <p>
            <span>Date:</span>{" "}
            {new Date(appt.appointmentDateTime).toLocaleString()}
          </p>

          <p>
            <span>Reason:</span> {appt.reasonForVisit || "N/A"}
          </p>
        </div>

        <div className="action-buttons">
          <button className="primary-btn">Book Again</button>
          <button className="secondary-btn">Medical Record</button>
          <button className="secondary-btn">Medication</button>
        </div>
      </div>

    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default AppointmentDetail;