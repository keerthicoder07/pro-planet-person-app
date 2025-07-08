import React, { useState,useEffect,useContext } from 'react';
import{AuthContext} from '../components/Authcontext';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import '../styles/Tasks.css';

const Tasks = () => {
  const {user}=useContext(AuthContext);
  const[tasks,setTasks]=useState([]);
  const[filter,setFilter]=useState('all');
  
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const handleAccept = async (taskId) => {
    await axios.post(`/api/tasks/${taskId}/participate`);
    // Refresh tasks
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const handleSubmitProof = async (taskId, file) => {
    const formData = new FormData();
    formData.append('proof', file);
    const res = await axios.post(`/api/tasks/${taskId}/proof`, formData);
    // Refresh tasks
    setTasks(tasks.map(t => t._id === taskId ? res.data : t));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'my' && user?.role === 'customer') {
      return task.participants.some(p => p.user._id === user._id);
    }
    if (filter === 'my' && (user?.role === 'organization' || user?.role === 'admin')) {
      return task.organizer._id === user._id;
    }
    return true;
  });

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Environmental Tasks</h2>
        {user?.role !== 'customer' && (
          <button onClick={() => navigate('/create-task')}>+ New Task</button>
        )}
      </div>

      <div className="task-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button 
          className={filter === 'my' ? 'active' : ''}
          onClick={() => setFilter('my')}
        >
          My Tasks
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onAccept={handleAccept}
            onSubmitProof={handleSubmitProof}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;