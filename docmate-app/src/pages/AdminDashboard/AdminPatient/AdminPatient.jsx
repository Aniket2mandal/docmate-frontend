import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getAllPatientApi, changeUserStatusApi, deletePatientApi } from "../../../api/BackendApi";
import {
  FaEdit, FaTrash, FaPlus, FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminPatient.css";

const AdminPatient = ({ darkMode, toggleDarkMode }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 5;

  const [pageNo, setPageNo] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients(0);
  }, []);

  const fetchPatients = async (page = 0) => {
    try {
      setLoading(true);

      const response = await getAllPatientApi(page, PAGE_SIZE);

      if (response.data?.status === true) {
        setPatients(response.data.data.data);
        setPaginationInfo(response.data.data.paginationInfo);
        setPageNo(page);
      } else {
        setPatients([]);
        setPaginationInfo(null);
      }
    } catch (error) {
      console.error("Patient fetch error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while fetching patients.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (patient) => {
    const firstName = patient?.user?.firstName || "";
    const lastName = patient?.user?.lastName || "";
    return `${firstName} ${lastName}`.trim() || "-";
  };

  const getStatus = (patient) => {
    return patient?.user?.status || "ACTIVE";
  };

  const handleCreatePatient = () => {
    navigate("/dashboard/admin/patients/create");
  };

  // const handleEditPatient = (patient) => {
  //   const userId = patient?.user?.id;

  //   if (!userId) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Patient not found",
  //       text: "Patient user id is missing.",
  //     });
  //     return;
  //   }

  //   navigate(`/dashboard/admin/patients/edit/${userId}`);
  // };

  const handleDeletePatient = async (patient) => {
    const patientId = patient?.patientId;

    if (!patientId) {
      Swal.fire({
        icon: "error",
        title: "Patient not found",
        text: "Patient user id is missing.",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Patient?",
      text: "This patient will be deleted permanently.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      // connect delete API later
      await deletePatientApi(patientId);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Delete API will be connected later.",
        confirmButtonColor: "#2f80ed",
      });

      fetchPatients();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while deleting patient.",
      });
    }
  };

  const handlePatientStatusToggle = async (patient) => {
    const userId = patient?.user?.id;
    const currentStatus = getStatus(patient);

    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Patient not found",
        text: "Patient user id is missing.",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: `Change status to ${newStatus}?`,
      text: "Patient account status will be updated.",
      showCancelButton: true,
      confirmButtonText: "Yes, change",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2f80ed",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {

      await changeUserStatusApi(userId, newStatus);

      setPatients((prevPatients) =>
        prevPatients.map((p) =>
          p?.user?.id === userId
            ? {
              ...p,
              user: {
                ...p.user,
                status: newStatus,
              },
            }
            : p
        )
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: `Patient status changed to ${newStatus}.`,
        confirmButtonColor: "#2f80ed",
      });
    } catch (error) {

      console.log("Full Error:", error);
      console.log("Response Data:", error.response?.data);
      console.log("Status Code:", error.response?.status);

      Swal.fire({
        icon: "error",
        title: "Status update failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while updating status.",
      });
    }
  };

  const handlePageChange = (page) => {
    fetchPatients(page);
  };

  return (
    <div className="admin-patient-page">
      <SideBar />

      <div className="admin-patient-main">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="admin-patient-content">
          <div className="admin-patient-header">
            <div>
              <h2>Patient List</h2>
              <p>View, create, edit and manage patient accounts.</p>
            </div>

            <div className="admin-patient-actions">
              {/* <button className="create-patient-btn" onClick={handleCreatePatient}>
                <FaPlus /> Create Patient
              </button> */}
            </div>
          </div>

          <div className="admin-patient-card">
            <div className="admin-patient-card-header">
              <h3>All Patients</h3>
            </div>

            {loading ? (
              <p className="patient-loading">Loading patients...</p>
            ) : patients.length > 0 ? (
              <div className="patient-table-wrapper">
                <table className="patient-table">
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Weight</th>
                      <th>Height</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patients.map((patient, index) => {
                      const userId = patient?.user?.id;
                      const status = getStatus(patient);

                      return (
                        <tr key={userId || index}>
                          <td>{index + 1}</td>

                          <td>
                            {patient?.user?.imageUrl ? (
                              <img
                                src={patient.user.imageUrl}
                                alt="patient"
                                className="patient-table-img"
                              />
                            ) : (
                              <div className="patient-table-placeholder">
                                {patient?.user?.firstName?.charAt(0) || "P"}
                              </div>
                            )}
                          </td>

                          <td>{getFullName(patient)}</td>
                          <td>{patient?.user?.email || "-"}</td>
                          <td>{patient?.user?.phone || "-"}</td>
                          <td>{patient?.user?.gender || "-"}</td>
                          <td>{patient?.age || "-"}</td>
                          <td>{patient?.weight ? `${patient.weight} kg` : "-"}</td>
                          <td>{patient?.height ? `${patient.height} ft` : "-"}</td>
                          <td>{patient?.user?.address || "-"}</td>

                          <td>
                            <button
                              className={
                                status === "ACTIVE"
                                  ? "patient-status-toggle active"
                                  : "patient-status-toggle inactive"
                              }
                              onClick={() => handlePatientStatusToggle(patient)}
                            >
                              {status === "ACTIVE" ? "Active" : "Inactive"}
                            </button>
                          </td>

                          <td>
                            <div className="patient-action-buttons">
                              {/* <button
                                className="edit-patient-btn"
                                onClick={() => handleEditPatient(patient)}
                              >
                                <FaEdit />
                              </button> */}

                              <button
                                className="delete-patient-btn"
                                onClick={() => handleDeletePatient(patient)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="patient-empty">No patient found.</p>
            )}

            {paginationInfo && (
              <div className="doctor-pagination">

                <button
                  disabled={pageNo === 0}
                  onClick={() => handlePageChange(pageNo - 1)}
                >
                  <FaChevronLeft />
                </button>

                {Array.from(
                  { length: paginationInfo.totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      className={pageNo === index ? "active-page" : ""}
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={pageNo === paginationInfo.totalPages - 1}
                  onClick={() => handlePageChange(pageNo + 1)}
                >
                  <FaChevronRight />
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPatient;