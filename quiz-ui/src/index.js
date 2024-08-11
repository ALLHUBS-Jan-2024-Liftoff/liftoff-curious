import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global error caught:", error);
  // Redirect to the error page or log the error to an external service
  window.location.href = '/error';
};

window.onunhandledrejection = function(event) {
  console.error("Unhandled rejection caught:", event.reason);
  // Redirect to the error page or log the error to an external service
  window.location.href = '/error';
};