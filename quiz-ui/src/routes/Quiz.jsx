import React from 'react';
import { useLocation } from 'react-router-dom';
import QuizEnvironment from '../components/QuizEnvironment';

function Quiz() {
  const location = useLocation();
  const { questions, numQuestions, chosenTopic } = location.state || { questions: [], numQuestions: 0, chosenTopic: '' };
  
  return (
    <div>
      {questions.length > 0 ? (
        <QuizEnvironment 
          questions={questions} 
          numQuestions={numQuestions} 
          chosenTopic={chosenTopic}
        />
      ) : (
        <p>No questions available. Please go back and select a topic and number of questions.</p>
      )}
    </div>
  );
}

export default Quiz;