import React from "react";

import Game from "../Game";
import Header from "../Header";

import { sample } from "../../utils";
import { WORDS } from "../../data";

function App() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  console.log(answer);
  const handleRestart = () => setAnswer(sample(WORDS));

  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <Game
          key={crypto.randomUUID()}
          answer={answer}
          handleRestart={handleRestart}
        />
      </div>
    </div>
  );
}

export default App;
