import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { createRoleApi } from "../../../api/BackendApi";
import Swal from "sweetalert2";
import "./CreateRole.css";

const CreateRole = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Submit button clicked");
    try {
      setLoading(true);
      setFieldErrors({});

      const response = await createRoleApi(formData);

      if (response.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Role Created",
          text: response.data.message,
          confirmButtonColor: "#2f80ed",
        });

        navigate("/dashboard/admin/roles");
      } else if (response.data?.validationErrMap) {
        setFieldErrors(response.data.validationErrMap);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data?.message || "Unable to create role.",
        });
      }
    } catch (error) {
      const errData = error.response?.data;

      if (errData?.validationErrMap) {
        setFieldErrors(errData.validationErrMap);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errData?.message || "Something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-role-page">
      <SideBar />

      <div className="create-role-main">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <div className="create-role-content">
          <div className="create-role-header">
            <div>
              <h2>Create Role</h2>
              <p>Create a new role for the system.</p>
            </div>

            <button
              className="back-role-btn"
              onClick={() => navigate("/dashboard/admin/roles")}
            >
              Back
            </button>
          </div>

          <div className="create-role-card">
            <form onSubmit={handleSubmit}>

              <div className="form-section-title">
                <h3>Role Information</h3>
              </div>

              <div className="create-role-form-grid">

                <div className="form-group full-width">
                  <label>Role Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter role name"
                  />

                  {fieldErrors.name && (
                    <span className="field-error">
                      {fieldErrors.name}
                    </span>
                  )}
                </div>

              </div>

              <div className="create-role-submit-row">

                <button
                  type="button"
                  className="cancel-role-btn"
                  onClick={() => navigate("/dashboard/admin/roles")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-role-btn"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Role"}
                </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;