import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TextToSpeech from './TextToSpeech'; // Import the TextToSpeech component
import '../App.css'; // the CSS file contains the css code for body with dark class

function QuizEnvironment({ questions, numQuestions, chosenTopic }) {
  const navigate = useNavigate();

  //console.log('Number of questions:', numQuestions); // check the value of numQuestions

  const [currentQnum, setCurrentQnum] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(numQuestions * 60);
  const [userAnswers, setUserAnswers] = useState(Array(numQuestions).fill(null));
  const [markedForReview, setMarkedForReview] = useState(Array(numQuestions).fill(false));
  const [textToRead, setTextToRead] = useState(''); // State to hold the text for TTS
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

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

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const resetDarkMode = () => {
    setIsDarkMode(false);
    document.body.classList.remove('dark');
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQnum - 1] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQnum < numQuestions) {
      setCurrentQnum(currentQnum + 1);
      stopSpeech(); 
    }
  };

  const handlePrevQuestion = () => {
    if (currentQnum > 1) {
      setCurrentQnum(currentQnum - 1);
      stopSpeech(); 
    }
  };

  const handleSaveAndNext = () => {
    handleNextQuestion();
  };

  const handleAbortQuiz = () => {
    const confirmAbort = window.confirm("Are you sure you want to abort the quiz?");
    if (confirmAbort) {
      stopSpeech(); 
      resetDarkMode();
      alert('Quiz is Aborted. You will be redirected to the Home Page now.');
      navigate('/');
    }
  };

  const handleSubmitQuiz = () => {
    const confirmSubmit = window.confirm("Are you sure you want to submit the quiz?");
    if (confirmSubmit) {
      stopSpeech(); 
      resetDarkMode();
      alert('Quiz is submitted, and you will view your feedback next');
      const quizData = questions.map((q, index) => ({
        ...q,
        userAnswer: userAnswers[index],
      }));
      navigate('/feedback', { state: { quizData } });
    }
  };

  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQnum - 1] = !newMarkedForReview[currentQnum - 1];
    setMarkedForReview(newMarkedForReview);
  };

  const handleListenToIt = () => {
    const currentQuestion = questions[currentQnum - 1];
    const text = `Question: ...${currentQuestion.content} ... Option A. ... ${currentQuestion.optionA}, Option B. ... ${currentQuestion.optionB}, Option C. ... ${currentQuestion.optionC}, or Option D. ... ${currentQuestion.optionD}`;
    setTextToRead(text);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentQuestion = questions[currentQnum - 1];
  const isTimeRunningOut = timeRemaining <= 60;

  const getQuestionLinkClass = (index) => {
    if (markedForReview[index]) {
      return 'bg-warning text-dark';
    }
    if (typeof userAnswers[index] === 'string' && userAnswers[index].trim() !== '') {
      return 'bg-success text-light';
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
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
          <label className="form-check-label" htmlFor={`option${index}`}>
            {question[option]}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`bg-${isDarkMode ? 'dark' : 'white'} p-3 p-lg-5 text-${isDarkMode ? 'light' : 'dark'}`} style={{ minHeight: '600px' }}>
      <div className={`bg-${isDarkMode ? 'secondary' : 'light'} border rounded pt-3 pb-1 mb-3 mb-lg-4`}>
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
            <span className={`bg-${isDarkMode ? 'secondary' : 'light'} rounded py-3 px-3 mx-2 mx-lg-3`}>
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
          <div className={`bg-${isDarkMode ? 'secondary' : 'light'} rounded py-2`}>
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
            <Button variant="secondary btn-lg mx-lg-2 my-1" onClick={handleToggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </span>
          <span>
            <Button
              variant="secondary btn-lg mx-lg-2 my-1 me-lg-0"
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
            <Button variant="secondary btn-lg" onClick={handleListenToIt}>Listen To It</Button>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-2 order-lg-last">
          <p className="text-start text-lg-end">
            <Button
              variant="success btn-lg my-1"
              onClick={handleSaveAndNext}
              disabled={currentQnum === numQuestions} // Disable if it's the last question
            >
              Save & Next
            </Button>
          </p>
        </div>
        <div className="col-12 col-lg-10 pt-2">
          <div className={`bg-${isDarkMode ? 'secondary' : 'light'} rounded p-2`}>
            <div className="row">
              <div className="col-auto">Progress:</div>
              <div className="col pt-1">
                <ProgressBar
                  variant="success"
                  now={(userAnswers.filter((answer) => answer !== null).length / numQuestions) * 100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-3 py-lg-3">
        <div className="col-12 col-lg-10">
          <div className={`border rounded py-3 bg-${isDarkMode ? 'secondary' : 'light'} px-2`}>
            <div>Questions Grid:</div>
            <div className="d-flex flex-wrap">
              {Array.from({ length: numQuestions }, (_, index) => (
                <div
                  key={index}
                  className={`rounded m-2 p-2 cursor-pointer ${getQuestionLinkClass(index)}`}
                  onClick={() => {
                    stopSpeech(); // Stop speech when clicking a question number
                    setCurrentQnum(index + 1);
                  }}
                  title={`Navigate to Question #${index+1}`}
                  style={{ width: '40px', textAlign: 'center', cursor: 'pointer' }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
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
      {/* Render the TextToSpeech component with the text to read */}
      <TextToSpeech text={textToRead} />
    </div>
  );
}

export default QuizEnvironment;
