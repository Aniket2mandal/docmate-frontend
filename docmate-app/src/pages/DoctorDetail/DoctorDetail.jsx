import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { getDoctorDetails } from "../../api/BackendApi";
import "./DoctorDetail.css";
import BookAppointmentModal from "../../components/BookModal/BookAppointmentModal";
import RateDoctorModal from "../../components/RateDoctorModal/RateDoctorModal";

const DoctorDetail = ({ darkMode, toggleDarkMode }) => {
    const { doctorId: doctorIdFromParams } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const doctorId = doctorIdFromParams || state?.doctorId;

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showRatingModal, setShowRatingModal] = useState(false);

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token"); // adjust key name if yours differs

    const isAuthenticated = Boolean(token && role);

    const isPatient = role === "PATIENT";
    const isDoctor = role === "DOCTOR";
    const isAdmin = role === "ADMIN";

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

    const renderStars = (rating = 0) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            "★".repeat(fullStars) +
            (halfStar ? "⯨" : "") +
            "☆".repeat(emptyStars)
        );
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

    const availableSchedules =
        doctor?.schedules?.filter(
            (schedule) => schedule.available === "AVAILABLE"
        ) || [];

    if (loading) {
        return (
            <div className="doctor-detail-page">
                {isAuthenticated && <SideBar />}
                <div className="doctor-detail-main">
                    {isAuthenticated && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
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
                {isAuthenticated && <SideBar />}
                <div className="doctor-detail-main">
                    {isAuthenticated && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
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
            {isAuthenticated && <SideBar />}

            <div className="doctor-detail-main">
                {isAuthenticated && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}

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

                            {isAuthenticated && (
                                <div className="doctor-btn-grp">
                                    {isPatient && (
                                        <button
                                            className="book-btn"
                                            onClick={() => setShowBookingModal(true)}
                                        >
                                            Book Appointment
                                        </button>
                                    )}

                                    {isPatient && (
                                        <button className="rate-btn" onClick={() => setShowRatingModal(true)}>
                                            Rate Doctor
                                        </button>
                                    )}
                                </div>
                            )}

                            {isAuthenticated && (
                                <BookAppointmentModal
                                    isOpen={showBookingModal}
                                    onClose={() => setShowBookingModal(false)}
                                    doctorId={doctor?.doctorId}
                                    doctorName={`Dr. ${fullName}`}
                                />
                            )}

                            {isAuthenticated && (
                                <RateDoctorModal
                                    isOpen={showRatingModal}
                                    onClose={() => {
                                        setShowRatingModal(false);
                                        window.location.reload();
                                    }
                                    }
                                    doctorId={doctor?.doctorId}
                                    onSuccess={() => {
                                        setShowRatingModal(false);
                                        // window.location.reload();
                                    }}
                                />
                            )}

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
                                <span className="rating-number">
                                    {doctor?.rating?.toFixed(1) || "0.0"}
                                </span>

                                <span className="rating-stars">
                                    {renderStars(doctor?.rating)}
                                </span>
                                <p>{doctor?.ratingCount || 0} patient rated</p>
                            </div>
                        </div>
                    </div>

                    {isAuthenticated && (
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

                            {isAdmin && (
                                <div className="doctor-info-card">
                                    <h3>Doctor Verification Documents</h3>

                                    <div className="doctor-document-grid">
                                        <div className="document-item">
                                            <p>Citizenship Front</p>
                                            {doctor?.citizenshipFrontUrl ? (
                                                <a
                                                    href={doctor.citizenshipFrontUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={doctor.citizenshipFrontUrl}
                                                        alt="Citizenship Front"
                                                        className="doctor-document-image"
                                                    />
                                                </a>
                                            ) : (
                                                <p>No document uploaded</p>
                                            )}
                                        </div>

                                        <div className="document-item">
                                            <p>Citizenship Back</p>
                                            {doctor?.citizenshipBackUrl ? (
                                                <a
                                                    href={doctor.citizenshipBackUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={doctor.citizenshipBackUrl}
                                                        alt="Citizenship Back"
                                                        className="doctor-document-image"
                                                    />
                                                </a>
                                            ) : (
                                                <p>No document uploaded</p>
                                            )}
                                        </div>

                                        <div className="document-item">
                                            <p>Medical License</p>
                                            {doctor?.doctorLicenseUrl ? (
                                                <a
                                                    href={doctor.doctorLicenseUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={doctor.doctorLicenseUrl}
                                                        alt="Medical License"
                                                        className="doctor-document-image"
                                                    />
                                                </a>
                                            ) : (
                                                <p>No document uploaded</p>
                                            )}
                                        </div>

                                        <div className="document-item">
                                            <p>Education Certificate</p>
                                            {doctor?.educationCertificateUrl ? (
                                                <a
                                                    href={doctor.educationCertificateUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={doctor.educationCertificateUrl}
                                                        alt="Education Certificate"
                                                        className="doctor-document-image"
                                                    />
                                                </a>
                                            ) : (
                                                <p>No document uploaded</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isPatient && (
                                <div className="doctor-info-card">
                                    <h3>Available Schedule</h3>

                                    <div className="schedule-days">
                                        {availableSchedules.length > 0 ? (
                                            availableSchedules.map((schedule) => (
                                                <div key={schedule.id} className="schedule-chip">
                                                    <strong>{schedule.availableDay}</strong>

                                                    <p>
                                                        {schedule.startDate}
                                                        {schedule.startDate !== schedule.endDate &&
                                                            ` - ${schedule.endDate}`}
                                                    </p>

                                                    <p>
                                                        {schedule.startTime?.slice(0, 5)} -{" "}
                                                        {schedule.endTime?.slice(0, 5)}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No schedule available</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;