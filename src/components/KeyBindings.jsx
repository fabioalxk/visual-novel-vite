import { useEffect } from "react";

const KeyBindings = ({ goBack, goForward }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") goBack();
      if (event.key === "ArrowRight") goForward();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goBack, goForward]);

  return null;
};

export default KeyBindings;
