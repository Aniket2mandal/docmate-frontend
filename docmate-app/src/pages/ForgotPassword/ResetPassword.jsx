import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPassword } from "../../api/BackendApi";
import "./ResetPassword.css";

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Required",
                text: "Please fill all fields.",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "New password and confirm password do not match.",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await forgotPassword(email, newPassword);

            if (response.data.status) {

                try {
                    await logoutUser();
                } catch (e) {
                    console.error("Logout failed:", e);
                }

                localStorage.clear();

                await Swal.fire({
                    icon: "success",
                    title: "Password Changed",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                });

                navigate("/", { replace: true });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text:
                    error.response?.data?.message ||
                    "Unable to change password.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="reset-page">
            <div className="reset-card">

                <div className="reset-left">

                    <h1 className="reset-brand">Docmate</h1>

                    <h2 className="reset-title">
                        Create New Password
                    </h2>

                    <p className="reset-subtitle">
                        Your identity has been verified.
                        Create a strong password for
                        <br />
                        <strong>{email}</strong>
                    </p>

                    <form
                        className="reset-form"
                        onSubmit={handleResetPassword}
                    >

                        <div className="reset-input-group">
                            <label>New Password</label>

                            <div className="password-wrapper">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />

                                <span
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                >
                                    {showNewPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                        </div>

                        <div className="reset-input-group">
                            <label>Confirm Password</label>

                            <div className="password-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />

                                <span
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="reset-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : "Reset Password"}
                        </button>

                    </form>

                </div>

                <div className="reset-right">

                    <div className="reset-info-box">

                        <h3>Almost Done</h3>

                        <p>
                            Create a strong password that you
                            haven't used before. Your password
                            should be easy for you to remember
                            but difficult for others to guess.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ResetPassword;