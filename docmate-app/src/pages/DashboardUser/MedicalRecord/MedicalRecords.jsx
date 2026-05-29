import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MedicalRecords.css";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import Swal from "sweetalert2";
import doctorImg from "../../../assets/doctor.png";
import { getAllMedicalRecordsApi } from "../../../api/BackendApi";

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);

      const response = await getAllMedicalRecordsApi();

      if (response.data?.status === true) {
        setMedicalRecords(response.data.data || []);
      } else {
        setMedicalRecords([]);
      }
    } catch (error) {
      console.error("Medical records fetch error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while fetching medical records.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    return time.slice(0, 5);
  };

  const getDoctorName = (doctor) => {
    if (!doctor?.user) {
      return "Doctor";
    }

    return `${doctor.user.firstName || ""} ${doctor.user.lastName || ""}`;
  };

  const getDoctorImage = (doctor) => {
    return doctor?.user?.imageUrl || doctorImg;
  };

  const handleViewDetails = (medicalRecordId) => {
    // Swal.fire({
    //   icon: "info",
    //   title: "View Details",
    //   text: `Detail page will be added later for record: ${medicalRecordId}`,
    //   confirmButtonColor: "#2f80ed",
    // });

    // Later:
    navigate(`/dashboard/user/medical-record-detail/${medicalRecordId}`);
  };

  return (
    <div className="dashboard-medical-page">
      <SideBar />

      <div className="dashboard-medical-main">
        <Navbar />

        <div className="dashboard-medical-content">
          <div className="medical-record-header">
            <h1>My Medical Records</h1>
            <p>View your consultation records created by doctors.</p>
          </div>

          <div className="medical-record-count-card">
            <div>
              <span>Total Medical Records</span>
              <h2>{medicalRecords.length}</h2>
            </div>
          </div>

          <div className="medical-record-list-card">
            <div className="section-top">
              <h2>Recent Records</h2>
            </div>

            {loading ? (
              <p className="medical-loading">Loading medical records...</p>
            ) : medicalRecords.length > 0 ? (
              <div className="record-list">
                {medicalRecords.map((record) => {
                  const doctor = record.doctor;

                  return (
                    <div className="record-item" key={record.medicalRecordId}>
                      <div className="record-left">
                        <img
                          src={getDoctorImage(doctor)}
                          alt="doctor"
                          className="record-doctor-img"
                        />

                        <div>
                          <h3>{getDoctorName(doctor)}</h3>
                          <p>{doctor?.specialization || "Specialist"}</p>

                          <div className="record-date">
                            {formatDate(record.appointmentDate)} •{" "}
                            {formatTime(record.appointmentTime)}
                          </div>
                        </div>
                      </div>

                      <div className="record-middle">
                        <span>Diagnosis</span>
                        <p>{record.diagnosis || "No diagnosis added."}</p>
                      </div>

                      <div className="record-right">
                        <div className="record-small-info">
                          <span>{record.medications?.length || 0}</span>
                          <p>Medicines</p>
                        </div>

                        <div className="record-small-info">
                          <span>{record.testReports?.length || 0}</span>
                          <p>Reports</p>
                        </div>

                        <button
                          className="record-view-btn"
                          onClick={() =>
                            handleViewDetails(record.medicalRecordId)
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="medical-empty">
                <h3>No Medical Records Found</h3>
                <p>Your medical records will appear here after consultation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;