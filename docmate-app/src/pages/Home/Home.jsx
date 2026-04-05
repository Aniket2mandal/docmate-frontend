import React from "react";
import "./NavbarLanding.css"
import Hero from "../../components/Hero/Hero";


const Home = () => {
  return (
   
    <>
     <nav className="navbar-landing">
      <h2 className="logo">Docmate</h2>

      <div className="nav-buttons">
        <a className="login-btn" href="/login">Login</a>
        {/* <button className="login-btn"><a href="/login">Login</a></button> */}
        <a className="start-btn" href="/register">Get Started</a>
      </div>
    </nav>
      <Hero />
    
    </>
  );
};

export default Home;