// src/components/ResultScreen/ResultScreen.jsx
import React from 'react';
import './ResultScreen.scss';

const ResultScreen = ({ result, onRestart }) => {
    const { outcome, score, reason } = result;
    const isSuccess = outcome === 'success';

    return (
        <div className="result-screen">
            <div className="result-content">
                <h1 className={`result-title ${isSuccess ? 'success' : 'failure'}`}>
                    {isSuccess ? 'Você salvou a Kate' : 'Você não conseguiu salvá-la'}
                </h1>

                <div className="score-container">
                    <div className={`score-circle ${isSuccess ? 'success' : 'failure'}`}>
                        <span className="score-number">{score}</span>
                        <span className="score-label">/ 100</span>
                    </div>
                </div>

                <div className="evaluation">
                    <h3>Avaliação</h3>
                    <p className="reason">{reason}</p>
                </div>

                <button
                    className="restart-button"
                    onClick={onRestart}
                >
                    Tentar Novamente
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;