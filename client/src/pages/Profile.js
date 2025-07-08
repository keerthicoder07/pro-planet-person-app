import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/Authcontext';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    organization: '',
    points: 0,
    carbonReduced: 0,
    badges: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          className="edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-stats">
          <div className="stat-card">
            <h3>Points Earned</h3>
            <p className="stat-number">{profileData.points}</p>
          </div>
          <div className="stat-card">
            <h3>Carbon Reduced</h3>
            <p className="stat-number">{profileData.carbonReduced}kg</p>
          </div>
          <div className="stat-card">
            <h3>Badges</h3>
            <p className="stat-number">{profileData.badges?.length || 0}</p>
          </div>
        </div>

        <div className="profile-form">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {user?.role === 'organization' && (
                <div className="form-group">
                  <label>Organization:</label>
                  <input
                    type="text"
                    name="organization"
                    value={profileData.organization}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Name:</label>
                <p>{profileData.name}</p>
              </div>
              <div className="info-group">
                <label>Email:</label>
                <p>{profileData.email}</p>
              </div>
              <div className="info-group">
                <label>Role:</label>
                <p>{user?.role}</p>
              </div>
              {user?.role === 'organization' && (
                <div className="info-group">
                  <label>Organization:</label>
                  <p>{profileData.organization}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {profileData.badges && profileData.badges.length > 0 && (
          <div className="badges-section">
            <h3>Your Badges</h3>
            <div className="badges-grid">
              {profileData.badges.map((badge, index) => (
                <div key={index} className="badge-item">
                  <span className="badge-icon">🏆</span>
                  <span className="badge-name">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;