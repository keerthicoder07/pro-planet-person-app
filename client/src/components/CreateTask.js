import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreateTask = () => {
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState({
    title: '',
    description: '',
    points: 10,
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', task);
      // Redirect or show success
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="unauthorized">
        <h3>Only administrators can create tasks</h3>
        <p>Please contact your system admin</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({...task, title: e.target.value})}
      />
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({...task, description: e.target.value})}
      />
      <input
        type="number"
        placeholder="Points"
        value={task.points}
        onChange={(e) => setTask({...task, points: e.target.value})}
      />
      <input
        placeholder="Location"
        value={task.location}
        onChange={(e) => setTask({...task, location: e.target.value})}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;