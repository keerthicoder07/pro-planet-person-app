import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    joinDate: '',
    role: '',
    organization: '',
    badges: [],
    stats: {
      tasksCompleted: 0,
      totalPoints: 0,
      carbonReduced: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProfileData(res.data);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          {profileData.role === 'admin' ? '👑' : 
           profileData.role === 'organization' ? '🏢' : '👤'}
        </div>
        <h2>{profileData.name}</h2>
        <p>
          {profileData.role === 'organization' 
            ? profileData.organization 
            : `Member since ${new Date(profileData.joinDate).toLocaleDateString()}`}
        </p>
        <span className={`role-badge ${profileData.role}`}>
          {profileData.role.toUpperCase()}
        </span>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <h3>Tasks Completed</h3>
          <p>{profileData.stats.tasksCompleted}</p>
        </div>
        <div className="stat">
          <h3>Total Points</h3>
          <p>{profileData.stats.totalPoints}</p>
        </div>
        <div className="stat">
          <h3>CO₂ Reduced</h3>
          <p>{profileData.stats.carbonReduced} kg</p>
        </div>
      </div>

      {profileData.badges.length > 0 && (
        <div className="badges-section">
          <h3>Earned Badges</h3>
          <div className="badges-grid">
            {profileData.badges.map((badge, index) => (
              <div key={index} className="badge">
                <span className="badge-icon">{getBadgeIcon(badge)}</span>
                <span className="badge-name">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {profileData.role === 'organization' && (
        <div className="organization-info">
          <h3>Organization Details</h3>
          <p>Contact Email: {profileData.email}</p>
          <p>Tasks Hosted: {profileData.stats.tasksHosted || 0}</p>
        </div>
      )}

      {profileData.role === 'admin' && (
        <div className="admin-actions">
          <h3>Admin Actions</h3>
          <button onClick={() => console.log('Admin action')}>
            Manage Users
          </button>
          <button onClick={() => console.log('Admin action')}>
            Verify Organizations
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function for badge icons
const getBadgeIcon = (badge) => {
  const icons = {
    'Recycler': '♻️',
    'Tree Hugger': '🌳',
    'Clean Air Champion': '💨',
    'Energy Saver': '💡',
    'Water Warrior': '💧'
  };
  return icons[badge] || '🏅';
};

export default Profile;