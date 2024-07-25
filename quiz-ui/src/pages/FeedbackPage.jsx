import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function FeedbackPage() {
  const location = useLocation();
  const { quizData } = location.state || { quizData: [] };

  const totalQuestions = quizData.length;
  const attemptedQuestions = quizData.filter((q) => typeof q.userAnswer === 'string').length;
  const correctAnswers = quizData.filter((q) => q.userAnswer === q.answer).length;
  const wrongAnswers = attemptedQuestions - correctAnswers;

  const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
  const wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(2);

  return (
    <div className="container py-3 py-lg-5 bg-white">
      <h2>Quiz Feedback</h2>
      <Table striped bordered hover className="mt-4 rounded">
        <thead>
          <tr>
            <th>Total Questions</th>
            <th>Attempted</th>
            <th>Correct</th>
            <th>Incorrect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalQuestions}</td>
            <td>{attemptedQuestions}</td>
            <td>
              {correctAnswers} / {totalQuestions} ({correctPercentage}%)
            </td>
            <td>
              {wrongAnswers} / {totalQuestions} ({wrongPercentage}%)
            </td>
          </tr>
        </tbody>
      </Table>

      {quizData.map((question, index) => (
        <div key={question.id} className="mb-4 p-3 border rounded">
          <p>
            <strong>Q{index + 1}: {question.content}</strong>
          </p>
          <div>
            {['optionA', 'optionB', 'optionC', 'optionD'].map((optionKey, i) => (
              <div key={optionKey} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`option${index}-${i}`}
                  name={`question${index}`}
                  value={question[optionKey]}
                  checked={question.userAnswer === question[optionKey]}
                  readOnly
                />
                <label className="form-check-label" htmlFor={`option${index}-${i}`}>
                  <span className="badge bg-light text-dark me-2">Option {String.fromCharCode(65 + i)}:</span> {question[optionKey]}
                  {question.userAnswer === question[optionKey] && (
                    <span
                      className={`badge ms-2 ${question.userAnswer === question.answer ? 'bg-success' : 'bg-danger'}`}
                    >
                      {question.userAnswer === question.answer ? '✓ Your Answer' : '✗ Your Answer'}
                    </span>
                  )}
                  {question.answer === question[optionKey] && (
                    <span className="badge text-dark ms-2" style={{ backgroundColor: '#d4edda' }}>✓ Correct Answer</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="mt-4">
        Thank you for taking the quiz! If you want to play again, start your selections on the{' '}
        <Link to="/">home page</Link>.
      </p>
    </div>
  );
}

export default FeedbackPage;
