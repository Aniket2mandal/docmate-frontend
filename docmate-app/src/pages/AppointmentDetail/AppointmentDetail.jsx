import { useEffect, useState } from "react";
import { useLocation, useParams, Link,useNavigate  } from "react-router-dom";
import "./AppointmentDetail.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { getAppointmentDetails } from "../../api/BackendApi";
import BookAppointmentModal from "../../components/BookModal/BookAppointmentModal";
import Swal from "sweetalert2";

const AppointmentDetail = () => {
  const { state } = useLocation();
  const { appointmentId: appointmentIdFromParams } = useParams();

  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const appointmentId =
    appointmentIdFromParams ||
    state?.appointmentId;

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      console.log("hello method called");
      try {
        setLoading(true);
        setError("");

        if (!appointmentId) {
          setError("No appointment ID provided");
          setLoading(false);
          return;
        }
        const response = await getAppointmentDetails(appointmentId);

        console.log("API response for appointment details:", response.data);
        if (response.data?.status === true) {
          setAppt(response.data.data);

        } else {
          setError(response.data?.message || "Failed to fetch appointment details");

        }
      }
      catch (err) {
        console.error("Error fetching appointment details", err);
        setError("An error occurred while fetching details");
      }
      finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  const handleCreateConsultation = () => {
  if (!appointmentId) {
    Swal.fire({
      icon: "warning",
      title: "Appointment not found",
      text: "Consultation can be created only for a booked appointment.",
    });
    return;
  }

  navigate(`/dashboard/doctor/create-medical-record/${appointmentId}`, {
    state: {
      patientName: `${patient?.firstName} ${patient?.lastName}`,
    },
  });
};


const role = localStorage.getItem("role");

const isPatient = role === "PATIENT";
const isDoctor = role === "DOCTOR";

  const doctor = appt?.doctor?.user;
  const patient = appt?.patient?.user;

  const fullName = `${doctor?.firstName} ${doctor?.lastName}`;
  console.log("Appointment details:", appt);


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
                    <p>{appt?.doctor?.specialization}</p>
                  </div>
                </div>

                <div className="info-grid">
                  <p><span>Email:</span> {doctor?.email}</p>
                  <p><span>Phone:</span> {doctor?.phone}</p>
                  <p><span>Experience:</span> {appt?.doctor?.experience} yrs</p>
                  <p><span>Fee:</span> Rs. {appt?.doctor?.consultation_fee}</p>
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
                  <p><span>Age:</span> {appt?.patient?.age}</p>
                  <p><span>Weight:</span> {appt?.patient?.weight} kg</p>
                  <p><span>Height:</span> {appt?.patient?.height} ft</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="right-panel">

              <div className="info-card big">
                <div className="card-header">
                  <h3>Appointment Info</h3>
                  <span className={`status ${appt?.status.toLowerCase()}`}>
                    {appt?.status}
                  </span>
                </div>

                <div className="info-grid">
                  <p>
                    <span>Date:</span>{" "}
                    {appt?.appointmentDate && appt?.appointmentTime
                      ? new Date(`${appt.appointmentDate}T${appt.appointmentTime}`).toLocaleString()
                      : "N/A"}
                  </p>

                  <p>
                    <span>Reason:</span> {appt?.reasonForVisit || "N/A"}
                  </p>
                </div>

                <div className="action-buttons">

                  {isPatient && (
                    <>
                      <button
                        className="primary-btn"
                        onClick={() => setShowBookingModal(true)}
                      >
                        Book Again
                      </button>

                      <BookAppointmentModal
                        isOpen={showBookingModal}
                        onClose={() => setShowBookingModal(false)}
                        doctorId={appt?.doctor?.doctorId}
                        doctorName={`Dr. ${fullName}`}
                      />

                      <Link
                        to="/dashboard/user/medical-records"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <button className="secondary-btn">
                          Medical Record
                        </button>
                      </Link>

                      <Link
                        to="/dashboard/user/medicine-reports"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <button className="secondary-btn">
                          Medication
                        </button>
                      </Link>
                    </>
                  )}

                  {isDoctor && (
                    <button
                      className={
                        appt?.status === "COMPLETED"
                          ? "view-consultation-btn"
                          : "create-consultation-btn"
                      }
                      onClick={handleCreateConsultation}
                      disabled={appt?.status !== "BOOKED" && appt?.status !== "COMPLETED"}
                    >
                      {appt?.status === "COMPLETED"
                        ? "View Consultation"
                        : "Create Consultation"}
                    </button>
                  )}

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