import React from "react";

const Won = ({ tries, children }) => {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{`${tries} ${tries === 1 ? "guess" : "guesses"}`}</strong>.
        {children}
      </p>
    </div>
  );
};

export default Won;
