import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateTask.css';

const CreateTask = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    points: 10,
    location: {
      coordinates: [0, 0],
      address: ''
    },
    startDate: '',
    endDate: '',
    verificationRequired: true
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'address') {
      setTaskData({
        ...taskData,
        location: {
          ...taskData.location,
          address: value
        }
      });
    } else if (name === 'latitude' || name === 'longitude') {
      const coordinates = [...taskData.location.coordinates];
      if (name === 'latitude') coordinates[1] = parseFloat(value) || 0;
      if (name === 'longitude') coordinates[0] = parseFloat(value) || 0;
      
      setTaskData({
        ...taskData,
        location: {
          ...taskData.location,
          coordinates
        }
      });
    } else {
      setTaskData({
        ...taskData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Task created:', response.data);
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setTaskData({
          ...taskData,
          location: {
            ...taskData.location,
            coordinates: [position.coords.longitude, position.coords.latitude]
          }
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-header">
        <h1>Create Environmental Task</h1>
        <p>Create a new environmental challenge for the community</p>
      </div>

      <form className="create-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
            maxLength="100"
            placeholder="e.g., Beach Cleanup in Central Park"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Describe the task, requirements, and expected impact..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="points">Points Reward *</label>
            <input
              type="number"
              id="points"
              name="points"
              value={taskData.points}
              onChange={handleInputChange}
              min="10"
              max="100"
              required
            />
            <small>Points awarded for task completion (10-100)</small>
          </div>

          <div className="form-group">
            <label htmlFor="verificationRequired">Verification Required</label>
            <input
              type="checkbox"
              id="verificationRequired"
              name="verificationRequired"
              checked={taskData.verificationRequired}
              onChange={handleInputChange}
            />
            <small>Require proof submission for completion</small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Location Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={taskData.location.address}
            onChange={handleInputChange}
            required
            placeholder="Enter the task location address"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={taskData.location.coordinates[1]}
              onChange={handleInputChange}
              step="any"
              placeholder="e.g., 40.7128"
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={taskData.location.coordinates[0]}
              onChange={handleInputChange}
              step="any"
              placeholder="e.g., -74.0060"
            />
          </div>

          <button 
            type="button" 
            className="location-btn"
            onClick={getCurrentLocation}
          >
            📍 Use Current Location
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={taskData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={taskData.endDate}
              onChange={handleInputChange}
            />
            <small>Leave empty for ongoing tasks</small>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/tasks')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;