import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MedicineReports.css";
import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import { getMedicineReports } from "../../../api/BackendApi";

const MedicineReports = () => {
  const patientId = localStorage.getItem("patientId"); // Change if stored elsewhere

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageNo, setPageNo] = useState(0);
  const [pageSize] = useState(5);

  const [paginationInfo, setPaginationInfo] = useState(null);
  const [totalMedicines, setTotalMedicines] = useState(0);

  useEffect(() => {
    fetchMedicines(pageNo);
  }, [pageNo]);

  const fetchMedicines = async (currentPage) => {
    try {
      setLoading(true);

      const response = await getMedicineReports(
        patientId,
        currentPage,
        pageSize
      );

      if (response.data.status) {
        const result = response.data.data;

        setMedicines(result.data);
        setPaginationInfo(result.paginationInfo);
        setTotalMedicines(result.paginationInfo.total);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  // Active medicines on current page
  const activeMedicines = medicines.filter(
    (medicine) => medicine.status === "ACTIVE"
  ).length;

  return (
    <div className="dashboard-medicine-page">
      <SideBar />

      <div className="dashboard-medicine-main">
        <Navbar />

        <div className="dashboard-medicine-content">
          {/* Header */}
          <div className="medicine-header">
            <h1>Medicine Reports</h1>
            <p>Check your prescriptions</p>
          </div>

          {/* Summary */}
          <div className="medicine-summary">
            <div className="summary-card summary-blue">
              <h3>Total Medicines</h3>
              <span>{totalMedicines}</span>
            </div>

            <div className="summary-card summary-green">
              <h3>Active</h3>
              <span>{activeMedicines}</span>
            </div>
          </div>

          {/* Medicine List */}
          <div className="medicine-list-card">
            <h2>Recent Medicines</h2>

            {loading ? (
              <p>Loading...</p>
            ) : medicines.length === 0 ? (
              <p>No medicines found.</p>
            ) : (
              <>
                <div className="medicine-list">
                  {medicines.map((med, index) => (
                    <div
                      key={index}
                      className={`medicine-item ${
                        med.status === "ACTIVE"
                          ? "record-blue"
                          : "record-pink"
                      }`}
                    >
                      <div>
                        <h3>{med.medicineName}</h3>

                        <p>
                          <strong>Dosage:</strong> {med.dosage}
                        </p>

                        <p>
                          <strong>Frequency:</strong>{" "}
                          {med.frequency.replaceAll("_", " ")}
                        </p>

                        <p>
                          <strong>Time Schedule:</strong> {med.timeSchedule}
                        </p>

                        <p>
                          <strong>Instruction:</strong> {med.instruction}
                        </p>
                      </div>

                      <span
                        className={`status-badge ${
                          med.status === "ACTIVE"
                            ? "active"
                            : "completed"
                        }`}
                      >
                        {med.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {paginationInfo && paginationInfo.totalPages > 1 && (
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineReports;