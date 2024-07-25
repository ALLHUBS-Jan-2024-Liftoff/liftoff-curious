import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './routes/Home';
import About from './routes/About';
import Trivia from './routes/Trivia';
import Contact from './routes/Contact';
import QuizMaster from './routes/QuizMaster';
import Quiz from './routes/Quiz';
import FeedbackPage from './pages/FeedbackPage';
import Register from './routes/Register';
import Login from './routes/Login';
import axiosAuthInstance from './services/axiosConfig';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin')

  const handleLogin = (username) => {
    setAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = async () => {
    try {
      await axiosAuthInstance.post('/users/logout');
      setAuthenticated(false);
      setUsername('');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/quiz', element: <Quiz /> },
        { path: '/feedback', element: <FeedbackPage /> },
        { path: '/about', element: <About /> },
        { path: '/trivia', element: <Trivia /> },
        { path: '/contact', element: <Contact /> },
        {
          path: '/login',
          element: <Login onLogin={handleLogin} />,
          loader: () => {
            if (authenticated) {
              return redirect('/quizmaster');
            }
            return null;
          },
        },
        {
          path: '/register',
          element: <Register onLogin={handleLogin} />,
          loader: () => {
            if (authenticated) {
              return redirect('/quizmaster');
            }
            return null;
          },
        },
        {
          path: '/quizmaster',
          element: <QuizMaster onLogout={handleLogout} username={username} />,
          loader: () => {
            if (!authenticated) {
              return redirect('/login');
            }
            return null;
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
