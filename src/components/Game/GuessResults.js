import React from "react";

import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";

import Guess from "./Guess";

const GuessResults = ({ guesses }) => {
  const guessesCount = guesses.length;

  const fillEmptyRows = () =>
    range(0, NUM_OF_GUESSES_ALLOWED - guessesCount).map((row) => ({
      id: crypto.randomUUID(),
      guessLetters: new Array(5).fill(""),
    }));

  const guessToShow =
    guessesCount > NUM_OF_GUESSES_ALLOWED
      ? guesses.slice(-NUM_OF_GUESSES_ALLOWED)
      : guesses.concat(fillEmptyRows());

  return (
    <div className="guess-results">
      {guessToShow.map(({ id, guessLetters }) => (
        <Guess key={id} guessArr={guessLetters} />
      ))}
    </div>
  );
};

export default GuessResults;
