import { useState } from "react";

const useHistory = (initialScene) => {
  const [history, setHistory] = useState([
    { scene: initialScene, interest: 0 },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addToHistory = (newScene, updatedInterest) => {
    const newHistory = [
      ...history.slice(0, historyIndex + 1),
      { scene: newScene, interest: updatedInterest },
    ];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1);
  };

  return {
    currentScene: history[historyIndex].scene,
    interest: history[historyIndex].interest,
    goBack,
    goForward,
    addToHistory,
  };
};

export default useHistory;
