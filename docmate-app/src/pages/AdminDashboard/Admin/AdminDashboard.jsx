import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";

import {
  getAllDoctorsAdmin,
  getAllPatientApi,
  getDoctorRequestsApi,
} from "../../../api/BackendApi";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const name = localStorage.getItem("name") || "Admin";

  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [doctorRes, patientRes, requestRes] = await Promise.all([
        getAllDoctorsAdmin(0, 1000),
        getAllPatientApi(0, 1000),
        getDoctorRequestsApi(0, 5),
      ]);

      if (doctorRes.data.status) {
        const doctors = doctorRes.data.data;
        setDoctorCount(doctors.totalElements || doctors.content.length);
      }

      if (patientRes.data.status) {
        const patients = patientRes.data.data;
        setPatientCount(patients.totalElements || patients.content.length);
      }

      if (requestRes.data.status) {
        const requests = requestRes.data.data;

        setRequestCount(requests.totalElements || requests.content.length);
        setPendingRequests(requests.content || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalUsers = doctorCount + patientCount;

  const doctorPercent =
    totalUsers === 0 ? 0 : ((doctorCount / totalUsers) * 100).toFixed(1);

  const patientPercent =
    totalUsers === 0 ? 0 : ((patientCount / totalUsers) * 100).toFixed(1);

  return (
    <div className="dashboard">
      <SideBar />

      <div className="main-content">
        <Navbar />

        <div className="bodyPart">

          {/* Welcome */}

          <div className="welcome">
            <h2 className="welcome-back">Welcome back,</h2>
            <h2 className="user-name">{name} 👋</h2>
          </div>

          {/* Dashboard Cards */}

          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Total Doctors</h3>
              <h1>{doctorCount}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Total Patients</h3>
              <h1>{patientCount}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Doctor Requests</h3>
              <h1>{requestCount}</h1>
            </div>

          </div>

          {/* Bottom Section */}

          <div className="dashboard-bottom">

            {/* Pending Requests */}

            <div className="pending-card">

              <div className="section-header">
                <h2>Pending Doctor Requests</h2>

                <Link
                  className="view-all"
                  to="/dashboard/admin/doctor-request"
                >
                  View All →
                </Link>
              </div>

              {pendingRequests.length === 0 ? (
                <p className="empty-text">No pending requests.</p>
              ) : (
                pendingRequests.map((request) => (
                  <Link
                    key={request.id}
                    to={`/dashboard/admin/doctor-request/${request.id}`}
                    className="appointment-item"
                  >
                    <div>
                      <h3>
                        Dr. {request.firstName} {request.lastName}
                      </h3>

                      <p>
                        <strong>Specialization:</strong>{" "}
                        {request.specialization}
                      </p>

                      <p>
                        <strong>Email:</strong> {request.email}
                      </p>
                    </div>

                    <span className="status">
                      Pending
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* User Distribution */}

            <div className="chart-card">

              <h2>User Distribution</h2>

              <div className="distribution-item">

                <div className="distribution-header">
                  <span>Doctors</span>
                  <span>{doctorPercent}%</span>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${doctorPercent}%` }}
                  ></div>
                </div>

              </div>

              <div className="distribution-item">

                <div className="distribution-header">
                  <span>Patients</span>
                  <span>{patientPercent}%</span>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill patient"
                    style={{ width: `${patientPercent}%` }}
                  ></div>
                </div>

              </div>

              <div className="distribution-summary">

                <p>
                  <strong>Total Users:</strong> {totalUsers}
                </p>

                <p>
                  Doctors: {doctorCount}
                </p>

                <p>
                  Patients: {patientCount}
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;