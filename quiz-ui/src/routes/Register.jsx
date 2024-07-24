import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosPublicInstance from '../services/axiosPublic';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="p-lg-4 bg-light" style={{ minHeight: '750px'}} >
    <div className="bg-info pt-3 pb-1 mb-4 rounded"><p className="text-center">Admin account creation is restricted to our dedicated Quiz Masters! If you just want to play the quiz visit the Home Page.</p></div>
    <div className="card" style={{ width: '300px', margin: 'auto', marginTop: '50px', padding: '20px' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <Link to="/login" className="card-link" style={{ color: '#888', textDecoration: 'none' }}>LOG IN</Link>
          <h5 className="card-title">REGISTER</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              required={true}
              placeholder="Verify Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? Please <Link to="/login">log in</Link>.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
