import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';

function ErrorFallback({ error }) {
  console.error("Uncaught error:", error);
  if (window.location.pathname !== '/error') {
    return <Navigate to="/error" />;
  }
  return null; // or display a minimal fallback UI
}

function MyErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Logging error:", error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default MyErrorBoundary;