import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DoctorList from "../../components/DoctorList/DoctorList";
import "./Doctors.css";

const Doctors = () => {
    return (
        <section className="doctors">

            <div className="doctors-header">
                <h1>Locate the Best Doctors<br></br> Around You</h1>
                <p>
                    Easily search, compare, and book appointments with trusted doctors.
                </p>
            </div>

            <SearchBar />

            <DoctorList />

        </section>
    );
};

export default Doctors;