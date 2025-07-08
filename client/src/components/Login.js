import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from './Authcontext';
import '../styles/Login.css';

const Login = () => {
  const[isLogin, setIsLogin]=useState(true);
  const[formdata,setFormData]=useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
    
  });
  const [error,setError]=useState('');
  const{login}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formdata,[e.target.name]:e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formdata.email, formdata.password);
      } else {
        if (formdata.password !== formdata.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        // Always register as customer
        await axios.post('/api/auth/register', {
          ...formdata,
          role: 'customer' // Force customer role
        });
        await login(formdata.email, formdata.password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Register as Customer'}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          minLength="6"
          required
        />
        
        {!isLogin && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        
        <button type="submit">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need a customer account? Register here' : 'Already have an account? Login'}
      </p>

      <div className="admin-note">
        <p>Admin access? Contact system administrator</p>
      </div>
   
      
      <div className="auth-footer">
        <Link to="/">Back to Home</Link>
      </div>
      </div>
  );
};

export default Login;