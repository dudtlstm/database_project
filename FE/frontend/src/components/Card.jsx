import React from 'react';
import '../assets/css/Card.css';

const Card = ({ name, image, description, personId, onClick }) => {
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="card-content">
        <h2>{name}</h2>
        <p>{description}</p>
        <button onClick={onClick}>
          업적 보러 가기
        </button>
      </div>
    </div>
  );
};

export default Card;