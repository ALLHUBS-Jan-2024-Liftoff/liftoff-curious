import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosPublicInstance from '../services/axiosPublic';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublicInstance.post('/users/login', { username, password });
      login(username);
      navigate('/quizmaster');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="p-lg-4 bg-light" style={{ minHeight: '750px'}} >
      <div className="bg-info pt-3 pb-1 mb-4 rounded"><p className="text-center">Are you an Admin User? If yes, please login to access the Quizmaster Control!</p></div>
      <div className="card" style={{ width: '300px', margin: 'auto', marginTop: '50px', padding: '20px' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="card-title">LOG IN</h5>
            <Link to="/register" className="card-link" style={{ color: '#888', textDecoration: 'none' }}>REGISTER</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Log in</button>
          </form>
          <p className="mt-3 text-center">
            Not have a login? Please <Link to="/register">register</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
