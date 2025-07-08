import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Pro Planet</h3>
            <p>Making environmental impact through community action and gamification.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/tasks">Browse Tasks</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/chatbot">AI Assistant</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Environmental Impact</h4>
            <ul>
              <li><a href="#impact">Our Impact</a></li>
              <li><a href="#partners">Partner Organizations</a></li>
              <li><a href="#resources">Environmental Resources</a></li>
              <li><a href="#blog">Sustainability Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-stats">
            <span>🌱 Carbon Reduced: 10,240kg</span>
            <span>🏆 Active Users: 2,847</span>
            <span>📍 Tasks Completed: 1,156</span>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 Pro Planet. All rights reserved. Together for a sustainable future.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;