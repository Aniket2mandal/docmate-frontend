import React, { useEffect, useState } from "react";
import "./MedicalRecordDetail.css";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMedicalRecordByIdApi,
  getAppointmentDetails,
} from "../../../api/BackendApi";
import Swal from "sweetalert2";
import doctorImg from "../../../assets/doctor.png";

const MedicalRecordDetail = () => {
  const { medicalRecordId } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedicalRecordDetail();
  }, [medicalRecordId]);

  const fetchMedicalRecordDetail = async () => {
    try {
      setLoading(true);

      const response = await getMedicalRecordByIdApi(medicalRecordId);

      if (response.data?.status === true) {
        const recordData = response.data.data;
        setRecord(recordData);

        if (recordData?.appointmentId) {
          const appointmentResponse = await getAppointmentDetails(
            recordData.appointmentId
          );

          if (appointmentResponse.data?.status === true) {
            setAppointment(appointmentResponse.data.data);
          }
        }
      }
    } catch (error) {
      console.error("Medical record detail error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while fetching medical record detail.",
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
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    return time.slice(0, 5);
  };

  const getDoctorName = () => {
    const user = record?.doctor?.user;

    if (!user) {
      return "Doctor";
    }

    return `${user.firstName || ""} ${user.lastName || ""}`;
  };

  const getDoctorImage = () => {
    return record?.doctor?.user?.imageUrl || doctorImg;
  };

  const openReport = (reportUrl) => {
    window.open(reportUrl, "_blank");
  };

  const appointmentDate =
    appointment?.appointmentDate || record?.appointmentDate;

  const appointmentTime =
    appointment?.appointmentTime || record?.appointmentTime;

  const appointmentStatus =
    appointment?.status || record?.appointmentStatus;

  const reasonForVisit =
    appointment?.reasonForVisit || "-";

  if (loading) {
    return (
      <div className="medical-detail-page">
        <SideBar />

        <div className="medical-detail-main">
          <Navbar />

          <div className="medical-detail-content">
            <p className="medical-detail-loading">Loading medical record...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="medical-detail-page">
        <SideBar />

        <div className="medical-detail-main">
          <Navbar />

          <div className="medical-detail-content">
            <p className="medical-detail-loading">No medical record found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="medical-detail-page">
      <SideBar />

      <div className="medical-detail-main">
        <Navbar />

        <div className="medical-detail-content">
          <div className="medical-detail-header">
            <div>
              <h1>Medical Record Detail</h1>
              <p>View consultation summary, prescription and test reports.</p>
            </div>

            <button
              className="back-btn"
              onClick={() => navigate("/dashboard/user/medical-records")}
            >
              Back
            </button>
          </div>

          <div className="medical-detail-card">
            <div className="doctor-summary-card">
              <img src={getDoctorImage()} alt="doctor" />

              <div>
                <h2>{getDoctorName()}</h2>
                <p>{record.doctor?.specialization || "Specialist"}</p>
                <span>{record.doctor?.qualification || "-"}</span>
              </div>
            </div>

            <div className="visit-info-grid">
              <div className="visit-info-box">
                <span>Appointment Date</span>
                <strong>{formatDate(appointmentDate)}</strong>
              </div>

              <div className="visit-info-box">
                <span>Appointment Time</span>
                <strong>{formatTime(appointmentTime)}</strong>
              </div>

              <div className="visit-info-box">
                <span>Status</span>
                <strong>{appointmentStatus || "-"}</strong>
              </div>

              <div className="visit-info-box">
                <span>Reason For Visit</span>
                <strong>{reasonForVisit}</strong>
              </div>
            </div>

            <div className="detail-section">
              <h3>Diagnosis</h3>
              <p>{record.diagnosis || "No diagnosis added."}</p>
            </div>

            <div className="detail-section">
              <h3>Doctor Notes</h3>
              <p>{record.notes || "No notes added."}</p>
            </div>

            <div className="detail-section">
              <h3>Medications</h3>

              {record.medications && record.medications.length > 0 ? (
                <div className="medicine-table-wrapper">
                  <table className="medicine-table">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Time</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Instruction</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {record.medications.map((medication, index) => (
                        <tr key={medication.medicationId || index}>
                          <td>{medication.medicineName || "-"}</td>
                          <td>{medication.dosage || "-"}</td>
                          <td>{medication.frequency || "-"}</td>
                          <td>{medication.timeSchedule || "-"}</td>
                          <td>{formatDate(medication.startDate)}</td>
                          <td>{formatDate(medication.endDate)}</td>
                          <td>{medication.instruction || "-"}</td>
                          <td>
                            <span className="medicine-status">
                              {medication.status || "-"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No medications prescribed.</p>
              )}
            </div>

            <div className="detail-section">
              <h3>Test Reports</h3>

              {record.testReports && record.testReports.length > 0 ? (
                <div className="report-grid">
                  {record.testReports.map((report, index) => (
                    <div
                      className="report-card"
                      key={report.testReportId || index}
                    >
                      <div className="report-preview">
                        <img
                          src={report.reportUrl}
                          alt={`report-${index + 1}`}
                        />
                      </div>

                      <div className="report-card-bottom">
                        <span>Report {index + 1}</span>

                        <button
                          type="button"
                          onClick={() => openReport(report.reportUrl)}
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No test reports uploaded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetail;