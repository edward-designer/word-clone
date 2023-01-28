import React from "react";

import { checkGuess } from "../../game-helpers";
import { KEYLIST } from "../../constants";

import InputForm from "./InputForm";
import GuessResults from "./GuessResults";
import Won from "./Won";
import Lost from "./Lost";
import RestartBtn from "./RestartBtn";
import KeyboardInput from "./KeyboardInput";

function Game({ answer, handleRestart }) {
  const [guesses, setGuesses] = React.useState([]);

  const latestGuess = guesses.at(-1) || "";
  const hasWon = latestGuess.guessWord === answer;
  const hasLost = guesses.length === 6 && !hasWon;

  const handleGuesses = (guess) => {
    const newGuessObject = {
      id: crypto.randomUUID(),
      guessLetters: checkGuess(guess, answer),
      guessWord: guess,
    };
    setGuesses([...guesses, newGuessObject]);
  };

  const previousGuessedKeys = guesses.reduce(
    (acc, { guessLetters }) => {
      const correctKeystoAdd = [];
      const misplacedKeystoAdd = [];
      const incorrectKeystoAdd = [];
      guessLetters.forEach((letterObj) => {
        if (letterObj.status === "correct") {
          correctKeystoAdd.push(letterObj);
        }
        if (letterObj.status === "misplaced") {
          misplacedKeystoAdd.push(letterObj);
        }
        if (letterObj.status === "incorrect") {
          incorrectKeystoAdd.push(letterObj);
        }
      });
      return {
        correctKeys: [...acc.correctKeys, ...correctKeystoAdd],
        misplacedKeys: [...acc.misplacedKeys, ...misplacedKeystoAdd],
        incorrectKeys: [...acc.incorrectKeys, ...incorrectKeystoAdd],
      };
    },
    { correctKeys: [], misplacedKeys: [], incorrectKeys: [] }
  );
  // order is important here because we need to show correct keys > misplaced keys > incorrect keys
  const allGuessedKeysObjArr = [
    ...previousGuessedKeys.incorrectKeys,
    ...previousGuessedKeys.misplacedKeys,
    ...previousGuessedKeys.correctKeys,
  ];
  const keyListWithStatus = KEYLIST.map((keyObj) => {
    const matchedKeyObj = allGuessedKeysObjArr
      .filter((letterObj) => letterObj.letter === keyObj.letter)
      .at(-1);
    if (matchedKeyObj) return matchedKeyObj;
    return keyObj;
  });

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <InputForm
        guesses={guesses}
        handleGuesses={handleGuesses}
        finished={hasWon || hasLost}
      />
      <KeyboardInput keyList={keyListWithStatus} />
      {hasWon && (
        <Won tries={guesses.length}>
          <RestartBtn handleRestart={handleRestart} />
        </Won>
      )}
      {hasLost && (
        <Lost answer={answer}>
          <RestartBtn handleRestart={handleRestart} />
        </Lost>
      )}
    </>
  );
}

export default Game;
