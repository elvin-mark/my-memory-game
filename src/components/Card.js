import React, { useState } from "react";
import "./Card.css";

const Card = ({ value, showBack, onClickCallback, clickable }) => {
  const handleClick = () => {
    if (clickable) {
      onClickCallback();
    }
  };

  return (
    <div
      className={`card ${showBack ? "show-back" : ""}`}
      onClick={handleClick}
    >
      {showBack ? (
        <div className={`card-back`} />
      ) : (
        <div className={`card-front`}>
          <img
            src={`https://img.pokemondb.net/artwork/large/${value}.jpg`}
          ></img>
        </div>
      )}
    </div>
  );
};

export default Card;
