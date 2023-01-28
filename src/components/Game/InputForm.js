import React from "react";

const InputForm = ({ guesses, handleGuesses, finished }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const handleInput = (e) => {
    let guessInputUpperCase = e.target.value.toUpperCase();
    if (guessInputUpperCase.length > 5)
      guessInputUpperCase = guessInputUpperCase.substring(
        guessInputUpperCase.length - 5
      );
    setCurrentGuess(guessInputUpperCase);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGuesses(currentGuess);
    setCurrentGuess("");
  };
  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        name="guess-input"
        type="text"
        size={5}
        value={currentGuess}
        pattern="[A-Za-z]{5,5}"
        onChange={handleInput}
        disabled={finished}
        title="Please enter exactly five alphabets"
        required
        autoFocus
        autoComplete="off"
      />
    </form>
  );
};

export default InputForm;
