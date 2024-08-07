import React, { createContext, useState, useEffect } from 'react';
import axiosAuthInstance from '../services/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [authenticated, setAuthenticated] = useState(() => {
   const storedAuth = localStorage.getItem('authenticated');
   return storedAuth ? JSON.parse(storedAuth) : false;
 });
 const [username, setUsername] = useState(() => {
   return localStorage.getItem('username') || '';
 });

 useEffect(() => {
   // Save authentication state to local storage
   localStorage.setItem('authenticated', JSON.stringify(authenticated));
   localStorage.setItem('username', username);
 }, [authenticated, username]);

 const login = (username) => {
   setAuthenticated(true);
   setUsername(username);
 };

 const logout = async () => {
   try {
     await axiosAuthInstance.post('/users/logout');
     setAuthenticated(false);
     setUsername('');
     localStorage.removeItem('authenticated');
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