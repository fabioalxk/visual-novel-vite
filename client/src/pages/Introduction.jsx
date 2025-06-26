// src/pages/Introduction.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Introduction.scss";

function Introduction() {
    const navigate = useNavigate();

    const handleVideoEnd = () => {

    };

    const handleSkip = () => {

    };

    return (
        <div className="introduction">
            <video
                src="/assets/karen1.mp4"
                autoPlay
                controls
                onEnded={handleVideoEnd}
                className="intro-video"
            />
        </div>
    );
}

export default Introduction;