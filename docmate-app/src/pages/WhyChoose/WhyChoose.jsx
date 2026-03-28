import React from "react";
import "./WhyChoose.css";
import doctorImg from "../../assets/doctorwhychoose.jpg";

const whyData = [
  {
    id: 1,
    title: "Convenient Online Appointments",
    text: "Docmate makes healthcare simple by allowing you to book appointments online anytime, anywhere. You can easily view doctor schedules in real time and choose the slot that works best for you — no waiting in long queues.",
    image: doctorImg,
    imageAlt: "Doctors discussion",
    layout: "text-left-image-right",
  },
  {
    id: 2,
    title: "Smart Profile & Medical Record Management",
    text: "Manage your personal profile and securely track your medical records all in one place. Docmate keeps your health history well-organized, allowing you to store prescriptions, diagnoses, and past visit details safely. With easy access anytime you need it, you can share accurate information with doctors, quickly and make more informed healthcare decisions.",
    image: doctorImg,
    imageAlt: "Doctor checking patient",
    layout: "image-left-text-right",
  },
  {
    id: 3,
    title: "Stay Updated & Never Miss Medication",
    text: "With built-in schedule tracking and smart medicine reminders, Docmate helps you stay on top of your treatment plan without missing important appointments or doses. Get timely notifications, monitor your progress, and maintain a consistent healthcare routine — ensuring better health management, improved recovery, and complete peace of mind.",
    image: doctorImg,
    imageAlt: "Hospital care team",
    layout: "text-left-image-right",
  },
];

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="why-choose__wrapper">
        <h2 className="why-choose__title">Why Choose Docmate</h2>
        <p className="why-choose__subtitle">
          Online appointment, Profile handling, track medical records, view doctor
          schedule, medicine remainder
        </p>

        <div className="why-choose__layout">
          {whyData.map((item) => (
            <div
              key={item.id}
              className={`why-row ${item.layout} row-${item.id}`}
            >
              {item.layout === "text-left-image-right" ? (
                <>
                  <div className="why-text-block">
                    <div className="why-number-card">{item.id}</div>

                    <div className="why-copy">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>

                  <div className="why-image-block">
                    <img src={item.image} alt={item.imageAlt} />
                  </div>
                </>
              ) : (
                <>
                  <div className="why-image-block">
                    <img src={item.image} alt={item.imageAlt} />
                  </div>

                  <div className="why-text-block">
                    <div className="why-number-card">{item.id}</div>

                    <div className="why-copy">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;