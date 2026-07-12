import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaRobot,
  FaSearch,
  FaRedoAlt,
  FaChevronLeft,
  FaChevronRight, 
} from "react-icons/fa";

import SideBar from "../../../components/SideBar/SideBar";
import Navbar from "../../../components/Navbar/Navbar";
import SearchBar from "../../../components/SearchBar/SearchBar";
import BookAppointmentModal from "../../../components/BookModal/BookAppointmentModal";

import {
  getAllDoctors,
  recommendDoctorsBySymptoms,
  searchDoctorApi,
} from "../../../api/BackendApi";

import doctorImg from "../../../assets/doctor.png";
import "./Doctor.css";

const Doctor = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const PAGE_SIZE = 3;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageNo, setPageNo] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [province, setProvince] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [symptoms, setSymptoms] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiResultMode, setAiResultMode] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [hasMoreDoctors, setHasMoreDoctors] = useState(false);

  useEffect(() => {
    fetchAllDoctors(0, true);
  }, []);

  const fetchAllDoctors = async (page = 0) => {
    try {
      setLoading(true);

      setAiMessage("");
      setAiResultMode(false);

      const response = await getAllDoctors(page, PAGE_SIZE);

      setDoctors(response.data.data.data);
      setPaginationInfo(response.data.data.paginationInfo);
      setPageNo(page);

    } catch (error) {
      console.error(error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // const handleLoadMoreDoctors = () => {
  //   const nextPage = pageNo + 1;
  //   fetchAllDoctors(nextPage, false);
  // };

  const handleAiRecommendation = async () => {
    if (!symptoms.trim()) {
      setAiMessage("Please enter your symptoms first.");
      return;
    }

    try {
      setAiLoading(true);
      setAiMessage("");
      setAiResultMode(true);
      setHasMoreDoctors(false);

      const response = await recommendDoctorsBySymptoms(symptoms);

      const data = response?.data?.data;

      const recommendedDoctors = response?.data?.data || [];

      setDoctors(recommendedDoctors);

      if (recommendedDoctors.length === 0) {
        setAiMessage("No doctors found based on these symptoms.");
      } else {
        setAiMessage("AI recommended doctors based on your symptoms.");
      }
    } catch (error) {
      console.error("Error recommending doctors:", error);
      setAiMessage("Something went wrong while recommending doctors.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleResetDoctors = () => {
    setSymptoms("");
    setAiMessage("");
    setAiResultMode(false);

    setSearchMode(false);
    setProvince("");
    setSpecialization("");

    fetchAllDoctors(0);
  };

  const getFullName = (doctor) => {
    const firstName = doctor?.user?.firstName || "";
    const lastName = doctor?.user?.lastName || "";

    return `${firstName} ${lastName}`.trim();
  };

  const handleExploreNow = (doctorId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/doctor-detail/${doctorId}`);
  };

  const handleBookNow = (doctor) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handlePageChange = async (page) => {

    if (searchMode) {

      try {
        setLoading(true);

        const response = await searchDoctorApi(
          {
            province,
            specialization,
          },
          page,
          PAGE_SIZE
        );

        setDoctors(response.data.data.data);
        setPaginationInfo(response.data.data.paginationInfo);
        setPageNo(page);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    } else {
      fetchAllDoctors(page);
    }
  };

  const handleDoctorSearch = async (province, specialization) => {
    try {
      setLoading(true);

      setSearchMode(true);
      setProvince(province);
      setSpecialization(specialization);

      const response = await searchDoctorApi(
        {
          province,
          specialization,
        },
        0,
        PAGE_SIZE
      );

      setDoctors(response.data.data.data);
      setPaginationInfo(response.data.data.paginationInfo);
      setPageNo(0);

    } catch (error) {
      console.error(error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-pro-page">
      <SideBar />

      <div className="doctor-pro-main">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="doctor-pro-content">
          <div className="doctor-pro-page-title">
            <h2>Find Doctors</h2>
            <p>
              Search doctors manually or use AI recommendation based on symptoms.
            </p>
          </div>

          <div className="doctor-pro-search-box">
            <SearchBar onSearch={handleDoctorSearch} />
          </div>

          <div className="doctor-ai-section">
            <div className="doctor-ai-left">
              <div className="doctor-ai-icon">
                <FaRobot />
              </div>

              <div>
                <h3>AI Doctor Recommendation</h3>
                <p>
                  Describe your symptoms and the system will recommend suitable
                  doctors for you.
                </p>
              </div>
            </div>

            <div className="doctor-ai-input-area">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: I have chest pain, shortness of breath and dizziness..."
              />

              <div className="doctor-ai-actions">
                <button
                  type="button"
                  className="doctor-ai-recommend-btn"
                  onClick={handleAiRecommendation}
                  disabled={aiLoading}
                >
                  <FaSearch />
                  {aiLoading ? "Checking..." : "Recommend Doctors"}
                </button>

                <button
                  type="button"
                  className="doctor-ai-reset-btn"
                  onClick={handleResetDoctors}
                >
                  <FaRedoAlt />
                  Reset
                </button>
              </div>

              {aiMessage && <p className="doctor-ai-message">{aiMessage}</p>}
            </div>
          </div>

          <div className="doctor-pro-list-section">
            <div className="doctor-pro-list-header">
              <div>
                <h3>
                  {aiResultMode ? "Recommended Doctors" : "Available Doctors"}
                </h3>

                <p>
                  {aiResultMode
                    ? "Doctors recommended based on your symptoms."
                    : "Explore doctor details or book your appointment."}
                </p>
              </div>

              <span>{doctors.length} doctors found</span>
            </div>

            {loading ? (
              <div className="doctor-pro-status-box">
                <p>Loading doctors...</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="doctor-pro-status-box">
                <p>No doctors found.</p>
              </div>
            ) : (
              <>
                <div className="doctor-pro-grid">
                  {doctors.map((doctor) => {
                    const fullName = getFullName(doctor);

                    const doctorImage = doctor?.user?.imageUrl
                      ? doctor.user.imageUrl
                      : doctorImg;

                    return (
                      <div
                        className="doctor-pro-card"
                        key={doctor?.doctorId || doctor?.user?.id}
                      >
                        <div className="doctor-pro-image-box">
                          <img
                            src={doctorImage}
                            alt={fullName || "Doctor"}
                            className="doctor-pro-image"
                          />
                        </div>

                        <div className="doctor-pro-card-body">
                          <h4>{fullName || "Doctor"}</h4>

                          <p className="doctor-specialization">
                            {doctor?.specialization || "Specialist"}
                          </p>

                          <div className="doctor-card-info">
                            <div className="doctor-rating">
                              ⭐ {doctor?.rating?.toFixed(1) ?? "0.0"}
                              {/* <span> ({doctor?.ratingCount || 0})</span> */}
                            </div>

                            <div className="doctor-fee">
                              Rs. {doctor?.consultation_fee || "0"}
                            </div>
                          </div>
                        </div>

                        <div className="doctor-pro-action-row">
                          <button
                            type="button"
                            className="doctor-pro-explore-btn"
                            onClick={() => handleExploreNow(doctor?.doctorId)}
                          >
                            Explore now <FaArrowRight />
                          </button>

                          <button
                            type="button"
                            className="doctor-pro-book-btn"
                            onClick={() => handleBookNow(doctor)}
                          >
                            Book now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* {!aiResultMode && hasMoreDoctors && (
                  <div className="doctor-load-more-area">
                    <button
                      type="button"
                      className="doctor-load-more-btn"
                      onClick={handleLoadMoreDoctors}
                      disabled={loadingMore}
                    >
                      {loadingMore ? "Loading..." : "Load More Doctors"}
                    </button>
                  </div>
                )} */}

                {!aiResultMode && paginationInfo && (
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

              </>
            )}
          </div>
        </div>
      </div>

      {selectedDoctor && (
        <BookAppointmentModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedDoctor(null);
          }}
          doctorId={selectedDoctor?.doctorId}
          doctorName={`Dr. ${getFullName(selectedDoctor)}`}
        />
      )}
    </div>
  );
};

export default Doctor;