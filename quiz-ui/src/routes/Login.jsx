import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosPublicInstance from '../services/axiosPublic';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublicInstance.post('/users/login', { username, password });
      login(username);
      navigate('/quizmaster');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="p-lg-4 bg-light pb-5" style={{ minHeight: '850px' }}>
      <div className="bg-info pt-3 pb-1 mb-4 rounded-lg-up">
        <p className="text-center">Are you an Admin User? If yes, please login to access the Quizmaster Control!</p>
      </div>
      <div className="card rounded-lg-up-card" style={{ width: '500px', maxWidth: '100%', margin: 'auto', marginTop: '50px', padding: '20px' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <h5 className="card-title">LOG IN</h5>
            <Link to="/register" className="card-link" style={{ color: '#888', textDecoration: 'none' }}>REGISTER</Link>
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
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
                />
              </div>
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
