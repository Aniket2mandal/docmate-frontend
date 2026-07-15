import React from "react";
import { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./DoctorCard.css";
import doctorImg from "../../assets/doctor.png";
import BookAppointmentModal from "../BookModal/BookAppointmentModal";

const DoctorCard = ({ doctor }) => {
    console.log("Doctor in DoctorCard:", doctor);
    const navigate = useNavigate();
    const [showBookingModal, setShowBookingModal] = useState(false);

    const fullName = `${doctor.user.firstName} ${doctor.user.lastName}`;

    const doctorImage = doctor.user?.imageUrl
        ? doctor.user.imageUrl
        : doctorImg;

    const handleBookNow = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setShowBookingModal(true);
    };

    const handleExploreNow = () => {
        const token = localStorage.getItem("token");

        // if (!token) {
        //     navigate("/login");
        //     return;
        // }

        navigate(`/doctor-detail/${doctor.doctorId}`);
    };

    return (

        <div className="doctor-card">

            <div className="image-container">
                <img className="doctor-img" src={doctorImage} alt="doctor" />
            </div>
            <p>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
                {fullName} - {doctor.specialization}

            </p>

            <div className="doctorbtn-container">

                <button className="doctorexp-btn" onClick={handleExploreNow}>
                    Explore now <FaArrowRight />
                </button>

                <button className="doctorexp-btn2" onClick={() => handleBookNow()}>
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