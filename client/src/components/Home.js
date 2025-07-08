import React,{useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import{AuthContext} from './Authcontext'

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const features = [
    {
      icon: '🌱',
      title: 'Track Activities',
      desc: 'Log your eco-friendly actions'
    },
    {
      icon: '🏆',
      title: 'Earn Rewards',
      desc: 'Get badges for green achievements'
    },
    {
      icon: '📊',
      title: 'See Impact',
      desc: 'Visualize your carbon reduction'
    }
  ];

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Join the Green Revolution</h1>
        <p>Make a difference with every eco-friendly action</p>
        <button onClick={() => navigate(user ? '/tasks' : '/login')}>
          {user ? 'View Tasks' : 'Get Started'}
        </button>
      </div>

      <div className="features">
        {features.map((feature, i) => (
          <div key={i} className="feature-card">
            <span>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
