// client/src/pages/ModelSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ModelSelection.scss";

function ModelSelection() {
    const navigate = useNavigate();

    const handleModelSelect = (modelType) => {
        navigate(`/introduction?model=${modelType}`);
    };

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="model-selection">
            <button onClick={handleBackHome} className="back-button">
                ← Back
            </button>

            <div className="selection-container">
                <h1>Choose Your Character</h1>

                <div className="models-grid">
                    <div className="model-card" onClick={() => handleModelSelect('karen')}>
                        <img src="/assets/karen1.png" alt="Karen" className="model-image" />
                        <h2>Karen</h2>
                    </div>

                    <div className="model-card" onClick={() => handleModelSelect('amanda')}>
                        <img src="/assets/amanda1.png" alt="Amanda" className="model-image" />
                        <h2>Amanda</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModelSelection;