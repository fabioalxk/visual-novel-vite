import React, { useState, useEffect } from "react";
import scenes from "./scenes";
import DebugPanel from "../../components/DebugPanel";
import KeyBindings from "../../components/KeyBindings";
import useHistory from "../../components/History";
import "./Game.scss";
import "./debug.scss";

function Game() {
  const { currentScene, interest, goBack, goForward, addToHistory } =
    useHistory(scenes[0]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [debug, setDebug] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleChoice = (option) => {
    const updatedInterest = interest + (option.effect?.interest || 0);
    const nextSceneId = currentScene.getNextScene(option, updatedInterest);
    const nextScene = scenes.find((scene) => scene.id === nextSceneId);

    if (!nextScene) {
      setIsGameOver(true);
    } else {
      addToHistory(nextScene, updatedInterest);
      setDialogueIndex(0);
    }
  };

  const handleNextDialogue = () => {
    if (dialogueIndex < currentScene.dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") goBack();
      if (event.key === "ArrowRight") goForward();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goBack, goForward]);

  console.log("game");
  return (
    <div className="game" onClick={handleNextDialogue}>
      {isGameOver ? (
        <img src="/assets/end.jpg" alt="End" className="scene-image" />
      ) : (
        <Scene
          currentScene={currentScene}
          dialogueIndex={dialogueIndex}
          handleChoice={handleChoice}
        />
      )}
      <KeyBindings goBack={goBack} goForward={goForward} />
      {debug && <DebugPanel currentScene={currentScene} interest={interest} />}
      <button
        onClick={() => setDebug((prev) => !prev)}
        className="toggle-debug-btn"
      >
        Toggle Debug
      </button>
    </div>
  );
}

const Scene = ({ currentScene, dialogueIndex, handleChoice }) => {
  const currentDialogue = currentScene.dialogues[dialogueIndex];
  const showOptions = dialogueIndex === currentScene.dialogues.length - 1;

  return (
    <>
      <img
        src={currentScene.media}
        alt="Current scene"
        className="scene-image"
      />
      <p className="scene-text">
        <strong>{currentDialogue.character}:</strong> {currentDialogue.text}
      </p>
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
