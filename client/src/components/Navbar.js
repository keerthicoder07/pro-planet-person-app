import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span role="img" aria-label="leaf">🌱</span> Pro Planet
      </Link>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chatbot">Eco Assistant</Link>
      </div>
    </nav>
  );
};

export default Navbar;