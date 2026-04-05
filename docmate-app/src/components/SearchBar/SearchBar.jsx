import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <select className="search-select" defaultValue="">
        <option value="" disabled>Province</option>
        <option value="Koshi Province">Koshi Province</option>
        <option value="Madhesh Province">Madhesh Province</option>
        <option value="Bagmati Province">Bagmati Province</option>
        <option value="Gandaki Province">Gandaki Province</option>
        <option value="Lumbini Province">Lumbini Province</option>
        <option value="Karnali Province">Karnali Province</option>
        <option value="Sudurpashchim Province">Sudurpashchim Province</option>
      </select>

      <select className="search-select" defaultValue="">
        <option value="" disabled>District</option>
        <option value="Kathmandu">Kathmandu</option>
        <option value="Lalitpur">Lalitpur</option>
        <option value="Bhaktapur">Bhaktapur</option>
        <option value="Pokhara">Pokhara</option>
        <option value="Chitwan">Chitwan</option>
        <option value="Butwal">Butwal</option>
        <option value="Dharan">Dharan</option>
        <option value="Biratnagar">Biratnagar</option>
        <option value="Birgunj">Birgunj</option>
        <option value="Nepalgunj">Nepalgunj</option>
        <option value="Dhangadhi">Dhangadhi</option>
        <option value="Hetauda">Hetauda</option>
      </select>

      <select className="search-select" defaultValue="">
        <option value="" disabled>Specialization</option>
        <option value="General Physician">General Physician</option>
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

      <button className="search-btn">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;