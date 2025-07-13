import React, { useContext } from 'react';
import { AuthContext } from '../components/Authcontext';

const TaskCard = ({ task, onAccept, onVerify }) => {
  const { user } = useContext(AuthContext);
  const participant = task.participants?.find(p => p.user._id === user?._id);

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      
      {user?.role === 'customer' && (
        participant ? (
          participant.proof ? (
            <p>Status: {participant.status}</p>
          ) : (
            <button onClick={() => onAccept(task._id)}>Submit Proof</button>
          )
        ) : (
          <button onClick={() => onAccept(task._id)}>Accept Task</button>
        )
      )}

      {(user?.role === 'organization' || user?.role === 'admin') && (
        <div className="verification-panel">
          {task.participants?.map(p => (
            <div key={p._id}>
              <p>{p.user.name}</p>
              {p.proof && <img src={p.proof} alt="Proof" />}
              <select 
                value={p.status}
                onChange={(e) => onVerify(task._id, p._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TaskCard;