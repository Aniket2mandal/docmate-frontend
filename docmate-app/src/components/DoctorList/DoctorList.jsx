
import React, { useRef, useState, useEffect } from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import "./DoctorList.css";
import { getAllDoctors } from "../../api/BackendApi";

const DoctorList = () => {

    const sliderRef = useRef(null);
    const [doctors, setDoctors] = useState([]);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    };
    // Fetch doctors from backend
    useEffect(() => {

        const fetchDoctors = async () => {
            try {

                const response = await getAllDoctors(0, 9);

                // backend response: { status:true, message:"", data:[...] }

                setDoctors(response.data.data || []);

            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();

    }, []);

    return (
        <div className="doctor-list-container">

            <div className="slider-wrapper">
                <button className="slider-btn left" onClick={scrollLeft} >
                    <i className="fas fa-chevron-left"></i>
                </button>

                <div className="doctor-list" ref={sliderRef}>

                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.user.id} doctor={doctor} />
                    ))}
                    {/* <DoctorCard />
                    <DoctorCard />
                     <DoctorCard />
                      <DoctorCard />
                       <DoctorCard />
                        <DoctorCard />
                         <DoctorCard /> */}

                </div>
                <button className="slider-btn right" onClick={scrollRight} >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default DoctorList;