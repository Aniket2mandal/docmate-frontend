import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DoctorList from "../../components/DoctorList/DoctorList";
import { getAllDoctors } from "../../api/BackendApi";
import "./Doctors.css";

const Doctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await getAllDoctors(0, 3);

            setDoctors(response.data.data.data);
            setPageInfo(response.data.data.paginationInfo);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="doctors">

            <div className="doctors-header">
                <h1>Locate the Best Doctors<br />Around You</h1>
                <p>
                    Easily search, compare, and book appointments with trusted doctors.
                </p>
            </div>

            <SearchBar
                setDoctors={setDoctors}
                setPageInfo={setPageInfo}
            />

            <DoctorList
                doctors={doctors}
            />

        </section>
    );
};

export default Doctors;