import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { bookAppointment, getAvailableSlots,getDoctorDetails } from "../../api/BackendApi";
import "./BookAppointmentModal.css";
import Swal from "sweetalert2";

const BookAppointmentModal = ({ isOpen, onClose, doctorId, doctorName }) => {
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [appointmentEndTime, setAppointmentEndTime] = useState("");
    const [reasonForVisit, setReasonForVisit] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scheduleLoading, setScheduleLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                if (!doctorId || !isOpen) {
                    return;
                }

                setScheduleLoading(true);

                const response = await getDoctorDetails(doctorId);

                if (response.data?.status === true) {

                    const availableSchedules =
                        response.data.data?.schedules?.filter(
                            (schedule) => schedule.available === "AVAILABLE"
                        ) || [];

                    setSchedules(availableSchedules || []);
                } else {
                    setSchedules([]);
                }
            } catch (err) {
                console.error("Error fetching schedule", err);
                setSchedules([]);
            } finally {
                setScheduleLoading(false);
            }
        };

        fetchSchedules();
    }, [doctorId, isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleDateChange = (e) => {
        setAppointmentDate(e.target.value);

        // Date can be changed, but time must come from selected slot only
        setAppointmentTime("");
        setAppointmentEndTime("");
        setError("");
    };

    const handleSlotClick = (schedule) => {
        setAppointmentDate(schedule.startDate);
        setAppointmentTime(schedule.startTime?.slice(0, 5));
        setAppointmentEndTime(schedule.endTime?.slice(0, 5));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            if (!doctorId) {
                setError("Doctor id not found.");
                return;
            }

            if (!appointmentDate || !appointmentTime || !appointmentEndTime) {
                setError("Please select an available appointment slot.");
                return;
            }

            const requestData = {
                doctorId: doctorId,
                appointmentDate: appointmentDate,
                appointmentTime:
                    appointmentTime.length === 5
                        ? `${appointmentTime}:00`
                        : appointmentTime,
                reasonForVisit: reasonForVisit,
            };

            const response = await bookAppointment(requestData);
            onClose();

            if (response.data?.status === true) {
                await Swal.fire({
                    icon: "success",
                    title: "Appointment booked successfully",
                    text: response.data?.message,
                    confirmButtonColor: "#3085d6",
                });

                setAppointmentDate("");
                setAppointmentTime("");
                setAppointmentEndTime("");
                setReasonForVisit("");
                setError("");


            } else {
                setError(response.data?.message || "Failed to book appointment");
            }
        } catch (err) {
            console.error("Booking appointment error", err);
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="booking-modal-overlay">
            <div className="booking-modal-box">
                <div className="booking-modal-header">
                    <div>
                        <h2>Book Appointment</h2>
                        <p>{doctorName || "Doctor"}</p>
                    </div>

                    <button className="booking-close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                {error && <p className="booking-error">{error}</p>}

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="booking-form-group">
                        <label>Appointment Date</label>
                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={handleDateChange}
                        />
                    </div>

                    <div className="available-slots-section">
                        <h4>Available Slots</h4>

                        {scheduleLoading ? (
                            <p className="slot-empty">Loading slots...</p>
                        ) : schedules.length > 0 ? (
                            <div className="slot-list">
                                {schedules.map((schedule) => (
                                    <button
                                        type="button"
                                        key={schedule.id}
                                        className={
                                            appointmentDate === schedule.startDate &&
                                                appointmentTime === schedule.startTime?.slice(0, 5) &&
                                                appointmentEndTime === schedule.endTime?.slice(0, 5)
                                                ? "slot-card selected"
                                                : "slot-card"
                                        }
                                        onClick={() => handleSlotClick(schedule)}
                                    >
                                        <strong>{schedule.availableDay}</strong>

                                        <span>{schedule.startDate}</span>

                                        <span>
                                            {schedule.startTime?.slice(0, 5)} -{" "}
                                            {schedule.endTime?.slice(0, 5)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="slot-empty">No available schedule found.</p>
                        )}
                    </div>

                    <div className="time-field-row">
                        <div className="booking-form-group">
                            <label>Start Time</label>
                            <input
                                type="text"
                                value={appointmentTime}
                                placeholder="Select a slot"
                                readOnly
                            />
                        </div>

                        <div className="booking-form-group">
                            <label>End Time</label>
                            <input
                                type="text"
                                value={appointmentEndTime}
                                placeholder="Select a slot"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="booking-form-group">
                        <label>Reason for Visit</label>
                        <textarea
                            placeholder="Write reason..."
                            value={reasonForVisit}
                            onChange={(e) => setReasonForVisit(e.target.value)}
                        />
                    </div>

                    <div className="booking-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit" className="confirm-btn" disabled={loading}>
                            {loading ? "Booking..." : "Book Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default BookAppointmentModal;