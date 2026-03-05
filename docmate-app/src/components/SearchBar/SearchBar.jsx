import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
    return (
        <div className="search-bar">

            {/* <input type="text" placeholder="State" /> */}
            <select className="search-select">
                <option value="" disabled selected>Province</option>
                <option>Koshi Province</option>
                <option>Madhesh Province</option>
                <option>Bagmati Province</option>
                <option>Gandaki Province</option>
                <option>Lumbini Province</option>
                <option>Karnali Province</option>
                <option>Sudurpashchim Province</option>
            </select>
            {/* <input type="text" placeholder="District" /> */}

            <select className="search-select">
                <option value="" disabled selected>District</option>
                <option>Kathmandu</option>
                <option>Lalitpur</option>
                <option>Bhaktapur</option>
                <option>Pokhara</option>
                <option>Chitwan</option>
                <option>Butwal</option>
                <option>Dharan</option>
                <option>Biratnagar</option>
                <option>Birgunj</option>
                <option>Nepalgunj</option>
                <option>Dhangadhi</option>
                <option>Hetauda</option>
            </select>
            {/* <input type="text" placeholder="Specialization" /> */}

            <select className="search-select">
                <option value="" disabled selected>Specialization</option>
                <option>General Physician</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>Neurologist</option>
                <option>Orthopedic</option>
                <option>Pediatrician</option>
                <option>Gynecologist</option>
                <option>Psychiatrist</option>
                <option>ENT Specialist</option>
                <option>Dentist</option>
                <option>Ophthalmologist</option>
            </select>

            <button className="search-btn"><i className="fas fa-search"></i></button>

        </div>
    );
};

export default SearchBar;