import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import {
  getDoctorDetails,
  updateDoctorApi,
} from "../../../api/BackendApi";
import Swal from "sweetalert2";
import "../CreateDoctor/CreateDoctor.css";

const UpdateDoctor = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);

      const response = await getDoctorDetails(doctorId);

      if (response.data?.status) {
        const doctor = response.data.data;

        setFormData({
          firstName: doctor?.user?.firstName || "",
          lastName: doctor?.user?.lastName || "",
          email: doctor?.user?.email || "",
          gender: doctor?.user?.gender || "",
          phone: doctor?.user?.phone || "",
          address: doctor?.user?.address || "",
          province: doctor?.user?.province || "",
          status: doctor?.user?.status || "ACTIVE",

          specialization: doctor?.specialization || "",
          experience: doctor?.experience || "",
          qualification: doctor?.qualification || "",
          consultation_fee: doctor?.consultation_fee || "",

          // keep files empty initially
          citizenshipFront: null,
          citizenshipBack: null,
          doctorLicense: null,
          educationCertificate: null,

        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to load doctor details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorRequest = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
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


    try {
      setLoading(true);


      const formDataToSend = new FormData();


      // JSON part
      formDataToSend.append(
        "doctorRequest",
        new Blob(
          [JSON.stringify(doctorRequest)],
          {
            type: "application/json",
          }
        )
      );


      // Only append files that user selected
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

      console.log("formData state file:", formData.citizenshipFront);

      for (let pair of formDataToSend.entries()) {
        console.log("FormData:", pair[0], pair[1]);
      }

        const response = await updateDoctorApi(
          doctorId,
          formDataToSend
        );


        if (response.data?.status) {

          Swal.fire({
            icon: "success",
            title: "Doctor Updated",
            text:
              response.data?.message ||
              "Doctor updated successfully.",
            confirmButtonColor: "#2f80ed",
          });


          navigate("/dashboard/admin/doctors");

        } else {

          Swal.fire({
            icon: "error",
            title: "Failed",
            text:
              response.data?.message ||
              "Doctor update failed.",
          });

        }


      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Something went wrong while updating doctor.",
        });

      } finally {

        setLoading(false);

      }
    };

    const handleFileChange = (e) => {
      const { name, files } = e.target;

      console.log("Selected file:", name, files[0]);
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    };

    return (
      <div className="create-doctor-page">
        <SideBar />

        <div className="create-doctor-main">
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          <div className="create-doctor-content">
            <div className="create-doctor-header">
              <div>
                <h2>Update Doctor</h2>
                <p>
                  Update doctor account and professional details.
                </p>
              </div>

              <button
                className="back-doctor-btn"
                onClick={() =>
                  navigate("/dashboard/admin/doctors")
                }
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
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
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
                  </div>

                  <div className="form-group">
                    <label>Phone</label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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


                  <div className="form-group">
                    <label>Address</label>

                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
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
                      <option value="" disabled>
                        Specialization
                      </option>
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
                  </div>

                  <div className="form-group">
                    <label>Experience</label>

                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
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
                    />
                  </div>

                  <div className="form-group">
                    <label>Consultation Fee</label>

                    <input
                      type="text"
                      name="consultation_fee"
                      value={formData.consultation_fee}
                      onChange={handleChange}
                    />
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
                  </div>


                  <div className="form-group">
                    <label>Citizenship Back</label>

                    <input
                      type="file"
                      name="citizenshipBack"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </div>


                  <div className="form-group">
                    <label>Medical License</label>

                    <input
                      type="file"
                      name="doctorLicense"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </div>


                  <div className="form-group">
                    <label>Higher Education Certificate</label>

                    <input
                      type="file"
                      name="educationCertificate"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                  </div>


                </div>

                <div className="create-doctor-submit-row">
                  <button
                    type="button"
                    className="cancel-doctor-btn"
                    onClick={() =>
                      navigate("/dashboard/admin/doctors")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="submit-doctor-btn"
                    disabled={loading}
                  >
                    {loading
                      ? "Updating..."
                      : "Update Doctor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UpdateDoctor;