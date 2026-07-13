import React from "react";
import "./NavbarLanding.css"
import Hero from "../../components/Hero/Hero";
import {Link } from "react-router-dom";


const Home = () => {
  return (
   
    <>
     <nav className="navbar-landing">
      <h2 className="logo">Docmate</h2>

      <div className="nav-buttons">
        <Link to="/login" className="login-btn" >Login</Link>
        {/* <button className="login-btn"><a href="/login">Login</a></button> */}
        <Link to="/register" className="start-btn" >Get Started</Link>
      </div>
    </nav>
      <Hero />
    
    </>
  );
};

export default Home;