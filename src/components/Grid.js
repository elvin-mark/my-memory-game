import React, { useState } from "react";
import Card from "./Card";
import "./Grid.css";

const Grid = ({ cards, updateCard }) => {
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card
          key={index}
          value={card.value}
          showBack={card.state}
          clickable={card.clickable}
          onClickCallback={() => {
            updateCard(index);
          }}
        />
      ))}
    </div>
  );
};

export default Grid;
