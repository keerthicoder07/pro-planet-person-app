import React,{useState,useEffect} from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeframe, setTimeframe] = useState('weekly');

  useEffect(() => {
  const fetchLeaderboard = async () => {
    const res = await axios.get(`/api/leaderboard?timeframe=${timeframe}`);
    setLeaderboard(res.data);
  };
  fetchLeaderboard();
}, [timeframe]);

return (
  <div className="leaderboard-container">
    <h2>Eco Leaderboard</h2>
    
    <div className="timeframe-selector">
      <button
        className={timeframe === 'weekly' ? 'active' : ''}
        onClick={() => setTimeframe('weekly')}
      >
        Weekly
      </button>
      <button
        className={timeframe === 'monthly' ? 'active' : ''}
        onClick={() => setTimeframe('monthly')}
      >
        Monthly
      </button>
      <button
        className={timeframe === 'alltime' ? 'active' : ''}
        onClick={() => setTimeframe('alltime')}
      >
        All Time
      </button>
    </div>

    <div className="leaderboard-table">
      <div className="header">
        <span>Rank</span>
        <span>User</span>
        <span>Points</span>
        <span>CO₂ Reduced</span>
      </div>
      
      {leaderboard.map((user, index) => (
        <div key={user._id} className="row">
          <span>{index + 1}</span>
          <span>{user.name}</span>
          <span>{user.points}</span>
          <span>{user.carbonReduced} kg</span>
        </div>
      ))}
    </div>
  </div>
);
};

export default Leaderboard;