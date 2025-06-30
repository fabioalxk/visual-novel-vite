// client/src/pages/Introduction.jsx
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Introduction.scss";

function Introduction() {
    const navigate = useNavigate();

    const handleVideoEnd = () => {
        navigate(`/conversation}`);
    };

    const handleSkip = () => {
        navigate(`/conversation`);
    };

    return (
        <div className="introduction">
            <video
                src={"/assets/introduction.mp4"}
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