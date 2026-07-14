import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaLock,
  FaSignOutAlt,
  FaFileAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaChevronRight,
} from "react-icons/fa";
import "./Settings.css";
import { logoutUser } from "../../api/BackendApi";

const Settings = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2f80ed",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await logoutUser();
      } catch (error) {
        console.error("Logout API failed:", error);
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("patientId");
        localStorage.removeItem("doctorId");
        localStorage.removeItem("email");
        localStorage.removeItem("name");

        navigate("/", { replace: true });
      }
    }
  });
};
  return (
    <div className="settings-page">

      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account and application settings.</p>
      </div>

      <div className="settings-card">

        <h3>Security</h3>

        <Link className="settings-item" to="/forgot-password">
          <div className="settings-left">
            <FaLock />
            <span>Reset Password</span>
          </div>

          <FaChevronRight />
        </Link>

      </div>

      <div className="settings-card">

        <h3>Account</h3>

        <button
          className="settings-item logout-btn"
          onClick={handleLogout}
        >
          <div className="settings-left">
            <FaSignOutAlt />
            <span>Logout</span>
          </div>

          <FaChevronRight />
        </button>

      </div>

      <div className="settings-card">

        <h3>Information</h3>

        <div className="settings-item">
          <div className="settings-left">
            <FaShieldAlt />
            <span>Privacy Policy</span>
          </div>

          <FaChevronRight />
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <FaFileAlt />
            <span>Terms & Conditions</span>
          </div>

          <FaChevronRight />
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <FaInfoCircle />
            <span>About DocMate</span>
          </div>

          <FaChevronRight />
        </div>

        <div className="settings-version">
          <span>Version</span>
          <span>1.0.0</span>
        </div>

      </div>

    </div>
  );
};

export default Settings;