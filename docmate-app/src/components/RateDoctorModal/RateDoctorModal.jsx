import { useState } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import { rateDoctorApi } from "../../api/BackendApi";
import "./RateDoctorModal.css";

const RateDoctorModal = ({
    isOpen,
    onClose,
    doctorId,
    onSuccess,
}) => {

    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            Swal.fire({
                icon: "warning",
                title: "Select Rating",
                text: "Please select a rating.",
            });

            return;
        }

        try {
            setLoading(true);

            const patientId = localStorage.getItem("userId");

            await rateDoctorApi({
                doctorId,
                patientId,
                rating,
                review: ""
            });

            Swal.fire({
                icon: "success",
                title: "Thank You",
                text: "Doctor rated successfully.",
                confirmButtonColor: "#2f80ed"
            });

            onSuccess();
            window.location.reload();

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong."
            });
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="rating-modal-overlay">

            <div className="rating-modal-box">

                <div className="rating-modal-header">
                    <h2>Rate Doctor</h2>

                    <button
                        className="rating-close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form
                    className="rating-form"
                    onSubmit={handleSubmit}
                >

                    <div className="star-container">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <span
                                key={star}
                                className={
                                    star <= rating
                                        ? "star active"
                                        : "star"
                                }
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>

                        ))}

                    </div>

                    <button
                        type="submit"
                        className="submit-rating-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit Rating"}
                    </button>

                </form>

            </div>

        </div>,
        document.body
    );
};

export default RateDoctorModal;