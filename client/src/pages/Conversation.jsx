// client/src/pages/Conversation.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import conversationService from "../services/conversationService";
import "./Conversation.scss";

function Conversation() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedModel = searchParams.get('model') || 'karen';
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getBackgroundImage = () => {
        return selectedModel === 'amanda' ? '/assets/amanda1.png' : '/assets/karen1.png';
    };

    const handleStartConversation = async () => {
        setIsLoading(true);
        try {
            await conversationService.startConversation(selectedModel, {
                onConnect: () => {
                    setIsConnected(true);
                    setIsLoading(false);
                },
                onDisconnect: () => {
                    setIsConnected(false);
                    setIsSpeaking(false);
                },
                onError: (error) => {
                    console.error('Conversation error:', error);
                    setIsLoading(false);
                    alert('Failed to start conversation. Please try again.');
                },
                onModeChange: (mode) => {
                    setIsSpeaking(mode.mode === 'speaking');
                }
            });
        } catch (error) {
            setIsLoading(false);
            if (error.message.includes('Microphone')) {
                alert('Microphone permission is required for the conversation.');
            } else {
                alert('Failed to start conversation. Please try again.');
            }
        }
    };

    const handleEndConversation = async () => {
        await conversationService.endConversation();
        setIsConnected(false);
        setIsSpeaking(false);
    };

    const handleBackHome = () => {
        if (isConnected) {
            handleEndConversation();
        }
        navigate('/');
    };

    useEffect(() => {
        return () => {
            if (isConnected) {
                conversationService.endConversation();
            }
        };
    }, [isConnected]);

    return (
        <div className="conversation">
            <div
                className="conversation-background"
                style={{ backgroundImage: `url(${getBackgroundImage()})` }}
            />

            <div className="conversation-ui">
                <button onClick={handleBackHome} className="back-button">
                    ← Back
                </button>

                <div className="status-container">
                    <div className={`status ${isConnected ? 'connected' : ''}`}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </div>
                </div>

                <div className="controls">
                    {!isConnected ? (
                        <button
                            onClick={handleStartConversation}
                            className="start-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connecting...' : 'Start Chat'}
                        </button>
                    ) : (
                        <button onClick={handleEndConversation} className="end-button">
                            End Chat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Conversation;