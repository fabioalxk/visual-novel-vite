import React from "react";

const DebugPanel = ({ currentScene, interest }) => {
  return (
    <div className="debug-panel">
      <h3>Debug Info</h3>
      <p>
        <strong>Current Scene ID:</strong> {currentScene.id}
      </p>
      <p>
        <strong>Current Scene Text:</strong> {currentScene.text}
      </p>
      <p>
        <strong>Current Interest:</strong> {interest}
      </p>
      <h4>Options</h4>
      <ul>
        {currentScene.options.map((option, index) => (
          <li key={index}>
            <p>
              <strong>Option:</strong> {option.text}
            </p>
            <p>
              <strong>Next Scene:</strong> {option.nextScene}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebugPanel;
