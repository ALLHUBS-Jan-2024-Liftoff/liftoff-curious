import React, { createContext, useState, useEffect } from 'react';
import axiosAuthInstance from '../services/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Load authentication state from local storage on app startup
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (username) => {
    setAuthenticated(true);
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const logout = async () => {
    try {
      await axiosAuthInstance.post('/users/logout');
      setAuthenticated(false);
      setUsername('');
      localStorage.removeItem('username');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;