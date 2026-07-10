import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import {
  getAllRoleApi,
  deleteRoleApi,
} from "../../../api/BackendApi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminRole.css";

const AdminRole = ({ darkMode, toggleDarkMode }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const response = await getAllRoleApi();

      if (response.data?.status) {
        setRoles(response.data.data || []);
      } else {
        setRoles([]);
      }
    } catch (error) {
      console.error("Role fetch error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while fetching roles.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = () => {
    navigate("/dashboard/admin/roles/create");
  };

  const handleEditRole = (role) => {
    if (!role?.id) {
      Swal.fire({
        icon: "error",
        title: "Role not found",
        text: "Role id is missing.",
      });
      return;
    }

    navigate(`/dashboard/admin/roles/edit/${role.id}`);
  };

  const handleDeleteRole = async (role) => {
    if (!role?.id) {
      Swal.fire({
        icon: "error",
        title: "Role not found",
        text: "Role id is missing.",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Role?",
      text: "This role will be deleted permanently.",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteRoleApi(role.id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Role deleted successfully.",
        confirmButtonColor: "#2f80ed",
      });

      fetchRoles();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while deleting the role.",
      });
    }
  };

  return (
    <div className="admin-role-page">
      <SideBar />

      <div className="admin-role-main">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <div className="admin-role-content">
          <div className="admin-role-header">
            <div>
              <h2>Role List</h2>
              <p>View, create, edit and manage roles.</p>
            </div>

            <div className="admin-role-actions">
              <button
                className="create-role-btn"
                onClick={handleCreateRole}
              >
                <FaPlus />
                Create Role
              </button>
            </div>
          </div>

          <div className="admin-role-card">
            <div className="admin-role-card-header">
              <h3>All Roles</h3>
            </div>

            {loading ? (
              <p className="role-loading">Loading roles...</p>
            ) : roles.length > 0 ? (
              <div className="role-table-wrapper">
                <table className="role-table">
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Role Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {roles.map((role, index) => (
                      <tr key={role.id}>
                        <td>{index + 1}</td>

                        <td>
                          <strong>{role.name}</strong>
                        </td>

                        <td>
                          <div className="role-action-buttons">
                            <button
                              className="edit-role-btn"
                              onClick={() => handleEditRole(role)}
                            >
                              <FaEdit />
                            </button>

                            <button
                              className="delete-role-btn"
                              onClick={() => handleDeleteRole(role)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="role-empty">No roles found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRole;