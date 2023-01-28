// current implementation broken as multiple same letters are given the same status

export function checkGuess(guess, answer) {
  if (!guess) {
    return null;
  }
  const checkedGuessArr = [];
  const answerCharCounts = parseAnswerToCharCounts(answer);

  const guessChars = guess.toUpperCase().split("");
  const answerChars = answer.split("");

  // correct char and position
  guessChars.forEach((guessChar, index) => {
    const answerChar = answerChars[index];
    if (guessChar === answerChar) {
      answerCharCounts.set(guessChar, answerCharCounts.get(guessChar) - 1);
      checkedGuessArr.push({
        letter: guessChar,
        status: "correct",
      });
    } else {
      checkedGuessArr.push(guessChar);
    }
  });

  // correct char but displaced
  checkedGuessArr.forEach((guessChar, index) => {
    if (typeof guessChar !== "string") return;
    if (answer.includes(guessChar) && answerCharCounts.get(guessChar) !== 0) {
      answerCharCounts.set(guessChar, answerCharCounts.get(guessChar) - 1);
      checkedGuessArr[index] = {
        letter: guessChar,
        status: "misplaced",
      };
    } else {
      checkedGuessArr[index] = {
        letter: guessChar,
        status: "incorrect",
      };
    }
  });

  return checkedGuessArr;
}

function parseAnswerToCharCounts(answer) {
  const result = new Map();
  [...answer].forEach((char) => {
    if (result.has(char)) {
      result.set(char, result.get(char) + 1);
    } else {
      result.set(char, 1);
    }
  });
  return result;
}
