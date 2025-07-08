import React,{useContext,useEffect,useState} from 'react';
import{AuthContext} from '../components/Authcontext';
import axios from 'axios'
import TaskCard from '../components/TaskCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

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
  };

  const handleVerify = async (taskId, participantId, status) => {
    await axios.post(`/api/tasks/${taskId}/verify`, { participantId, status });
    // Refresh tasks
  };

  return (
    <div className="dashboard">
      {user?.role === 'organization' && (
        <button onClick={() => navigate('/create-task')}>Create New Task</button>
      )}
      
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard 
            key={task._id}
            task={task}
            onAccept={handleAccept}
            onVerify={handleVerify}
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;