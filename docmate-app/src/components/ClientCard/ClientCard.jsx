import React from "react";
import "./ClientCard.css";

const ClientCard = ({ image, name, review }) => {
  return (
    <div className="client-card">
      <div className="client-card__image-wrap">
        <img src={image} alt={name} className="client-card__image" />
      </div>

      <h3 className="client-card__name">{name}</h3>

      <p className="client-card__review">"{review}"</p>
    </div>
  );
};

export default ClientCard;