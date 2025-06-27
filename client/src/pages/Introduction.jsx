// client/src/pages/Introduction.jsx
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Introduction.scss";

function Introduction() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedModel = searchParams.get('model') || 'karen';

    const getVideoSource = () => {
        return selectedModel === 'amanda' ? '/assets/amanda1.mp4' : '/assets/karen1.mp4';
    };

    const handleVideoEnd = () => {
        navigate(`/conversation?model=${selectedModel}`);
    };

    const handleSkip = () => {
        navigate(`/conversation?model=${selectedModel}`);
    };

    return (
        <div className="introduction">
            <video
                src={getVideoSource()}
                autoPlay
                controls
                onEnded={handleVideoEnd}
                className="intro-video"
            />
            <button onClick={handleSkip} className="skip-button">
                Skip
            </button>
        </div>
    );
}

export default Introduction;