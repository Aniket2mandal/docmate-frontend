import React, { useState } from "react";
import "./SearchBar.css";
import { searchDoctorApi } from "../../api/BackendApi";

const SearchBar = ({ setDoctors, setPageInfo, onSearch }) => {

  const [province, setProvince] = useState("");
  const [specialization, setSpecialization] = useState("");

  const searchDoctors = async () => {
    try {

      if (onSearch) {
        await onSearch(province, specialization);
        return;
      }

      const response = await searchDoctorApi({
        province,
        specialization,
      });

      setDoctors(response.data.data.data);
      setPageInfo(response.data.data.paginationInfo);

    } catch (error) {
      console.error("Error searching doctors:", error);
    }
  };

  return (
    <div className="search-bar">

      <select
        className="search-select"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
      >
        <option value="">Province</option>
        <option value="Koshi">Koshi Province</option>
        <option value="Madhesh">Madhesh Province</option>
        <option value="Bagmati">Bagmati Province</option>
        <option value="Gandaki">Gandaki Province</option>
        <option value="Lumbini">Lumbini Province</option>
        <option value="Karnali">Karnali Province</option>
        <option value="Sudurpashchim">Sudurpashchim Province</option>
      </select>

      <select
        className="search-select"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      >
        <option value="">Specialization</option>
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

      <button
        className="search-btn"
        onClick={searchDoctors}
      >
        <i className="fas fa-search"></i>
      </button>

    </div>
  );
};

export default SearchBar;