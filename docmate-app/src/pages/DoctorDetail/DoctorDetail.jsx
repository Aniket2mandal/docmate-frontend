import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { getDoctorDetails } from "../../api/BackendApi";
import "./DoctorDetail.css";
import BookAppointmentModal from "../../components/BookModal/BookAppointmentModal";

const DoctorDetail = ({ darkMode, toggleDarkMode }) => {
    const { doctorId: doctorIdFromParams } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const doctorId = doctorIdFromParams || state?.doctorId;

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBookingModal, setShowBookingModal] = useState(false);

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return "/default-user.png";
        }

        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }

        const baseUrl = import.meta.env.VITE_BASE_URL?.replace(/\/$/, "");
        return `${baseUrl}/${imageUrl}`;
    };

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                setLoading(true);
                setError("");

                if (!doctorId) {
                    setError("Doctor id not found");
                    return;
                }

                const response = await getDoctorDetails(doctorId);

                if (response.data?.status === true) {
                    setDoctor(response.data.data);
                } else {
                    setError(response.data?.message || "Failed to fetch doctor details");
                }
            } catch (err) {
                console.error("Error fetching doctor details", err);
                setError("Something went wrong while fetching doctor details");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [doctorId]);

    if (loading) {
        return (
            <div className="doctor-detail-page">
                <SideBar />
                <div className="doctor-detail-main">
                    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    <div className="doctor-detail-content">
                        <p>Loading doctor details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="doctor-detail-page">
                <SideBar />
                <div className="doctor-detail-main">
                    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                    <div className="doctor-detail-content">
                        <p className="error-text">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const user = doctor?.user;
    const fullName = `${user?.firstName} ${user?.lastName}`;

    return (
        <div className="doctor-detail-page">
            <SideBar />

            <div className="doctor-detail-main">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <div className="doctor-detail-content">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        ← Back
                    </button>

                    <div className="doctor-profile-card">
                        <div className="doctor-profile-left">
                            <img
                                src={getImageUrl(user?.imageUrl)}
                                alt="doctor"
                                className="doctor-profile-img"
                            />
                        </div>

                        <div className="doctor-profile-right">
                            <span className="doctor-specialization">
                                {doctor?.specialization || "Specialist"}
                            </span>

                            <h1>
                                Dr. {user?.firstName || "N/A"} {user?.lastName || ""}
                            </h1>

                            <p className="doctor-qualification">
                                {doctor?.qualification || "Qualification not provided"}
                            </p>

                            <div className="doctor-stats">
                                <div>
                                    <h3>{doctor?.experience || 0} yrs</h3>
                                    <p>Experience</p>
                                </div>

                                <div>
                                    <h3>Rs. {doctor?.consultation_fee || "N/A"}</h3>
                                    <p>Consultation Fee</p>
                                </div>

                                <div>
                                    <h3>{doctor?.rating || 0}</h3>
                                    <p>Rating</p>
                                </div>
                            </div>

                            {/* <button className="book-btn">
                                Book Appointment
                            </button> */}

                            <button className="book-btn" onClick={() => setShowBookingModal(true)}>
                                Book Appointment
                            </button>
                            <BookAppointmentModal
                                isOpen={showBookingModal}
                                onClose={() => setShowBookingModal(false)}
                                doctorId={doctor?.doctorId}
                                doctorName={`Dr. ${fullName}`}
                            />


                        </div>
                    </div>

                    <div className="doctor-about-rating-card">
                        <div className="doctor-about-section">
                            <h3>About Doctor</h3>
                            {/* <p>
                                {doctor?.description ||
                                    `Dr. ${user?.firstName || ""} ${user?.lastName || ""} is a ${doctor?.specialization || "specialist"} with ${doctor?.experience || 0} years of experience.`}
                            </p> */}
                        </div>

                        <div className="doctor-rating-section">
                            <h3>Rating</h3>

                            <div className="rating-box">
                                <span className="rating-number">{doctor?.rating || 0}</span>
                                <span className="rating-stars">★★★★★</span>
                                <p>{doctor?.ratingCount || 0} reviews</p>
                            </div>
                        </div>
                    </div>

                    <div className="doctor-info-grid">
                        <div className="doctor-info-card">
                            <h3>Contact Information</h3>

                            <div className="info-row">
                                <span>Email</span>
                                <p>{user?.email || "N/A"}</p>
                            </div>

                            <div className="info-row">
                                <span>Phone</span>
                                <p>{user?.phone || "N/A"}</p>
                            </div>

                            <div className="info-row">
                                <span>Address</span>
                                <p>{user?.address || "N/A"}</p>
                            </div>

                            <div className="info-row">
                                <span>Gender</span>
                                <p>{user?.gender || "N/A"}</p>
                            </div>
                        </div>

                        <div className="doctor-info-card">
                            <h3>Available Schedule</h3>

                            <div className="schedule-days">
                                {doctor?.schedules?.length > 0 ? (
                                    doctor.schedules.map((schedule) => (
                                        <div key={schedule.id} className="schedule-chip">
                                            <strong>{schedule.availableDay}</strong>

                                            <p>
                                                {schedule.startDate}
                                                {schedule.startDate !== schedule.endDate && ` - ${schedule.endDate}`}
                                            </p>

                                            <p>
                                                {schedule.startTime?.slice(0, 5)} - {schedule.endTime?.slice(0, 5)}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No schedule available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;