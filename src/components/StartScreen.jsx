// src/components/StartScreen.jsx
import React, { useState } from "react";

const StartScreen = ({ onStart }) => {
    const [playerName, setPlayerName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            onStart(playerName.trim());
        }
    };

    return (
        <div className="start-screen">
            <div className="start-content">
                <img
                    src="/logoRoleplay.png"
                    alt="Roleplay Logo"
                    className="logo"
                />

                <form onSubmit={handleSubmit} className="start-form">
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Digite seu nome..."
                        className="name-input"
                        maxLength={20}
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="start-button"
                        disabled={!playerName.trim()}
                    >
                        START
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StartScreen;