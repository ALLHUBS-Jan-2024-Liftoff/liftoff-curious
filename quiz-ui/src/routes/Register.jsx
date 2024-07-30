import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosPublicInstance from '../services/axiosPublic';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublicInstance.post('/users/register', { name, email, username, password, verifyPassword, secretCode });
      login(username);
      navigate('/quizmaster');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="p-lg-4 bg-light" style={{ minHeight: '750px' }}>
      <div className="bg-info pt-3 pb-1 mb-4 rounded">
        <p className="text-center">Admin account creation is restricted to our dedicated Quiz Masters! If you just want to play the quiz visit the Home Page.</p>
      </div>
      <div className="card" style={{ width: '500px', maxWidth: '100%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <Link to="/login" className="card-link" style={{ color: '#888', textDecoration: 'none' }}>LOG IN</Link>
            <h5 className="card-title">REGISTER</h5>
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="username" className="col-sm-4 col-form-label">Username</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="verifyPassword" className="col-sm-4 col-form-label">Verify Password</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="verifyPassword"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="secretCode" className="col-sm-4 col-form-label">Secret Code</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="secretCode"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="Enter your secret code"
                  required
                />
              </div>
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
