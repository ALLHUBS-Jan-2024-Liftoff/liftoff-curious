import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function QuizEnvironment({ questions, numQuestions, chosenTopic }) {
  const navigate = useNavigate();

  const [currentQnum, setCurrentQnum] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(numQuestions * 60);
  const [userAnswers, setUserAnswers] = useState(Array(numQuestions).fill(null));
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [markedForReview, setMarkedForReview] = useState(Array(numQuestions).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQnum - 1] = answer;
    setUserAnswers(newAnswers);
    if (newAnswers[currentQnum - 1] !== null) {
      setAttemptedQuestions(newAnswers.filter((answer) => answer !== null).length);
    }
  };

  const handleNextQuestion = () => {
    if (currentQnum < numQuestions) {
      setCurrentQnum(currentQnum + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQnum > 1) {
      setCurrentQnum(currentQnum - 1);
    }
  };

  const handleSaveAndNext = () => {
    handleNextQuestion();
  };

  const handleAbortQuiz = () => {
    alert('Quiz Aborted');
    navigate('/');
  };

  const handleSubmitQuiz = () => {
    alert('Quiz Submitted');
    const quizData = questions.map((q, index) => ({
      ...q,
      userAnswer: userAnswers[index],
    }));
    navigate('/feedback', { state: { quizData } });
  };

  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQnum - 1] = !newMarkedForReview[currentQnum - 1];
    setMarkedForReview(newMarkedForReview);
  };

  const currentQuestion = questions[currentQnum - 1];
  const isTimeRunningOut = timeRemaining <= 60;

  const getQuestionLinkClass = (index) => {
    if (markedForReview[index]) {
      if (userAnswers[index] !== null) {
        return 'bg-warning text-dark';
      }
      return 'bg-warning text-muted';
    }
    if (userAnswers[index] !== null) {
      return 'bg-success text-dark';
    }
    return 'bg-light text-dark';
  };

  const QuestionDisplay = ({ question }) => (
    <div className="mb-4">
      <h6 className="mb-3">Q. {question.content}</h6>
      {['optionA', 'optionB', 'optionC', 'optionD'].map((option, index) => (
        <div key={index} className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            id={`option${index}`}
            name="question"
            value={question[option]}
            checked={userAnswers[currentQnum - 1] === question[option]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          <label className="form-check-label" htmlFor={`option${index}`}>
            {question[option]}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-3 p-lg-5" style={{ minHeight: '600px' }}>
      <div className="bg-light border rounded pt-3 pb-1 mb-3 mb-lg-4">
        <p className="text-center">
          Quiz on {chosenTopic}, playing for {numQuestions} questions
        </p>
      </div>
      <div className="row">
        <div className="col-12 col-lg-4">
          <p className="text-center text-lg-start">
            <Button
              variant="secondary btn-lg"
              onClick={handlePrevQuestion}
              disabled={currentQnum === 1}
            >
              &lt; Prev
            </Button>
            <span className="bg-light rounded py-3 px-3 mx-2 mx-lg-3">
              {`Question # ${currentQnum} / ${numQuestions}`}
            </span>
            <Button
              variant="secondary btn-lg"
              onClick={handleNextQuestion}
              disabled={currentQnum === numQuestions}
            >
              Next &gt;
            </Button>
          </p>
        </div>
        <div className="col-12 col-lg-4 py-2 p-lg-1">
          <div className="bg-light rounded py-2">
            <center>
              <span className={isTimeRunningOut ? 'text-danger' : ''}>
                Time Remaining: {formatTime(timeRemaining)} /{' '}
                {formatTime(numQuestions * 60)}
              </span>
            </center>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex justify-content-between justify-content-lg-end">
          <span>
            <Button variant="secondary btn-lg mx-2 my-1">Dark Mode</Button>
          </span>
          <span>
            <Button
              variant="secondary btn-lg mx-2 my-1 me-lg-0"
              onClick={handleMarkForReview}
            >
              {markedForReview[currentQnum - 1] ? 'Unmark/End Review' : 'Mark for Review'}
            </Button>
          </span>
        </div>
      </div>
      <div className="row py-2 py-lg-3">
        <div className="col-12 col-lg-10">
          <div className="border rounded py-3 px-2" style={{ minHeight: '20rem' }}>
            <QuestionDisplay question={currentQuestion} />
          </div>
        </div>
        <div className="col-12 col-lg-2 pt-2 pt-lg-0">
          <p className="text-end">
            <Button variant="secondary btn-lg">Listen To It</Button>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-2 order-lg-last">
          <p className="text-start text-lg-end">
            <Button variant="success btn-lg my-1" onClick={handleSaveAndNext}>
              Save & Next
            </Button>
          </p>
        </div>
        <div className="col-12 col-lg-10 pt-2">
          <div className="bg-light rounded p-2">
            <div className="row">
              <div className="col-auto">Progress:</div>
              <div className="col pt-1">
                <ProgressBar
                  variant="success"
                  now={(attemptedQuestions / numQuestions) * 100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-3 py-lg-3">
        <div className="col-12 col-lg-10">
          <div className="border rounded py-5 bg-light px-2 d-flex flex-wrap">
            {Array.from({ length: numQuestions }, (_, index) => (
              <div
                key={index}
                className={`rounded m-2 p-2 cursor-pointer ${getQuestionLinkClass(index)}`}
                onClick={() => setCurrentQnum(index + 1)}
                style={{ width: '40px', textAlign: 'center' }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-2 pt-2">
          <div className="d-flex flex-column h-100">
            <div className="mt-auto">
              <p className="text-start text-lg-end my-1">
                <Button variant="danger btn-lg my-1" onClick={handleAbortQuiz}>
                  Abort Quiz
                </Button>
              </p>
              <p className="text-start text-lg-end my-1">
                <Button variant="primary btn-lg my-1" onClick={handleSubmitQuiz}>
                  Submit Quiz
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizEnvironment;