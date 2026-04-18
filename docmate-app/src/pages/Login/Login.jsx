import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../api/BackendApi";
import Swal from "sweetalert2";

const Login = () => {

  const [username, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await loginUser(username, password);

      console.log("Login response:", response.data);

      // backend: { status, message, data }
      if (response.data.status) {
        await Swal.fire({
          icon: "success",
          title: "Login Successful ",
          text: response.data.message || "Welcome!",
          confirmButtonColor: "#3085d6"
        });

        // save token if exists
        if (response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
        }

        if (response.data.data?.userId) {
    localStorage.setItem("userId", response.data.data.userId);
  }

       if (response.data.data && response.data.data.role=="PATIENT") {
    localStorage.setItem("patientId", response.data.data.patientId);
  }

        if (response.data.data && response.data.data.role=="DOCTOR") {
    localStorage.setItem("doctorId", response.data.data.doctorId);
  }

        // redirect
        // window.location.href = "/dashboard";
        navigate("/dashboard/user", { state: response.data });

      }

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
        confirmButtonColor: "#d33"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-left">
          <h1 className="login-brand">Docmate</h1>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Sign in to manage appointments, track records, and access your healthcare dashboard.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-input-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email"
                value={username}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />

                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>


            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="/" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-btn2">
              Login
            </button>
          </form>

          <p className="login-footer-text">
            Don’t have an account? <a href="/register">Sign Up</a>
          </p>
        </div>

        <div className="login-right">
          <div className="login-info-box">
            <h3>Healthcare Made Simple</h3>
            <p>
              Book doctor appointments, manage your profile, and stay updated with
              smart health reminders — all in one platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;