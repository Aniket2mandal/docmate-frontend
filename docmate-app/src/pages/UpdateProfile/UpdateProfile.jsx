import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "./UpdateProfile.css";

import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";

import {
  getUserProfile,
  updatePatientProfile,
} from "../../api/BackendApi";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    province: "",
    age: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getUserProfile();

      console.log("Profile response:", response.data);

      if (response.data?.status === true) {
        const profile = response.data.data;

        setFormData({
          phone: profile.phone || "",
          address: profile.address || "",
          province: profile.province || "",
          age: profile.patientCore?.age || "",
          height: profile.patientCore?.height || "",
          weight: profile.patientCore?.weight || "",
        });
      }
    } catch (error) {
      console.error("Profile fetch error:", error);

      Swal.fire({
        icon: "error",
        title: "Profile Load Failed",
        text:
          error.response?.data?.message ||
          "Unable to load your profile.",
        confirmButtonColor: "#d33",
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

    const patientId = localStorage.getItem("patientId");

    if (!patientId) {
      Swal.fire({
        icon: "error",
        title: "Patient ID Missing",
        text: "Unable to find patient information.",
        confirmButtonColor: "#d33",
      });

      return;
    }

    const requestBody = {
      user: {
        phone: formData.phone,
        address: formData.address,
        province: formData.province,
      },

      age:
        formData.age !== ""
          ? Number(formData.age)
          : null,

      height:
        formData.height !== ""
          ? Number(formData.height)
          : null,

      weight:
        formData.weight !== ""
          ? Number(formData.weight)
          : null,
    };

    console.log("Update request:", requestBody);

    try {
      setUpdating(true);

      const response = await updatePatientProfile(
        patientId,
        requestBody
      );

      console.log("Update response:", response.data);

      if (response.data?.status === true) {
        await Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text:
            response.data?.message ||
            "Patient profile updated successfully.",
          confirmButtonColor: "#2f80ed",
        });

        navigate("/profile");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            response.data?.message ||
            "Unable to update profile.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while updating your profile.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="update-profile-page">
        <SideBar />

        <div className="update-profile-main">
          <Navbar />

          <div className="update-profile-content">
            <p className="update-profile-loading">
              Loading profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="update-profile-page">
      <SideBar />

      <div className="update-profile-main">
        <Navbar />

        <div className="update-profile-content">

          <div className="update-profile-header">
            <div>
              <h1>Update Profile</h1>

              <p>
                Update your personal and health information
              </p>
            </div>
          </div>

          <form
            className="update-profile-form"
            onSubmit={handleSubmit}
          >

            <div className="update-profile-section-title">
              <h2>Personal Details</h2>

              <p>
                Update your contact and address information
              </p>
            </div>

            <div className="update-profile-grid">

              <div className="update-input-group">
                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="update-input-group">
                <label>Province</label>

                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Province
                  </option>

                  <option value="Koshi">
                    Koshi Province
                  </option>

                  <option value="Madhesh">
                    Madhesh Province
                  </option>

                  <option value="Bagmati">
                    Bagmati Province
                  </option>

                  <option value="Gandaki">
                    Gandaki Province
                  </option>

                  <option value="Lumbini">
                    Lumbini Province
                  </option>

                  <option value="Karnali">
                    Karnali Province
                  </option>

                  <option value="Sudurpashchim">
                    Sudurpashchim Province
                  </option>
                </select>
              </div>

              <div className="update-input-group full-width">
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

            <div className="update-profile-section-title second-section">
              <h2>Patient Details</h2>

              <p>
                Update your health profile information
              </p>
            </div>

            <div className="update-profile-grid">

              <div className="update-input-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  min="0"
                />
              </div>

              <div className="update-input-group">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Enter weight"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="update-input-group">
                <label>Height</label>

                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Enter height"
                  min="0"
                  step="0.1"
                />
              </div>

            </div>

            <div className="update-profile-actions">

              <button
                type="button"
                className="cancel-update-btn"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-update-btn"
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Save Changes"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;