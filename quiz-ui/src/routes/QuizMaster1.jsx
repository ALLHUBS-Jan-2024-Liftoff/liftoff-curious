import React from 'react';

function QuizMaster({ onLogout }) {
  return (
    <div>
      <h2>Welcome to the QuizMaster page!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default QuizMaster;