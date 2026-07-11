import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { requestDoctorApi } from "../../api/BackendApi";
import Swal from "sweetalert2";
import "./DoctorRequest.css";

const DoctorRequest = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    province: "",
    status: "ACTIVE",
    specialization: "",
    experience: "",
    qualification: "",
    consultation_fee: "",

    citizenshipFront: null,
    citizenshipBack: null,
    doctorLicense: null,
    educationCertificate: null,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Maps backend validation keys (e.g. "user.firstName") to formData field names
  const mapBackendKeyToField = (key) => {
    return key.startsWith("user.") ? key.replace("user.", "") : key;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field as soon as the user edits it
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFieldErrors({});

      const formDataToSend = new FormData();

      // JSON request
      const doctorRequest = {
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          phone: formData.phone,
          address: formData.address,
          province: formData.province,
          status: formData.status,
        },
        specialization: formData.specialization,
        experience: Number(formData.experience),
        qualification: formData.qualification,
        consultation_fee: formData.consultation_fee,
      };

      formDataToSend.append(
        "doctorRequest",
        new Blob([JSON.stringify(doctorRequest)], {
          type: "application/json",
        })
      );

      if (formData.citizenshipFront) {
        formDataToSend.append(
          "citizenshipFront",
          formData.citizenshipFront
        );
      }

      if (formData.citizenshipBack) {
        formDataToSend.append(
          "citizenshipBack",
          formData.citizenshipBack
        );
      }

      if (formData.doctorLicense) {
        formDataToSend.append(
          "doctorLicense",
          formData.doctorLicense
        );
      }

      if (formData.educationCertificate) {
        formDataToSend.append(
          "educationCertificate",
          formData.educationCertificate
        );
      }

      const response = await requestDoctorApi(formDataToSend);

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Doctor Created",
          text: response.data.message,
        });

        navigate("/");
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
          title: "Error",
          text: errData?.message || "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  return (
    <>

  <nav className="navbar-landing">
      <h2 className="logo">Docmate</h2>

      <div className="nav-buttons">
        <a className="login-btn" href="/login">Login</a>
        {/* <button className="login-btn"><a href="/login">Login</a></button> */}
        <a className="start-btn" href="/register">Get Started</a>
      </div>
    </nav>

    <div className="create-doctor-page">
      {/* <SideBar /> */}

      <div className="create-doctor-main">
        {/* <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}

        <div className="create-doctor-content">
          <div className="create-doctor-header">
            <div>
              <h2>Request Doctor</h2>
              <p>Request for a new doctor account with professional details.</p>
            </div>

            <button
              className="back-doctor-btn"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>

          <div className="create-doctor-card">
            <form onSubmit={handleSubmit}>
              <div className="form-section-title">
                <h3>User Information</h3>
              </div>

              <div className="create-doctor-form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {fieldErrors.firstName && (
                    <span className="field-error">{fieldErrors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  {fieldErrors.lastName && (
                    <span className="field-error">{fieldErrors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {fieldErrors.email && (
                    <span className="field-error">{fieldErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {fieldErrors.password && (
                    <span className="field-error">{fieldErrors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {fieldErrors.gender && (
                    <span className="field-error">{fieldErrors.gender}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                  {fieldErrors.phone && (
                    <span className="field-error">{fieldErrors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Province</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Province</option>
                    <option value="Koshi">Koshi Province</option>
                    <option value="Madhesh">Madhesh Province</option>
                    <option value="Bagmati">Bagmati Province</option>
                    <option value="Gandaki">Gandaki Province</option>
                    <option value="Lumbini">Lumbini Province</option>
                    <option value="Karnali">Karnali Province</option>
                    <option value="Sudurpashchim">Sudurpashchim Province</option>
                  </select>
                  {fieldErrors.specialization && (
                    <span className="field-error">
                      {fieldErrors.specialization}
                    </span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                  {fieldErrors.address && (
                    <span className="field-error">{fieldErrors.address}</span>
                  )}
                </div>



              </div>

              <div className="form-section-title doctor-info-title">
                <h3>Doctor Information</h3>
              </div>

              <div className="create-doctor-form-grid">
                <div className="form-group">
                  <label>Specialization</label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Specialization</option>
                    <option value="Physician">Physician</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                  </select>
                  {fieldErrors.specialization && (
                    <span className="field-error">
                      {fieldErrors.specialization}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Enter experience"
                    min="0"
                    step="0.5"
                  />
                  {fieldErrors.experience && (
                    <span className="field-error">{fieldErrors.experience}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. MBBS MD"
                  />
                  {fieldErrors.qualification && (
                    <span className="field-error">
                      {fieldErrors.qualification}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Consultation Fee</label>
                  <input
                    type="text"
                    name="consultation_fee"
                    value={formData.consultation_fee}
                    onChange={handleChange}
                    placeholder="e.g. 2000"
                  />
                  {fieldErrors.consultation_fee && (
                    <span className="field-error">
                      {fieldErrors.consultation_fee}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-section-title doctor-info-title">
                <h3>Verification Documents</h3>
              </div>

              <div className="create-doctor-form-grid">

                <div className="form-group">
                  <label>Citizenship Front</label>
                  <input
                    type="file"
                    name="citizenshipFront"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  {fieldErrors.citizenshipFront && (
                    <span className="field-error">
                      {fieldErrors.citizenshipFront}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Citizenship Back</label>
                  <input
                    type="file"
                    name="citizenshipBack"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  {fieldErrors.citizenshipBack && (
                    <span className="field-error">
                      {fieldErrors.citizenshipBack}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Medical License</label>
                  <input
                    type="file"
                    name="doctorLicense"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  {fieldErrors.doctorLicense && (
                    <span className="field-error">
                      {fieldErrors.doctorLicense}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Higher Education Certificate</label>
                  <input
                    type="file"
                    name="educationCertificate"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  {fieldErrors.educationCertificate && (
                    <span className="field-error">
                      {fieldErrors.educationCertificate}
                    </span>
                  )}
                </div>

              </div>

              <div className="create-doctor-submit-row">
                <button
                  type="button"
                  className="cancel-doctor-btn"
                  onClick={() => navigate("/dashboard/admin/doctors")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-doctor-btn"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Request Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorRequest;