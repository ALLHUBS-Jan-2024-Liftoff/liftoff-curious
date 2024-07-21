import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './routes/Home';
import About from './routes/About';
import Trivia from './routes/Trivia';
import Contact from './routes/Contact';
import Admin from './routes/Admin';
import QuizMaster from './routes/QuizMaster';

function App() {

  const router = createBrowserRouter([
    { element: <Layout/>, children: [
        { path: '/', element: <Home/>},
        { path: '/about', element: <About/>},
        { path: '/trivia', element: <Trivia/>},
        { path: '/contact', element: <Contact/>},
        { path: '/admin', element: <Admin/>},
        { path: '/QuizMaster', element: <QuizMaster/>}
    ]} 
  ]);

  return (
    <RouterProvider router={router}/>
  );
}


export default App;
