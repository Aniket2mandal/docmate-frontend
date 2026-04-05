import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../api/BackendApi";
import Swal from "sweetalert2";

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        address: "",
        age: "",
        weight: "",
        height: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const requestBody = {
        user: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            phone: formData.phone,
            address: formData.address
        },
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight)
    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegisterUser = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await registerUser(requestBody);

            console.log("Registration response:", response.data);

            // backend: { status, message, data }
            if (response.data.status) {
                await Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: response.data.message || "Account created successfully!",
                    confirmButtonColor: "#3085d6"
                });

                // save token if exists
                if (response.data.data?.token) {
                    localStorage.setItem("token", response.data.data.token);
                }

                // redirect
                // window.location.href = "/dashboard";
                navigate("/dashboard", { state: response.data });

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
        <section className="register-page">
            <div className="register-card">
                <div className="register-left">
                    <h1 className="register-brand">Docmate</h1>
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">
                        Join Docmate to book appointments, manage your health records, and stay connected with better healthcare services.
                    </p>

                    <form className="register-form" onSubmit={handleRegisterUser}>
                        <div className="register-row">
                            <div className="register-input-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" placeholder="Enter first name" onChange={handleChange} />
                            </div>

                            <div className="register-input-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" placeholder="Enter last name" onChange={handleChange} />
                            </div>
                        </div>



                        <div className="register-row">
                            {/* Age */}
                            <div className="register-input-group">
                                <label>Age</label>
                                <input name="age" type="number" placeholder="Age" onChange={handleChange} />
                            </div>
                            <div className="register-input-group">
                                <label>Phone</label>
                                <input name="phone" placeholder="Phone" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="register-row">
                            {/* Weight */}
                            <div className="register-input-group">
                                <label>Weight</label>
                                <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} />
                            </div>
                            {/* Height */}
                            <div className="register-input-group">
                                <label>Height</label>
                                <input name="height" type="text" placeholder="Height (cm)" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="register-input-group">
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                        </div>

                        {/* Address */}
                        <div className="register-input-group">
                            <label>Address</label>
                            <input name="address" placeholder="Address" onChange={handleChange} />
                        </div>

                        <div className="register-input-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}      // controlled input
                                onChange={handleChange}      // update formData
                            >
                                <option value="">Select Gender</option> {/* placeholder */}
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="register-input-group">
                            <label>Password</label>

                            <div className="password-wrapper">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    value={formData.password}
                                    onChange={handleChange}

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