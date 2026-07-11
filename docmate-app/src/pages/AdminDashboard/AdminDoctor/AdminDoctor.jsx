import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getAllDoctorsAdmin, changeUserStatusApi, deleteDoctorApi } from "../../../api/BackendApi";
import { FaEdit, FaTrash, FaPlus, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminDoctor.css";

const AdminDoctor = ({ darkMode, toggleDarkMode }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [paginationInfo, setPaginationInfo] = useState(null);

    const PAGE_SIZE = 5;

    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors(0);
    }, []);

    const fetchDoctors = async (page = 0) => {
        try {
            setLoading(true);

            const response = await getAllDoctorsAdmin(page, PAGE_SIZE);

            if (response.data?.status) {
                setDoctors(response.data.data.data);
                setPaginationInfo(response.data.data.paginationInfo);
                setPageNo(page);
            } else {
                setDoctors([]);
            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while fetching doctors.",
            });
        } finally {
            setLoading(false);
        }
    };

    const getFullName = (doctor) => {
        const firstName = doctor?.user?.firstName || "";
        const lastName = doctor?.user?.lastName || "";
        return `${firstName} ${lastName}`.trim() || "-";
    };

    const getStatus = (doctor) => {
        return doctor?.user?.status || "ACTIVE";
    };

    const handleCreateDoctor = () => {
        navigate("/dashboard/admin/doctors/create");
    };

    const handleEditDoctor = (doctor) => {
        const doctorId = doctor?.doctorId;

        if (!doctorId) {
            Swal.fire({
                icon: "error",
                title: "Doctor not found",
                text: "Doctor id is missing.",
            });
            return;
        }

        navigate(`/dashboard/admin/doctors/edit/${doctorId}`);
    };

    const handleDeleteDoctor = async (doctor) => {
        const doctorId = doctor?.doctorId;

        if (!doctorId) {
            Swal.fire({
                icon: "error",
                title: "Doctor not found",
                text: "Doctor id is missing.",
            });
            return;
        }

        const result = await Swal.fire({
            icon: "warning",
            title: "Delete Doctor?",
            text: "This doctor will be deleted permanently.",
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
            await deleteDoctorApi(doctorId);

            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Delete API will be connected later.",
                confirmButtonColor: "#2f80ed",
            });

            fetchDoctors();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Delete failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while deleting doctor.",
            });
        }
    };

    const handleDoctorStatusToggle = async (doctor) => {
        const userId = doctor?.user?.id;
        const currentStatus = getStatus(doctor);
        const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

        if (!userId) {
            Swal.fire({
                icon: "error",
                title: "Doctor not found",
                text: "Doctor user id is missing.",
            });
            return;
        }

        const result = await Swal.fire({
            icon: "warning",
            title: `Change status to ${newStatus}?`,
            text: "Doctor account status will be updated.",
            showCancelButton: true,
            confirmButtonText: "Yes, change",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2f80ed",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            // connect status API later
            await changeUserStatusApi(userId, newStatus);

            setDoctors((prevDoctors) =>
                prevDoctors.map((d) =>
                    d?.user?.id === userId
                        ? {
                            ...d,
                            user: {
                                ...d.user,
                                status: newStatus,
                            },
                        }
                        : d
                )
            );

            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: `Doctor status changed to ${newStatus}.`,
                confirmButtonColor: "#2f80ed",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Status update failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while updating status.",
            });
        }
    };

    const handleViewDoctorDetails=(doctor)=>{
         const doctorId = doctor?.doctorId;

         navigate(`/doctor-detail/${doctorId}`);
    }

    const handlePageChange = (page) => {
        fetchDoctors(page);
    };

    return (
        <div className="admin-doctor-page">
            <SideBar />

            <div className="admin-doctor-main">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <div className="admin-doctor-content">
                    <div className="admin-doctor-header">
                        <div>
                            <h2>Doctor List</h2>
                            <p>View, create, edit and manage doctor accounts.</p>
                        </div>

                        <div className="admin-doctor-actions">
                            <button className="create-doctor-btn" onClick={handleCreateDoctor}>
                                <FaPlus /> Create Doctor
                            </button>
                        </div>
                    </div>

                    <div className="admin-doctor-card">
                        <div className="admin-doctor-card-header">
                            <h3>All Doctors</h3>
                        </div>

                        {loading ? (
                            <p className="doctor-loading">Loading doctors...</p>
                        ) : doctors.length > 0 ? (
                            <div className="doctor-table-wrapper">
                                <table className="doctor-table">
                                    <thead>
                                        <tr>
                                            <th>S.N.</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Specialization</th>
                                            <th>Phone</th>
                                            <th>Fee</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {doctors.map((doctor, index) => {
                                            const doctorId = doctor?.doctorId;
                                            const status = getStatus(doctor);

                                            return (
                                                <tr key={doctorId || index}>
                                                    <td>{pageNo * PAGE_SIZE + index + 1}</td>

                                                    <td>
                                                        {doctor?.user?.imageUrl ? (
                                                            <img
                                                                src={doctor.user.imageUrl}
                                                                alt="doctor"
                                                                className="doctor-table-img"
                                                            />
                                                        ) : (
                                                            <div className="doctor-table-placeholder">
                                                                {doctor?.user?.firstName?.charAt(0) || "D"}
                                                            </div>
                                                        )}
                                                    </td>

                                                    <td>{getFullName(doctor)}</td>
                                                    <td>{doctor?.user?.email}</td>

                                                    <td>{doctor?.specialization || "-"}</td>

                                                    <td>{doctor?.user?.phone || "-"}</td>

                                                    <td>
                                                        {doctor?.consultation_fee
                                                            ? `Rs. ${doctor.consultation_fee}`
                                                            : "-"}
                                                    </td>

                                                    <td>
                                                        <button
                                                            className={
                                                                status === "ACTIVE"
                                                                    ? "doctor-status-toggle active"
                                                                    : "doctor-status-toggle inactive"
                                                            }
                                                            onClick={() => handleDoctorStatusToggle(doctor)}
                                                        >
                                                            {status === "ACTIVE" ? "Active" : "Inactive"}
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <div className="doctor-action-buttons">
                                                            <button
                                                                className="view-doctor-btn"
                                                                onClick={() => handleViewDoctorDetails(doctor)}
                                                            >
                                                                <FaEye />
                                                            </button>

                                                            <button
                                                                className="edit-doctor-btn"
                                                                onClick={() => handleEditDoctor(doctor)}
                                                            >
                                                                <FaEdit />
                                                            </button>

                                                            <button
                                                                className="delete-doctor-btn"
                                                                onClick={() => handleDeleteDoctor(doctor)}
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
                            <p className="doctor-empty">No doctor found.</p>
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

export default AdminDoctor;