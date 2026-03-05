import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">

            <h2>Docmate</h2>

            <h1>
                Advanced Care Through <br />
                Intelligent <span>Innovation.</span>
            </h1>

            <p>
                Everything patients, doctors, and healthcare providers need — appointment booking, schedule management,<br></br>
                medical records, predictive insights, and administrative control — all in one<br></br>
                intelligent healthcare platform
            </p>

            <div className="btn-container">
                <button className="hero-btn">Get Started</button>
                <button className="hero-btn2">Explore now <i className="fas fa-arrow-right"></i></button>
            </div>

        </section>
    );
};

export default Hero;