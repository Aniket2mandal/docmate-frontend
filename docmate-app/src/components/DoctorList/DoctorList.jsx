
import React, { useRef } from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import "./DoctorList.css";

const DoctorList = () => {

    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    };

    return (
        <div className="doctor-list-container">

            <div className="slider-wrapper">
                <button className="slider-btn left" onClick={scrollLeft} >
                    <i className="fas fa-chevron-left"></i>
                </button>

                <div className="doctor-list" ref={sliderRef}>

                    <DoctorCard />
                    <DoctorCard />
                    <DoctorCard />
                     <DoctorCard />
                      <DoctorCard />
                       <DoctorCard />
                        <DoctorCard />
                         <DoctorCard />

                </div>
                <button className="slider-btn right" onClick={scrollRight} >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default DoctorList;