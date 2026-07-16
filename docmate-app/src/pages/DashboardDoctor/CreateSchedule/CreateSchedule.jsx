import React, { useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { createDoctorSchedule } from "../../../api/BackendApi";
import "./CreateSchedule.css";
import Swal from "sweetalert2";

const CreateSchedule = ({ darkMode, toggleDarkMode }) => {
    const [schedule, setSchedule] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSchedule({
            ...schedule,
            [e.target.name]: e.target.value,
        });

        setMessage("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");
            setError("");

            const response = await createDoctorSchedule(schedule);

            //   setMessage(response?.data?.message || "Schedule created successfully.");
            Swal.fire({
                icon: "success",
                title: "Schedule Created",
                text: response?.data?.message || "Schedule created successfully.",
                confirmButtonText: "OK",
            });

            setSchedule({
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
            });
        } catch (err) {
            const data = err?.response?.data;

            if (data?.validationErrMap) {
                const validationErrors = Object.values(data.validationErrMap).join("\n");

                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: validationErrors,
                });

                setError(validationErrors);
            } else {
                const errorMessage =
                    data?.message ||
                    "Something went wrong while creating schedule.";

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage,
                });

                setError(errorMessage);
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="doctor-schedule-page">
            <SideBar />

            <div className="doctor-schedule-main">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <div className="doctor-schedule-content">
                    <div className="doctor-schedule-header">
                        <h2>Create Schedule</h2>
                        <p>Add your available date and time for appointments.</p>
                    </div>

                    <div className="doctor-schedule-card">
                        <form onSubmit={handleSubmit}>
                            <div className="doctor-schedule-form-grid">
                                <div className="doctor-schedule-input-group">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={schedule.startDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="doctor-schedule-input-group">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={schedule.endDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="doctor-schedule-input-group">
                                    <label>Start Time</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={schedule.startTime}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="doctor-schedule-input-group">
                                    <label>End Time</label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={schedule.endTime}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {error && <div className="doctor-schedule-error">{error}</div>}
                            {message && <div className="doctor-schedule-success">{message}</div>}

                            <button
                                type="submit"
                                className="doctor-schedule-submit-btn"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Schedule"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSchedule;