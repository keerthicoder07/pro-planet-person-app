import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const AuthContext=createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const loadUser = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) return setLoading(false);
            
            const res = await axios.get('/api/auth/me');
            setUser(res.data);
          } finally {
            setLoading(false);
          }
        };
        loadUser();
      }, []);
    
      const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
      };
    
      const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      };
    
      return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
