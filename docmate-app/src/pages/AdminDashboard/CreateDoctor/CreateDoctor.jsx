import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { createDoctorApi } from "../../../api/BackendApi";
import Swal from "sweetalert2";
import "./CreateDoctor.css";

const CreateDoctor = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    status: "ACTIVE",
    specialization: "",
    experience: "",
    qualification: "",
    consultation_fee: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return "First name is required.";
    if (!formData.lastName.trim()) return "Last name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!formData.password.trim()) return "Password is required.";
    if (!formData.gender) return "Gender is required.";
    if (!formData.phone.trim()) return "Phone is required.";
    if (!formData.address.trim()) return "Address is required.";
    if (!formData.specialization.trim()) return "Specialization is required.";
    if (!formData.experience) return "Experience is required.";
    if (!formData.qualification.trim()) return "Qualification is required.";
    if (!formData.consultation_fee.trim()) return "Consultation fee is required.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const validationMessage = validateForm();

    // if (validationMessage) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Validation Error",
    //     text: validationMessage,
    //   });
    //   return;
    // }

    const doctorRequest = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        status: formData.status,
      },
      specialization: formData.specialization,
      experience: Number(formData.experience),
      qualification: formData.qualification,
      consultation_fee: formData.consultation_fee,
    };

    try {
      setLoading(true);

      const response = await createDoctorApi(doctorRequest);

      if (response.data?.status === true) {
        Swal.fire({
          icon: "success",
          title: "Doctor Created",
          text: response.data?.message || "Doctor created successfully.",
          confirmButtonColor: "#2f80ed",
        });

        navigate("/dashboard/admin/doctors");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data?.message || "Doctor creation failed.",
        });
      }
    } catch (error) {
      console.error("Create doctor error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while creating doctor.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-doctor-page">
      <SideBar />

      <div className="create-doctor-main">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="create-doctor-content">
          <div className="create-doctor-header">
            <div>
              <h2>Create Doctor</h2>
              <p>Add a new doctor account with professional details.</p>
            </div>

            <button
              className="back-doctor-btn"
              onClick={() => navigate("/dashboard/admin/doctors")}
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

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
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
                    <option value="">Select Specialization</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                  </select>
                </div>

                {/* <div className="form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Cardiologist"
                  />
                </div> */}

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
                  {loading ? "Creating..." : "Create Doctor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;