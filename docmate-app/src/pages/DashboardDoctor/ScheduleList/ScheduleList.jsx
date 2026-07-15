import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getAllSchedule, getAvailableSlots, deleteScheduleApi } from "../../../api/BackendApi";
import {
    FaTrash, FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";
import "./ScheduleList.css";
import Swal from "sweetalert2";

const ScheduleList = ({ darkMode, toggleDarkMode }) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listTitle, setListTitle] = useState("All Schedule");
    const navigate = useNavigate();
    const [pageNo, setPageNo] = useState(0);
    const [paginationInfo, setPaginationInfo] = useState(null);
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);

    const doctorId = localStorage.getItem("doctorId");
    const PAGE_SIZE = 5;

    useEffect(() => {
        fetchAllSchedule(0);
    }, []);

    const fetchAllSchedule = async (page = 0) => {
        try {
            setLoading(true);

            if (!doctorId) {
                Swal.fire({
                    icon: "error",
                    title: "Doctor id not found",
                    text: "Please login again.",
                });
                return;
            }

            const response = await getAllSchedule(doctorId, page, PAGE_SIZE);

            if (response.data?.status === true) {
                setSchedules(response.data.data.data);
                setPaginationInfo(response.data.data.paginationInfo);
                setPageNo(page);
                setShowAvailableOnly(false);
                setListTitle("All Schedule");
            } else {
                setSchedules([]);
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while fetching schedules.",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableSlots = async (page = 0) => {
        try {
            setLoading(true);

            if (!doctorId) {
                Swal.fire({
                    icon: "error",
                    title: "Doctor id not found",
                    text: "Please login again.",
                });
                return;
            }

            const response = await getAvailableSlots(doctorId, page, PAGE_SIZE);
            console.log("API page =", page);
            console.log("API typeof page =", typeof page);
            if (response.data?.status === true) {
                setSchedules(response.data.data.data);
                setPaginationInfo(response.data.data.paginationInfo);
                setPageNo(page);
                setShowAvailableOnly(true);
                setListTitle("Available Slots");
            } else {
                setSchedules([]);
            }
        } catch (error) {
            console.error("Error fetching available slots:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while fetching available slots.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateConsultation = (schedule) => {
        if (!schedule.appointmentId) {
            Swal.fire({
                icon: "warning",
                title: "Appointment not found",
                text: "Consultation can be created only for a booked appointment.",
            });
            return;
        }

        navigate(`/dashboard/doctor/create-medical-record/${schedule.appointmentId}`, {
            state: { patientName: schedule.patientName },
        });
    };

    const handleDeleteSchedule = async (schedule) => {
        const scheduleId = schedule.id;

        if (!scheduleId) {
            Swal.fire({
                icon: "error",
                title: "Schedule not found",
                text: "Schedule id is missing.",
            });
            return;
        }

        const result = await Swal.fire({
            icon: "warning",
            title: "Delete Schedule?",
            text: "This schedule will be removed permanently.",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await deleteScheduleApi(scheduleId);

            if (response.data?.status === true) {
                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: response.data?.message || "Schedule deleted successfully.",
                    confirmButtonColor: "#2f80ed",
                });

                if (listTitle === "Available Slots") {
                    fetchAvailableSlots(pageNo);
                } else {
                    fetchAllSchedule(pageNo);
                }
            }
        } catch (error) {
            console.error("Delete schedule error:", error);

            Swal.fire({
                icon: "error",
                title: "Delete failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while deleting schedule.",
            });
        }
    };

    const handlePageChange = (page) => {
        if (showAvailableOnly) {
            fetchAvailableSlots(page);
        } else {
            fetchAllSchedule(page);
        }
    };

    return (
        <div className="schedule-list-page">
            <SideBar />

            <div className="schedule-list-main">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <div className="schedule-list-content">
                    <div className="schedule-list-header">
                        <div>
                            <h2>Schedule List</h2>
                            <p>View all created schedules and available appointment slots.</p>
                        </div>

                        <div className="schedule-list-actions">
                            <button
                                className="all-schedule-btn"
                                onClick={() => fetchAllSchedule(0)}
                            >
                                All Schedule
                            </button>

                            <button
                                className="available-slot-btn"
                                onClick={() => fetchAvailableSlots(0)}
                            >
                                Available Slots
                            </button>
                        </div>
                    </div>

                    <div className="schedule-list-card">
                        <div className="schedule-list-card-header">
                            <h3>{listTitle}</h3>
                        </div>

                        {loading ? (
                            <p className="schedule-loading">Loading schedules...</p>
                        ) : schedules.length > 0 ? (
                            <div className="schedule-table-wrapper">
                                <table className="schedule-table">
                                    <thead>
                                        <tr>
                                            <th>S.N.</th>
                                            <th>Patient Name</th>
                                            <th>Day</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {schedules.map((schedule, index) => (
                                            <tr key={schedule.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{schedule.patientName || "-"}</td>
                                                <td>{schedule.availableDay || "-"}</td>
                                                <td>{schedule.startDate || "-"}</td>
                                                <td>{schedule.endDate || "-"}</td>
                                                <td>{schedule.startTime?.slice(0, 5) || "-"}</td>
                                                <td>{schedule.endTime?.slice(0, 5) || "-"}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            schedule.available === "AVAILABLE"
                                                                ? "status-badge available"
                                                                : schedule.available === "BOOKED"
                                                                    ? "status-badge booked"
                                                                    : schedule.available === "COMPLETED"
                                                                        ? "status-badge completed"
                                                                        : "status-badge unavailable"
                                                        }
                                                    >
                                                        {schedule.available}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="schedule-action-buttons">
                                                        <button
                                                            className={
                                                                schedule.available === "COMPLETED"
                                                                    ? "view-consultation-btn"
                                                                    : "create-consultation-btn"
                                                            }
                                                            onClick={() => handleCreateConsultation(schedule)}
                                                            disabled={schedule.available === "AVAILABLE" || schedule.available === "UNAVAILABLE"}
                                                        >
                                                            {schedule.available === "COMPLETED"
                                                                ? "View Consultation"
                                                                : "Create Consultation"}
                                                        </button>

                                                        <button
                                                            className="delete-schedule-btn"
                                                            onClick={() => handleDeleteSchedule(schedule)}
                                                            disabled={
                                                                schedule.available === "BOOKED" ||
                                                                schedule.available === "COMPLETED"
                                                            }
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="schedule-empty">No schedule found.</p>
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

export default ScheduleList;