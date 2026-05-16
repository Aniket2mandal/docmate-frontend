import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./DoctorCard.css";
import doctorImg from "../../assets/doctor.png";
import BookAppointmentModal from "../BookModal/BookAppointmentModal";

const DoctorCard = ({ doctor }) => {
    console.log("Doctor in DoctorCard:", doctor);

    const [showBookingModal, setShowBookingModal] = useState(false);

    const fullName = `${doctor.user.firstName} ${doctor.user.lastName}`;
    return (

        <div className="doctor-card">

            <div className="image-container">
                <img className="doctor-img" src={doctor.user?.imageUrl ? `http://localhost:8080/${doctor.user.imageUrl}` : doctorImg} alt="doctor" />
            </div>
            <p>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
                {fullName} - {doctor.specialization}

            </p>

            <div className="doctorbtn-container">

                <Link
                    to={`/doctor-detail/${doctor.doctorId}`}
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <button className="doctorexp-btn">Explore now <FaArrowRight /></button>
                </Link>
                <button className="doctorexp-btn2" onClick={() => setShowBookingModal(true)}>
                    Book now
                </button>

            
            </div>
            <BookAppointmentModal
                    isOpen={showBookingModal}
                    onClose={() => setShowBookingModal(false)}
                    doctorId={doctor?.doctorId}
                    doctorName={`Dr. ${fullName}`}
                />

        </div>
        
    );
};

export default DoctorCard;