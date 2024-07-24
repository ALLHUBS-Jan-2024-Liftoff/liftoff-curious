import React, { useState } from 'react';
import axios from '../services/axiosConfig';

function Admin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        username,
        password,
        verifyPassword
      });
      alert(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        username,
        password
      });
      alert(response.data);
      onLogin();
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {isRegistering && (
          <div>
            <label>Verify Password:</label>
            <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
          </div>
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
}

export default Admin;