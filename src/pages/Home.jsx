// src/pages/Home.jsx
import React, { useState } from "react";
import Start from "./Start/Start";
import Game from "./Game/Game";

function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  return (
    <>
      {!gameStarted ? (
        <Start onStart={handleStartGame} />
      ) : (
        <Game playerName={playerName} />
      )}
    </>
  );
}

export default Home;