import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';

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
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/quizmaster', element: <QuizMaster /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
