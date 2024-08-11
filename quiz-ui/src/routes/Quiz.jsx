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
        <div style={{ minHeight: '850px'}} className='p-3 p-lg-5 bg-light'>
        <p>No questions available. Please go back to the <a href="/" title="Click to visit">home page</a> and select a topic and number of questions.</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;