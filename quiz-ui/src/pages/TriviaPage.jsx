import React, { useState } from 'react';
import JumbotronComponent from '../components/JumbotronComponent';
import axios from 'axios';
import he from 'he'; // Added import for the 'he' library

const TriviaPage = () => {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const topics = [
      { id: 9, name: "General Knowledge" },
      { id: 10, name: "Books" },
      { id: 11, name: "Films" },
      { id: 12, name: "Music" },
      { id: 13, name: "Musicals & Theatres" },
      { id: 14, name: "Television" },
      { id: 15, name: "Video Games" },
      { id: 16, name: "Board Games" },
      { id: 17, name: "Science & Nature" },
      { id: 18, name: "Computers" },
      { id: 19, name: "Mathematics" },
      { id: 20, name: "Mythology" },
      { id: 21, name: "Sports" },
      { id: 22, name: "Geography" },
      { id: 23, name: "History" },
      { id: 24, name: "Politics" },
      { id: 25, name: "Art" },
      { id: 26, name: "Celebrities" },
      { id: 27, name: "Animals" },
      { id: 28, name: "Vehicles" },
      { id: 29, name: "Comics" },
      { id: 30, name: "Gadgets" },
      { id: 31, name: "Japanese Anime & Manga" },
      { id: 32, name: "Cartoon & Animations" }
  ];

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
        fetchQuestions(e.target.value);
    };

    const fetchQuestions = async (category) => {
        const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=easy&type=multiple`;
        try {
            const response = await axios.get(url);
            setQuestions(response.data.results);
            setShowResults(false);
        } catch (error) {
            console.error("Error fetching questions", error);
        }
    };

    const handleAnswerChange = (e, index) => {
        const newAnswers = { ...answers, [index]: e.target.value };
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (answers[index] && answers[index] === question.correct_answer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setShowResults(true);
    };

    return (
        <>
            <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/6F7F6F/6F7F6F/png'} pageName={'Trivia'} />
            <div className="bg-light p-3 p-lg-4 py-4" style={{ minHeight: '600px' }}>
                <div className="row mb-4">
                    <div className="col-12 col-lg-9">
                        <h4>Play Quick Trivia</h4>
                        <p>
                            Take a break from coding quizzes with a quick trivia on random non-technical topics for some fun and relaxation. 
                            The trivia questions are sourced from <a href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">OpenTrivia Database</a> (A free to use, user-contributed trivia question database).
                        </p>
                    </div>
                    <div className="col-12 col-lg-3">
                        <p className="text-center">{selectedTopic ? "Selected Topic for Trivia" : "Select a Topic for Trivia"}</p>
                        <div className="text-center">
                            <select className="form-select" value={selectedTopic} onChange={handleTopicChange}>
                            <option value="" disabled>Select a topic</option>
                                {topics.map(topic => (
                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {questions.length > 0 && !showResults && (
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            {questions.map((question, index) => (
                                <div key={index} className="mb-3 p-3 border rounded">
                                    <p>{he.decode(question.question)}</p>
                                    <div>
                                        {[...question.incorrect_answers, question.correct_answer]
                                            .sort()
                                            .map((answer, i) => (
                                                <div key={i} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        id={`question-${index}-answer-${i}`}
                                                        value={he.decode(answer)}
                                                        onChange={(e) => handleAnswerChange(e, index)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`question-${index}-answer-${i}`}>
                                                        {he.decode(answer)} 
                                                    </label>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-12 col-lg-3 d-flex flex-column">
                            <div className="mt-auto align-self-end">
                                <button className="btn btn-primary w-100 mt-auto" onClick={handleSubmit}>Submit & Check Score</button>
                            </div>
                        </div>
                    </div>
                )}
                {showResults && (
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <h5 className='mb-3'>Your Score: {score}/{questions.length}</h5>
                            {questions.map((question, index) => (
                                <div key={index} className="mb-3 p-3 border rounded">
                                    <p>{he.decode(question.question)}</p>
                                    <p>
                                        Your answer: <span className="fw-normal">{he.decode(answers[index] || "No answer")}</span>
                                        {answers[index] === question.correct_answer ? (
                                            <span className="badge bg-success ms-2">✓ Correct</span>
                                        ) : (
                                            <span className="badge bg-danger ms-2">✗ Incorrect</span>
                                        )}
                                    </p>
                                    <p>Correct answer: <span className="fw-normal">{he.decode(question.correct_answer)}</span></p>
                                </div>
                            ))}
                        </div>
                        <div className="col-12 col-lg-3 d-flex flex-column">
                            <div className="mt-auto align-self-end">
                                <p>Courtesy: OpenTrivia Database</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TriviaPage;
