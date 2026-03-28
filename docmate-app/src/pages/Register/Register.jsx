import { useState } from "react";
import "./Register.css";

const Register = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <section className="register-page">
            <div className="register-card">
                <div className="register-left">
                    <h1 className="register-brand">Docmate</h1>
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">
                        Join Docmate to book appointments, manage your health records, and stay connected with better healthcare services.
                    </p>

                    <form className="register-form">
                        <div className="register-row">
                            <div className="register-input-group">
                                <label>First Name</label>
                                <input type="text" placeholder="Enter first name" />
                            </div>

                            <div className="register-input-group">
                                <label>Last Name</label>
                                <input type="text" placeholder="Enter last name" />
                            </div>
                        </div>

                        <div className="register-input-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="Enter your email" />
                        </div>

                        {/* <div className="register-input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>

            <div className="register-input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" />
            </div> */}

                        <div className="register-input-group">
                            <label>Password</label>

                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                        </div>

                        <div className="register-input-group">
                            <label>Confirm Password</label>

                            <div className="password-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                        </div>

                        <div className="register-options">
                            <label className="terms-check">
                                <input type="checkbox" />
                                <span>I agree to the Terms & Conditions</span>
                            </label>
                        </div>

                        <button type="submit" className="register-btn">
                            Create Account
                        </button>
                    </form>

                    <p className="register-footer-text">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>

                <div className="register-right">
                    <div className="register-info-box">
                        <h3>Your Health, Smarter</h3>
                        <p>
                            Access trusted doctors, keep your medical information safe, and
                            enjoy a simple healthcare experience with Docmate.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;