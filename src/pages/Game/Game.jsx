// src/pages/Game/Game.jsx
import React, { useState, useRef, useEffect } from "react";
import scenes from "./scenes";
import DebugPanel from "../../components/DebugPanel";
import KeyBindings from "../../components/KeyBindings";
import Chat from "../../components/Chat/Chat";
import ResultScreen from "../../components/ResultScreen/ResultScreen";
import { CHAT_SCENE_ID } from "../../utils/constants";
import "./Game.scss";
import "./debug.scss";

function Game({ playerName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [debug, setDebug] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [chatResult, setChatResult] = useState(null);
  const audioRef = useRef(null);
  const currentMusicRef = useRef(null);

  useEffect(() => {
    const currentScene = scenes[currentIndex];
    const newMusic = currentScene.music;

    if (newMusic && newMusic !== currentMusicRef.current) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(newMusic);
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(console.error);

      audioRef.current = audio;
      currentMusicRef.current = newMusic;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const goNext = () => {
    const currentScene = scenes[currentIndex];
    const hasDialogues = currentScene.dialogues && currentScene.dialogues.length > 0;

    if (hasDialogues && dialogueIndex < currentScene.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else if (currentIndex < scenes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDialogueIndex(0);
    }
  };

  const goPrevious = () => {
    if (dialogueIndex > 0) {
      setDialogueIndex(dialogueIndex - 1);
    } else if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      const previousScene = scenes[newIndex];
      const previousDialogues = previousScene.dialogues || [];
      setDialogueIndex(Math.max(0, previousDialogues.length - 1));
    }
  };

  const handleNextDialogue = () => {
    goNext();
  };

  const handleChoice = (option) => {

  };

  const handleChatSceneChange = (result) => {
    setChatResult({
      outcome: result.sceneChange,
      score: result.score,
      reason: result.reason
    });
    setShowResult(true);
  };

  const handleRestart = () => {
    setShowResult(false);
    setChatResult(null);
    setCurrentIndex(0);
    setDialogueIndex(0);
  };

  if (showResult && chatResult) {
    return (
      <ResultScreen
        result={chatResult}
        onRestart={handleRestart}
      />
    );
  }

  const currentScene = scenes[currentIndex];
  const hasDialogues = currentScene.dialogues && currentScene.dialogues.length > 0;
  const isLastDialogue = !hasDialogues || dialogueIndex >= currentScene.dialogues.length - 1;

  const shouldDisableScreenClick = currentScene.isChat || !isLastDialogue;

  return (
    <div
      className={`game ${shouldDisableScreenClick ? 'chat-active' : ''}`}
      onClick={shouldDisableScreenClick ? undefined : handleNextDialogue}
    >
      <div className="navigation-arrows">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrevious();
          }}
          disabled={currentIndex === 0 && dialogueIndex === 0}
          className="nav-arrow left"
        >
          ←
        </button>
        <span className="scene-counter">
          {currentIndex + 1} / {scenes.length}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          disabled={
            currentScene.isChat ||
            (currentIndex === scenes.length - 1 &&
              (!currentScene.dialogues || dialogueIndex >= currentScene.dialogues.length - 1))
          }
          className="nav-arrow right"
        >
          →
        </button>
      </div>

      <Scene
        currentScene={currentScene}
        dialogueIndex={dialogueIndex}
        handleChoice={handleChoice}
      />

      {currentScene.isChat && <Chat onSceneChange={handleChatSceneChange} />}

      {!currentScene.isChat && <KeyBindings goBack={goPrevious} goForward={goNext} />}
    </div>
  );
}

const Scene = ({ currentScene, dialogueIndex, handleChoice }) => {
  const hasDialogues = currentScene.dialogues && currentScene.dialogues.length > 0;
  const currentDialogue = hasDialogues ? currentScene.dialogues[dialogueIndex] : null;
  const showOptions = hasDialogues && dialogueIndex === currentScene.dialogues.length - 1 && currentScene.options.length > 0;

  const isVideo = currentScene.media.endsWith('.mp4');

  return (
    <>
      {isVideo ? (
        <video
          src={currentScene.media}
          className="scene-image"
          autoPlay
          muted
          loop
        />
      ) : (
        <img
          src={currentScene.media}
          alt={`Scene ${currentScene.id}`}
          className="scene-image"
        />
      )}

      {currentDialogue && (
        <div className="scene-text">
          <strong>{currentDialogue.character}:</strong> {currentDialogue.text}
        </div>
      )}

      {showOptions && (
        <div className="options">
          {currentScene.options.map((option, index) => (
            <button key={index} onClick={() => handleChoice(option)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Game;