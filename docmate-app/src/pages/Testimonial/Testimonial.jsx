import React from "react";
import "./Testimonial.css";
import ClientCard from "../../components/ClientCard/ClientCard";

import client1 from "../../assets/client1.jpg";
import client2 from "../../assets/client2.jpg";
import client3 from "../../assets/client3.jpg";

const clients = [
  {
    id: 1,
    image: client1,
    name: "Sarah Khan",
    review:
      "Docmate made booking appointments so easy. I could quickly find the right doctor and manage everything without any hassle.",
  },
  {
    id: 2,
    image: client2,
    name: "David Smith",
    review:
      "I really liked how my medical details stayed organized in one place. The reminders also helped me never miss my medication.",
  },
  {
    id: 3,
    image: client3,
    name: "Aarav Sharma",
    review:
      "The platform feels simple, modern, and very helpful. It saved my time and made the whole healthcare process smoother.",
  },
];

const Testimonial = () => {
  return (
    <section className="testimonial">
      <div className="testimonial__container">
        <h2 className="testimonial__title">What Our Client Says</h2>

        <div className="testimonial__cards">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              image={client.image}
              name={client.name}
              review={client.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;