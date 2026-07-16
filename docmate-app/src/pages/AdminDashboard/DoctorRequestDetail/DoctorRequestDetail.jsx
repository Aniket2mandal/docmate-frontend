import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import SideBar from "../../../components/SideBar/SideBar";
import {
    getDoctorRequestDetailApi,
    approveDoctorRequestApi,
    rejectDoctorRequestApi,
} from "../../../api/BackendApi";
import Swal from "sweetalert2";
import "./DoctorRequestDetail.css";

const DoctorRequestDetail = ({ darkMode, toggleDarkMode }) => {
    const { doctorRequestId } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [aprbtnloading, setAprbtnloading] = useState(false);
    const [rejbtnloading, setRejbtnloading] = useState(false);


    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor = async () => {
        try {
            const response = await getDoctorRequestDetailApi(doctorRequestId);

            if (response.data.status) {
                setDoctor(response.data.data);
            }
        } catch (err) {
            Swal.fire("Error", "Unable to fetch request.", "error");
        } finally {
            setLoading(false);
        }
    };

    const approveDoctor = async () => {
        const result = await Swal.fire({
            title: "Approve Doctor?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
        });

        if (!result.isConfirmed) return;

        setAprbtnloading(true);

        try {
            const response = await approveDoctorRequestApi(doctorRequestId);

            console.log(response);

            if (response.data.status) {
                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });

                navigate("/dashboard/admin/doctor-requests");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Something went wrong.",
            });
        }
        finally {
            setAprbtnloading(false);
        }
    };

    const rejectDoctor = async () => {
        const { value: reason } = await Swal.fire({
            title: "Reject Doctor",
            input: "textarea",
            inputPlaceholder: "Enter rejection reason",
            showCancelButton: true,
        });

        if (!reason) return;

        setRejbtnloading(true);

        try {
            const response = await rejectDoctorRequestApi(doctorRequestId, reason);

            if (response.data.status) {
                await Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });

                navigate("/dashboard/admin/doctor-requests");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Something went wrong.",
            });
        }
        finally {
            setRejbtnloading(false);
        }
    };

    if (loading) return <p className="loading">Loading...</p>;

    return (
        <div className="admin-doctor-page">
            <SideBar />

            <div className="admin-doctor-main">
                <Navbar
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <div className="admin-doctor-content">

                    <div className="detail-header">
                        <div>
                            <h2>Doctor Request Detail</h2>
                            <p>View doctor request information and uploaded documents.</p>
                        </div>

                        <button
                            onClick={() => navigate(-1)}
                            className="back-btn"
                        >
                            Back
                        </button>
                    </div>

                    <div className="detail-card">

                        <h3>Personal Information</h3>

                        <div className="detail-grid">
                            <p><strong>First Name:</strong> {doctor.firstName}</p>
                            <p><strong>Last Name:</strong> {doctor.lastName}</p>
                            <p><strong>Email:</strong> {doctor.email}</p>
                            <p><strong>Gender:</strong> {doctor.gender}</p>
                            <p><strong>Phone:</strong> {doctor.phone}</p>
                            <p><strong>Province:</strong> {doctor.province}</p>
                            <p><strong>Address:</strong> {doctor.address}</p>
                        </div>

                        <hr />

                        <h3>Professional Information</h3>

                        <div className="detail-grid">
                            <p><strong>Specialization:</strong> {doctor.specialization}</p>
                            <p><strong>Experience:</strong> {doctor.experience} Years</p>
                            <p><strong>Qualification:</strong> {doctor.qualification}</p>
                            <p><strong>Consultation Fee:</strong> Rs. {doctor.consultationFee}</p>
                            <p><strong>Status:</strong> {doctor.requestStatus}</p>
                        </div>

                        <hr />

                        <h3>Uploaded Documents</h3>

                        <div className="document-grid">

                            {/* Citizenship Front */}
                            <div className="document-card">
                                <h4>Citizenship Front</h4>

                                {doctor.citizenshipFrontUrl?.toLowerCase().endsWith(".pdf") ? (
                                    <div
                                        className="pdf-card"
                                        onClick={() =>
                                            window.open(doctor.citizenshipFrontUrl, "_blank")
                                        }
                                    >
                                        📄
                                        <p>View PDF</p>
                                    </div>
                                ) : (
                                    <img
                                        src={doctor.citizenshipFrontUrl}
                                        alt="Citizenship Front"
                                        onClick={() =>
                                            window.open(doctor.citizenshipFrontUrl, "_blank")
                                        }
                                    />
                                )}
                            </div>

                            {/* Citizenship Back */}
                            <div className="document-card">
                                <h4>Citizenship Back</h4>

                                {doctor.citizenshipBackUrl?.toLowerCase().endsWith(".pdf") ? (
                                    <div
                                        className="pdf-card"
                                        onClick={() =>
                                            window.open(doctor.citizenshipBackUrl, "_blank")
                                        }
                                    >
                                        📄
                                        <p>View PDF</p>
                                    </div>
                                ) : (
                                    <img
                                        src={doctor.citizenshipBackUrl}
                                        alt="Citizenship Back"
                                        onClick={() =>
                                            window.open(doctor.citizenshipBackUrl, "_blank")
                                        }
                                    />
                                )}
                            </div>

                            {/* Doctor License */}
                            <div className="document-card">
                                <h4>Medical License</h4>

                                {doctor.doctorLicenseUrl?.toLowerCase().endsWith(".pdf") ? (
                                    <div
                                        className="pdf-card"
                                        onClick={() =>
                                            window.open(doctor.doctorLicenseUrl, "_blank")
                                        }
                                    >
                                        📄
                                        <p>View PDF</p>
                                    </div>
                                ) : (
                                    <img
                                        src={doctor.doctorLicenseUrl}
                                        alt="Doctor License"
                                        onClick={() =>
                                            window.open(doctor.doctorLicenseUrl, "_blank")
                                        }
                                    />
                                )}
                            </div>

                            {/* Education Certificate */}
                            <div className="document-card">
                                <h4>Education Certificate</h4>

                                {doctor.educationCertificateUrl?.toLowerCase().endsWith(".pdf") ? (
                                    <div
                                        className="pdf-card"
                                        onClick={() =>
                                            window.open(doctor.educationCertificateUrl, "_blank")
                                        }
                                    >
                                        📄
                                        <p>View PDF</p>
                                    </div>
                                ) : (
                                    <img
                                        src={doctor.educationCertificateUrl}
                                        alt="Education Certificate"
                                        onClick={() =>
                                            window.open(doctor.educationCertificateUrl, "_blank")
                                        }
                                    />
                                )}
                            </div>

                        </div>

                        <div className="button-row">
                            <button
                                className="approve-btn"
                                onClick={approveDoctor}
                                disabled={aprbtnloading}
                            >
                                {/* Approve */}
                                {aprbtnloading ? "Approving..." : "Approve"}
                            </button>

                            <button
                                className="reject-btn"
                                onClick={rejectDoctor}
                                disabled={rejbtnloading}
                            >
                                {/* Reject */}
                                {rejbtnloading ? "Rejecting..." : "Reject"}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default DoctorRequestDetail;