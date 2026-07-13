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
        height: "",
        status: "ACTIVE"
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    // Maps backend keys like "user.firstName" -> "firstName", leaves top-level keys as-is
    const mapBackendKeyToField = (key) => {
        return key.startsWith("user.") ? key.replace("user.", "") : key;
    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegisterUser = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setFieldErrors({});

        const requestBody = {
            user: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                phone: formData.phone,
                address: formData.address,
                status: formData.status
            },
            age: Number(formData.age),
            height: Number(formData.height),
            weight: Number(formData.weight)
        };

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

                if (response.data.data?.token) {
                    localStorage.setItem("token", response.data.data.token);
                }

                navigate("/dashboard/user", { state: response.data });

            } else if (response.data.validationErrMap) {
                const mappedErrors = {};
                Object.entries(response.data.validationErrMap).forEach(
                    ([key, msg]) => {
                        mappedErrors[mapBackendKeyToField(key)] = msg;
                    }
                );
                setFieldErrors(mappedErrors);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: response.data.message || "Something went wrong.",
                    confirmButtonColor: "#d33"
                });
            }

        } catch (error) {
            console.error(error);

            const errData = error.response?.data;

            if (errData?.validationErrMap) {
                const mappedErrors = {};
                Object.entries(errData.validationErrMap).forEach(([key, msg]) => {
                    mappedErrors[mapBackendKeyToField(key)] = msg;
                });
                setFieldErrors(mappedErrors);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: errData?.message || "Invalid credentials",
                    confirmButtonColor: "#d33"
                });
            }
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
                                {fieldErrors.firstName && (
                                    <span className="field-error">{fieldErrors.firstName}</span>
                                )}
                            </div>

                            <div className="register-input-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" placeholder="Enter last name" onChange={handleChange} />
                                {fieldErrors.lastName && (
                                    <span className="field-error">{fieldErrors.lastName}</span>
                                )}
                            </div>
                        </div>

                        <div className="register-row">
                            {/* Age */}
                            <div className="register-input-group">
                                <label>Age</label>
                                <input name="age" type="number" placeholder="Age" onChange={handleChange} />
                                {fieldErrors.age && (
                                    <span className="field-error">{fieldErrors.age}</span>
                                )}
                            </div>
                            <div className="register-input-group">
                                <label>Phone</label>
                                <input name="phone" placeholder="Phone" onChange={handleChange} />
                                {fieldErrors.phone && (
                                    <span className="field-error">{fieldErrors.phone}</span>
                                )}
                            </div>
                        </div>

                        <div className="register-row">
                            {/* Weight */}
                            <div className="register-input-group">
                                <label>Weight</label>
                                <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} />
                                {fieldErrors.weight && (
                                    <span className="field-error">{fieldErrors.weight}</span>
                                )}
                            </div>
                            {/* Height */}
                            <div className="register-input-group">
                                <label>Height</label>
                                <input name="height" type="text" placeholder="Height (cm)" onChange={handleChange} />
                                {fieldErrors.height && (
                                    <span className="field-error">{fieldErrors.height}</span>
                                )}
                            </div>
                        </div>

                        <div className="register-input-group">
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                            {fieldErrors.email && (
                                <span className="field-error">{fieldErrors.email}</span>
                            )}
                        </div>

                        {/* Address */}
                        <div className="register-input-group">
                            <label>Address</label>
                            <input name="address" placeholder="Address" onChange={handleChange} />
                            {fieldErrors.address && (
                                <span className="field-error">{fieldErrors.address}</span>
                            )}
                        </div>

                        <div className="register-input-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                            {fieldErrors.gender && (
                                <span className="field-error">{fieldErrors.gender}</span>
                            )}
                        </div>

                        <div className="register-input-group">
                            <label>Password</label>

                            <div className="password-wrapper">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                            {fieldErrors.password && (
                                <span className="field-error">{fieldErrors.password}</span>
                            )}
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

                        <button type="submit" className="register-btn" disabled={loading}>
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <p className="register-footer-text">
                        Already have an account? <Link to="/login">Login</Link>
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