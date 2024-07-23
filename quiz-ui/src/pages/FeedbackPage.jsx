import React from 'react';
import { useLocation } from 'react-router-dom';

function FeedbackPage() {
  const location = useLocation();
  const { questions, answers } = location.state || { questions: [], answers: {} };

  return (
    <div>
      <h2>Quiz Feedback</h2>
      {questions.map((question, index) => (
        <div key={question.id}>
          <p>Q{index + 1}: {question.questionText}</p>
          <p>Your Answer: {answers[question.id]}</p>
          <p>Correct Answer: {question.correctAnswer}</p>
          {answers[question.id] === question.correctAnswer ? (
            <p style={{ color: 'green' }}>Correct!</p>
          ) : (
            <p style={{ color: 'red' }}>Wrong!</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeedbackPage;