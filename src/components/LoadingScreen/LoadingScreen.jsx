// src/components/LoadingScreen/LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.scss';

const LoadingScreen = ({ progress, status, onComplete, isComplete }) => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <img
                    src="/logoRoleplay.png"
                    alt="Roleplay Logo"
                    className="loading-logo"
                />

                <div className="loading-info">
                    <h2>Loading Game Resources...</h2>

                    <div className="progress-container">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="progress-text">{progress}%</span>
                    </div>

                    <p className="loading-status">{status}</p>

                    {isComplete && (
                        <button
                            className="continue-button"
                            onClick={onComplete}
                        >
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;