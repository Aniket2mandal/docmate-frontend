import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getAllUsersApi, deleteUserApi } from "../../../api/BackendApi";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminUser.css";

const AdminUser = ({ darkMode, toggleDarkMode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const PAGE_SIZE = 5;

  const [pageNo, setPageNo] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(null);

  useEffect(() => {
    fetchUsers(0);
  }, []);

  const fetchUsers = async (page = 0) => {
    try {
      setLoading(true);

      const response = await getAllUsersApi(page, PAGE_SIZE);

      if (response.data?.status === true) {
        setUsers(response.data.data.data);
        setPaginationInfo(response.data.data.paginationInfo);
        setPageNo(page);
      } else {
        setUsers([]);
        setPaginationInfo(null);
      }
    } catch (error) {
      console.error("User fetch error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while fetching users.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    const userId = user?.id;

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User not found",
        text: "User id is missing.",
      });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete User?",
      text: "This user will be deleted permanently.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteUserApi(userId);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "User deleted successfully.",
        confirmButtonColor: "#2f80ed",
      });

      fetchUsers(pageNo);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while deleting user.",
      });
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  return (
    <div className="admin-user-page">
      <SideBar />

      <div className="admin-user-main">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="admin-user-content">
          <div className="admin-user-header">
            <div>
              <h2>User List</h2>
              <p>View and manage all user accounts.</p>
            </div>
          </div>

          <div className="admin-user-card">
            <div className="admin-user-card-header">
              <h3>All Users</h3>
            </div>

            {loading ? (
              <p className="user-loading">Loading users...</p>
            ) : users.length > 0 ? (
              <div className="user-table-wrapper">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user?.id || index}>
                        <td>{pageNo * PAGE_SIZE + index + 1}</td>
                        <td>{user?.firstName?.trim() || "-"}</td>
                        <td>{user?.email || "-"}</td>
                        <td>{user?.gender || "-"}</td>
                        <td>{user?.role || "-"}</td>

                        <td>
                          <div className="user-action-buttons">
                            <button
                              className="delete-user-btn"
                              onClick={() => handleDeleteUser(user)}
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
              <p className="user-empty">No user found.</p>
            )}

            {paginationInfo && (
              <div className="doctor-pagination">
                <button
                  disabled={pageNo === 0}
                  onClick={() => handlePageChange(pageNo - 1)}
                >
                  <FaChevronLeft />
                </button>

                {Array.from(
                  { length: paginationInfo.totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      className={pageNo === index ? "active-page" : ""}
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={pageNo === paginationInfo.totalPages - 1}
                  onClick={() => handlePageChange(pageNo + 1)}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;