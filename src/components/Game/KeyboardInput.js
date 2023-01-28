import React from "react";

const KeyboardInput = ({ keyList }) => {
  return (
    <div className="keyboard">
      {keyList.map(({ letter, status }) => (
        <span className={`cell ${status}`} key={letter}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default KeyboardInput;
