import React from "react";
import "./NavbarLanding.css"
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
   
    <>
     <nav className="navbar">
      <h2 className="logo">Docmate</h2>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="start-btn">Get Started</button>
      </div>
    </nav>
      <Hero />
    </>
  );
};

export default Home;