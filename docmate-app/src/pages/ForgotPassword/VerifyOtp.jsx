import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { verifyOtp, sendOtp } from "../../api/BackendApi";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      Swal.fire({
        icon: "warning",
        title: "OTP Required",
        text: "Please enter the OTP.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOtp(email, otp);

      if (response.data.status) {

        const resetToken=response.data.message;

        await Swal.fire({
          icon: "success",
          title: "OTP Verified",
          text: "OTP Verified !",
          confirmButtonColor: "#3085d6",
        });

        navigate("/reset-password", {
          state: {
            email,
            resetToken
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.message || "Invalid OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await sendOtp(email);

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "A new OTP has been sent to your email.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Unable to resend OTP.",
      });
    }
  };

  return (
    <section className="verify-page">
      <div className="verify-card">

        <div className="verify-left">

          <h1 className="verify-brand">Docmate</h1>

          <h2 className="verify-title">
            Verify OTP
          </h2>

          <p className="verify-subtitle">
            Enter the 4-digit OTP sent to
            <br />
            <strong>{email}</strong>
          </p>

          <form
            className="verify-form"
            onSubmit={handleVerifyOtp}
          >

            <div className="verify-input-group">
              <label>OTP</label>

              <input
                type="text"
                maxLength={4}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button
              type="submit"
              className="verify-btn"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

          <div className="resend-area">

            <p>
              Didn't receive the OTP?
            </p>

            <button
              type="button"
              className="resend-btn"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>

          </div>

        </div>

        <div className="verify-right">

          <div className="verify-info-box">

            <h3>Verify Your Identity</h3>

            <p>
              Enter the OTP we sent to your email address.
              This helps us securely verify your identity
              before allowing you to reset your password.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default VerifyOtp;