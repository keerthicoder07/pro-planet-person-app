import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/Authcontext';
import axios from 'axios';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your environmental assistant. Ask me about sustainability tips, eco-friendly practices, or environmental challenges!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chatbot', {
        message: inputMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const botMessage = {
        type: 'bot',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, I\'m having trouble responding right now. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "How can I reduce my carbon footprint?",
    "What are some easy recycling tips?",
    "How to start composting at home?",
    "Best ways to save energy at home?",
    "Sustainable transportation options?"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>🤖 Environmental Assistant</h1>
        <p>Get personalized sustainability advice and eco-friendly tips</p>
      </div>

      <div className="chatbot-content">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="suggested-questions">
          <h4>Suggested Questions:</h4>
          <div className="suggestions-grid">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => handleSuggestedQuestion(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form className="message-form" onSubmit={handleSendMessage}>
          <div className="input-group">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about environmental tips..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !inputMessage.trim()}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;