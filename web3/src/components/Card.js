import React from "react";
import "./Card.css";
function Card(props) {
  return (
    <div className="card">
      <img src={props.img} />
      <div className="info">
        <h1>{props.name}</h1>
        <p className="desc">{props.desc}</p>
        <button type="button">{props.button}</button>
      </div>
    </div>
  );
}

export default Card;
