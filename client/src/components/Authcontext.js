import React,{createContext,useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const AuthContext=createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    // Set axios defaults
    useEffect(() => {
      axios.defaults.baseURL = 'http://localhost:5000';
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    }, [token]);

    useEffect(() => {
        const loadUser = async () => {
          try {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) return setLoading(false);
            
            setToken(storedToken);
            const res = await axios.get('/api/auth/me');
            setUser(res.data);
          } catch (error) {
            localStorage.removeItem('token');
            setToken(null);
          } finally {
            setLoading(false);
          }
        };
        loadUser();
      }, []);
    
      const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(res.data.user);
      };
    
      const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
      };
    
      return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };
