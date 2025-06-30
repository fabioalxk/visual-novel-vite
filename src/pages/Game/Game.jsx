// src/pages/Game/Game.jsx
import React, { useState } from "react";
import scenes from "./scenes";
import DebugPanel from "../../components/DebugPanel";
import KeyBindings from "../../components/KeyBindings";
import "./Game.scss";
import "./debug.scss";

function Game() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [debug, setDebug] = useState(false);

  const goNext = () => {
    if (currentIndex < scenes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDialogueIndex(0);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDialogueIndex(0);
    }
  };

  const handleNextDialogue = () => {
    const currentScene = scenes[currentIndex];
    if (currentScene.dialogues.length > 0 && dialogueIndex < currentScene.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handleChoice = (option) => {
    /* MODIFICADO: Mantido para compatibilidade futura com escolhas */
  };

  const currentScene = scenes[currentIndex];

  return (
    <div className="game" onClick={handleNextDialogue}>
      <div className="navigation-arrows">
        <button
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className="nav-arrow left"
        >
          ←
        </button>
        <span className="scene-counter">
          {currentIndex + 1} / {scenes.length}
        </span>
        <button
          onClick={goNext}
          disabled={currentIndex === scenes.length - 1}
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

      <KeyBindings goBack={goPrevious} goForward={goNext} />
    </div>
  );
}

const Scene = ({ currentScene, dialogueIndex, handleChoice }) => {
  const hasDialogues = currentScene.dialogues && currentScene.dialogues.length > 0;
  const currentDialogue = hasDialogues ? currentScene.dialogues[dialogueIndex] : null;
  const showOptions = hasDialogues && dialogueIndex === currentScene.dialogues.length - 1 && currentScene.options.length > 0;

  return (
    <>
      <img
        src={currentScene.media}
        alt={`Scene ${currentScene.id}`}
        className="scene-image"
      />

      {currentDialogue && (
        <div className="scene-text">
          {console.log("heyy", currentDialogue.text)}
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