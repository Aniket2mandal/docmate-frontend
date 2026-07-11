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
                {/* <button className="hero-btn">Get Started</button> */}
                   <a className="hero-btn"href="/register">Get Started</a>
                <a className="hero-btn2" href="/doctor-request">Join As Doctor <i className="fas fa-arrow-right"></i></a>
            </div>

        </section>
    );
};

export default Hero;