import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { sendOtp } from "../../api/BackendApi";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await sendOtp(email);

      if (response.data.status) {
        await Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: response.data.message || "OTP has been sent to your email.",
          confirmButtonColor: "#3085d6",
        });

        navigate("/verify-otp", {
          state: {
            email,
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Unable to send OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-left">
          <h1 className="forgot-brand">Docmate</h1>

          <h2 className="forgot-title">
            Forgot Password
          </h2>

          <p className="forgot-subtitle">
            Enter your registered email address. We'll send you a One-Time
            Password (OTP) to reset your password.
          </p>

          <form className="forgot-form" onSubmit={handleSendOtp}>
            <div className="forgot-input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>

        <div className="forgot-right">
          <div className="forgot-info-box">
            <h3>Password Recovery</h3>

            <p>
              Don't worry! Enter your registered email and we'll send you a
              secure OTP to verify your identity and reset your password.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;