import React from "react";
import "./Enroll.css";

const Enroll = () => {
  return (
    <section className="enroll">
      <div className="enroll-box">
        <h2 className="enroll-title">
          Elevate Your Healthcare Experience
        </h2>

        <p className="enroll-sub">
          Access top doctors, manage your medical records, and never miss an
          appointment — all in one platform.
        </p>

        <a className="enroll-btn" href="/register">
          Get Started Free <span>&gt;</span>
        </a>
      </div>
    </section>
  );
};

export default Enroll;