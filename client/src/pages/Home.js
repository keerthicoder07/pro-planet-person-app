import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Pro Planet</h1>
          <p>Join the movement for a sustainable future. Participate in environmental tasks, earn points, and make a real impact on our planet.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Sign In</Link>
          </div>
        </div>
      </header>
      
      <section className="features-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🌱 Join Tasks</h3>
              <p>Participate in environmental challenges created by organizations and communities.</p>
            </div>
            <div className="feature-card">
              <h3>📸 Submit Proof</h3>
              <p>Complete tasks and submit proof of your environmental impact.</p>
            </div>
            <div className="feature-card">
              <h3>🏆 Earn Rewards</h3>
              <p>Gain points, badges, and recognition for your sustainability efforts.</p>
            </div>
            <div className="feature-card">
              <h3>🌍 Make Impact</h3>
              <p>Track your carbon footprint reduction and environmental contributions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;