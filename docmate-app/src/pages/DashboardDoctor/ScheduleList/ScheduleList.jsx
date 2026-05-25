import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getAllSchedule, getAvailableSlots } from "../../../api/BackendApi";
import "./ScheduleList.css";
import Swal from "sweetalert2";

const ScheduleList = ({ darkMode, toggleDarkMode }) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listTitle, setListTitle] = useState("All Schedule");

    const doctorId = localStorage.getItem("doctorId");

    useEffect(() => {
        fetchAllSchedule();
    }, []);

    const fetchAllSchedule = async () => {
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

            const response = await getAllSchedule(doctorId);

            if (response.data?.status === true) {
                setSchedules(response.data.data || []);
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

    const fetchAvailableSlots = async () => {
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

            const response = await getAvailableSlots(doctorId);

            if (response.data?.status === true) {
                setSchedules(response.data.data || []);
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

        // navigate(`/dashboard/doctor/create-consultation/${schedule.appointmentId}`);
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
                            <button className="all-schedule-btn" onClick={fetchAllSchedule}>
                                All Schedule
                            </button>

                            <button className="available-slot-btn" onClick={fetchAvailableSlots}>
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
                                                <td>{schedule.availableDay || "-"}</td>
                                                <td>{schedule.startDate || "-"}</td>
                                                <td>{schedule.endDate || "-"}</td>
                                                <td>{schedule.startTime?.slice(0, 5) || "-"}</td>
                                                <td>{schedule.endTime?.slice(0, 5) || "-"}</td>
                                                <td>
                                                    <span
                                                        className={
                                                            schedule.available === false
                                                                ? "status-badge booked"
                                                                : "status-badge available"
                                                        }
                                                    >
                                                        {schedule.available === false ? "Booked" : "Available"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        className="create-consultation-btn"
                                                        onClick={() => handleCreateConsultation(schedule)}
                                                        disabled={schedule.available !== false}
                                                    >
                                                        Create Consultation
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="schedule-empty">No schedule found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleList;