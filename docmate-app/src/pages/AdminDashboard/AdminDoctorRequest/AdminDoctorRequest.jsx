import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getDoctorRequestsApi } from "../../../api/BackendApi";
import {
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./AdminDoctorRequest.css";

const AdminDoctorRequest = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const [doctorRequests, setDoctorRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(null);

  const PAGE_SIZE = 9;

  useEffect(() => {
    fetchDoctorRequests(0);
  }, []);

  const fetchDoctorRequests = async (page = 0) => {
    try {
      setLoading(true);

      const response = await getDoctorRequestsApi(page, PAGE_SIZE);

      if (response.data.status) {
        setDoctorRequests(response.data.data.data);
        setPaginationInfo(response.data.data.paginationInfo);
        setPageNo(page);
      } else {
        setDoctorRequests([]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong while fetching doctor requests.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchDoctorRequests(page);
  };

const handleViewRequest = (doctor) => {
  navigate(`/dashboard/admin/doctor-request-detail/${doctor.id}`);
};

  return (
    <div className="admin-doctor-page">
      <SideBar />

      <div className="admin-doctor-main">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="admin-doctor-content">

          <div className="admin-doctor-header">
            <div>
              <h2>Doctor Requests</h2>
              <p>View all doctor registration requests.</p>
            </div>
          </div>

          <div className="admin-doctor-card">

            <div className="admin-doctor-card-header">
              <h3>All Doctor Requests</h3>
            </div>

            {loading ? (
              <p className="doctor-loading">
                Loading doctor requests...
              </p>
            ) : doctorRequests.length > 0 ? (

              <div className="doctor-table-wrapper">
                <table className="doctor-table">
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Specialization</th>
                      <th>Phone</th>
                      <th>Fee</th>
                      <th>Request Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {doctorRequests.map((doctor, index) => (
                      <tr key={index}>

                        <td>{pageNo * PAGE_SIZE + index + 1}</td>

                        <td>
                          <div className="doctor-table-placeholder">
                            {doctor.firstName?.charAt(0)}
                          </div>
                        </td>

                        <td>
                          {doctor.firstName} {doctor.lastName}
                        </td>

                        <td>{doctor.email}</td>

                        <td>{doctor.specialization}</td>

                        <td>{doctor.phone}</td>

                        <td>Rs. {doctor.consultationFee}</td>

                        <td>
                          <span
                            className={`request-status ${doctor.requestStatus.toLowerCase()}`}
                          >
                            {doctor.requestStatus}
                          </span>
                        </td>

                        <td>
                          <button
                            className="view-doctor-btn"
                            onClick={() => handleViewRequest(doctor)}
                          >
                            <FaEye />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            ) : (
              <p className="doctor-empty">
                No doctor requests found.
              </p>
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
                      className={
                        pageNo === index ? "active-page" : ""
                      }
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  disabled={
                    pageNo === paginationInfo.totalPages - 1
                  }
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

export default AdminDoctorRequest;