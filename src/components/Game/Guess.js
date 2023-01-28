import React from "react";

const Guess = ({ guessArr }) => {
  return (
    <p className="guess">
      {guessArr.map(({ letter, status }, index) => (
        <span className={`cell ${status}`} key={index}>
          {letter}
        </span>
      ))}
    </p>
  );
};

export default Guess;
