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

        <button className="enroll-btn">
          Get Started Free <span>&gt;</span>
        </button>
      </div>
    </section>
  );
};

export default Enroll;