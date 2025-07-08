import React, { useState } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
{ id: 1, text: 'Hi! Im your Eco Assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages(prev => [...prev, 
        { id: Date.now(), text: inputValue, sender: 'user' }
      ]);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, 
          { id: Date.now() + 1, text: 'I can provide tips on recycling, energy saving, and sustainable living!', sender: 'bot' }
        ]);
      }, 1000);
      
      setInputValue('');
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Eco Assistant</h2>
      
      <div className="chat-messages">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about eco-friendly practices..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;