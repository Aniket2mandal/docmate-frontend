import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import Navbar from "../../components/Navbar/Navbar";
import { getUserProfile, uploadUserImage } from "../../api/BackendApi";
import Swal from "sweetalert2";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();

      if (response.data?.status === true) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  if (!profile) {
    return (
      <div className="dashboard-profile-page">
        <SideBar />

        <div className="dashboard-profile-main">
          <Navbar />

          <div className="dashboard-profile-content">
            <p className="profile-loading">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const role = localStorage.getItem("role")?.toUpperCase();

  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`;

  const profileImage =
    role === "DOCTOR"
      ? profile.doctorCore?.user?.imageUrl
      : profile.patientCore?.user?.imageUrl;

  const firstLetter = profile.firstName
    ? profile.firstName.charAt(0).toUpperCase()
    : "U";

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      setImageUploading(true);

      const response = await uploadUserImage(profile.id, file);

      if (response.data?.status === true) {
        await Swal.fire({
          icon: "success",
          title: "Image uploaded successfully",
          text: response.data?.message,
          confirmButtonColor: "#2f80ed",
        });

        fetchProfile();
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload failed",
          text: response.data?.message || "Image upload failed",
        });
      }
    } catch (error) {
      console.error("Image upload error:", error);

      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="dashboard-profile-page">
      <SideBar />

      <div className="dashboard-profile-main">
        <Navbar />

        <div className="dashboard-profile-content">
          <div className="profile-page-header">
            <h1>Profile Information</h1>
            <p>View your personal account details</p>
          </div>

          <div className="profile-card-new">
            <div className="profile-left-section">
              <div className="profile-image-box">
                {profileImage ? (
                  <img src={profileImage} alt="profile" />
                ) : (
                  <div className="profile-image-placeholder">
                    {firstLetter}
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <button
                className="upload-image-btn"
                onClick={handleUploadClick}
                disabled={imageUploading}
              >
                {imageUploading ? "Uploading..." : "Upload Image"}
              </button>

              <h2>{fullName}</h2>
              <p>{profile.email}</p>

              <span className="profile-role-badge">{profile.role}</span>
            </div>

            <div className="profile-right-section">
              <div className="profile-section-title">
                <h2>Personal Details</h2>
                <p>Your basic account information</p>
              </div>

              <div className="profile-details-grid">
                <div className="profile-detail-item">
                  <span>Full Name</span>
                  <strong>{fullName}</strong>
                </div>

                <div className="profile-detail-item">
                  <span>Email</span>
                  <strong>{profile.email || "-"}</strong>
                </div>

                <div className="profile-detail-item">
                  <span>Phone</span>
                  <strong>{profile.phone || "-"}</strong>
                </div>

                <div className="profile-detail-item">
                  <span>Gender</span>
                  <strong>{profile.gender || "-"}</strong>
                </div>

                <div className="profile-detail-item full-width">
                  <span>Address</span>
                  <strong>{profile.address || "-"}</strong>
                </div>
              </div>

              {role === "DOCTOR" && (
                <>
                  <div className="profile-section-title second-title">
                    <h2>Doctor Details</h2>
                    <p>Professional medical information</p>
                  </div>

                  <div className="profile-details-grid">
                    <div className="profile-detail-item">
                      <span>Specialization</span>
                      <strong>{profile.doctorCore?.specialization || "-"}</strong>
                    </div>

                    <div className="profile-detail-item">
                      <span>Experience</span>
                      <strong>
                        {profile.doctorCore?.experience
                          ? `${profile.doctorCore.experience} years`
                          : "-"}
                      </strong>
                    </div>

                    <div className="profile-detail-item">
                      <span>Qualification</span>
                      <strong>{profile.doctorCore?.qualification || "-"}</strong>
                    </div>

                    <div className="profile-detail-item">
                      <span>Consultation Fee</span>
                      <strong>
                        {profile.doctorCore?.consultation_fee
                          ? `Rs. ${profile.doctorCore.consultation_fee}`
                          : "-"}
                      </strong>
                    </div>
                  </div>
                </>
              )}

              {role === "PATIENT" && (
                <>
                  <div className="profile-section-title second-title">
                    <h2>Patient Details</h2>
                    <p>Health profile information</p>
                  </div>

                  <div className="profile-details-grid">
                    <div className="profile-detail-item">
                      <span>Age</span>
                      <strong>{profile.patientCore?.age || "-"}</strong>
                    </div>

                    <div className="profile-detail-item">
                      <span>Weight</span>
                      <strong>
                        {profile.patientCore?.weight
                          ? `${profile.patientCore.weight} kg`
                          : "-"}
                      </strong>
                    </div>

                    <div className="profile-detail-item">
                      <span>Height</span>
                      <strong>
                        {profile.patientCore?.height
                          ? `${profile.patientCore.height} ft`
                          : "-"}
                      </strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;