// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Start from "./Start/Start";
import Game from "./Game/Game";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import useResourceLoader from "../hooks/useResourceLoader";

function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  const {
    loadAllResources,
    loadingProgress,
    isLoading,
    loadingStatus,
    isComplete
  } = useResourceLoader();

  useEffect(() => {
    loadAllResources();
  }, [loadAllResources]);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return (
      <LoadingScreen
        progress={loadingProgress}
        status={loadingStatus}
        onComplete={handleLoadingComplete}
        isComplete={isComplete}
      />
    );
  }

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