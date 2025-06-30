// src/components/Chat/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import geminiService from '../../services/geminiService';
import { MIN_MESSAGES_BEFORE_DECISION } from '../../utils/constants';
import './Chat.scss';

const Chat = ({ onSceneChange }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([
            {
                sender: 'kate',
                text: 'Eu... eu não aguento mais... Todo mundo me odeia agora...',
                timestamp: Date.now()
            }
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            sender: 'user',
            text: inputValue.trim(),
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await geminiService.sendMessage(userMessage.text);

            const kateMessage = {
                sender: 'kate',
                text: response.message,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, kateMessage]);
            setMessageCount(geminiService.getMessageCount());

            /* MODIFICADO: Passa resultado completo incluindo score e reason */
            if (response.sceneChange) {
                console.log(`Kate decidiu: ${response.sceneChange} - Score: ${response.score} - Motivo: ${response.reason}`);
                setTimeout(() => {
                    onSceneChange(response);
                }, 3000);
            }
        } catch (error) {
            const errorMessage = {
                sender: 'system',
                text: 'Erro na conexão. Tente novamente.',
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const canMakeDecision = geminiService.canMakeDecision();
    const messagesRemaining = Math.max(0, MIN_MESSAGES_BEFORE_DECISION - messageCount);

    return (
        <div className="chat-container" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
                <h3>Conversando com Kate</h3>
                <span className="chat-hint">
                    {!canMakeDecision
                        ? `Continue conversando... (${messagesRemaining} mensagens restantes)`
                        : "Kate está avaliando suas palavras..."
                    }
                </span>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${Math.min(100, (messageCount / MIN_MESSAGES_BEFORE_DECISION) * 100)}%` }}
                    ></div>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <div className="message-content">
                            <span className="sender-name">
                                {message.sender === 'kate' ? 'Kate' :
                                    message.sender === 'user' ? 'Você' : 'Sistema'}:
                            </span>
                            <span className="message-text">{message.text}</span>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message kate">
                        <div className="message-content">
                            <span className="sender-name">Kate:</span>
                            <span className="typing-indicator">...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="chat-input"
                    disabled={isLoading}
                    maxLength={200}
                />
                <button
                    type="submit"
                    className="send-button"
                    disabled={!inputValue.trim() || isLoading}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Chat;