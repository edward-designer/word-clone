import React from "react";

const RestartBtn = ({ handleRestart }) => {
  return (
    <button className="restart" onClick={handleRestart} autoFocus>
      Restart
    </button>
  );
};

export default RestartBtn;
