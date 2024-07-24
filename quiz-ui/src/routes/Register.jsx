import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosPublicInstance from '../services/axiosPublic';

const Register = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublicInstance.post('/users/register', { username, password, verifyPassword });
      onLogin();
      navigate('/quizmaster'); // Redirect to the QuizMaster page
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          placeholder="Password"
        />
        <input 
          type="password" 
          value={verifyPassword} 
          onChange={(e) => setVerifyPassword(e.target.value)} 
          required={true} 
          placeholder="Verify Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
