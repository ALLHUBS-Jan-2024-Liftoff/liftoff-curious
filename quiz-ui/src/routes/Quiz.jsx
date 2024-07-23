import React from 'react';
import { useLocation } from 'react-router-dom';
import QuizEnvironment from '../components/QuizEnvironment';

function Quiz() {
  const location = useLocation();
  const { questions } = location.state || { questions: [] };
  
  return (
    <div>
      {questions.length > 0 ? (
        <QuizEnvironment questions={questions} />
      ) : (
        <p>No questions available. Please go back and select a topic and number of questions.</p>
      )}
    </div>
  );
}

export default Quiz;