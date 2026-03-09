import React from "react";
import "./DoctorCard.css";
import doctorImg from "../../assets/doctor.png";

const DoctorCard = ({ doctor }) => {
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
                <button className="doctorexp-btn">Explore now <i className="fas fa-arrow-right"></i></button>
                <button className="doctorexp-btn2">Book now</button>
            </div>

        </div>
    );
};

export default DoctorCard;