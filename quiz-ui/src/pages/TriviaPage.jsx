import React, { useState } from 'react';
import JumbotronComponent from '../components/JumbotronComponent'
import axios from 'axios';

const TriviaPage = () => {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

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
            if (answers[index] === question.correct_answer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setShowResults(true);
    };

    return (
        <>
        <JumbotronComponent backgroundImage={'https://placehold.co/1600x400/6F7F6F/6F7F6F/png'} pageName={'Trivia'}/>
        <div className="bg-light p-2 p-lg-4" style={{ minHeight: '600px'}}>
            <h1>Play Quick Trivia</h1>
            <p>Select a topic and answer the questions:</p>
            <select value={selectedTopic} onChange={handleTopicChange}>
                <option value="" disabled>Select a topic</option>
                <option value="22">Geography</option>
                <option value="20">Mythology</option>
                <option value="23">History</option>
            </select>
            {questions.length > 0 && !showResults && (
                <div>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <p>{question.question}</p>
                            <div>
                                {[...question.incorrect_answers, question.correct_answer]
                                    .sort()
                                    .map((answer, i) => (
                                        <div key={i}>
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={answer}
                                                onChange={(e) => handleAnswerChange(e, index)}
                                            />
                                            {answer}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit & Check Score</button>
                </div>
            )}
            {showResults && (
                <div>
                    <p>Score: {score}/{questions.length}</p>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <p>{question.question}</p>
                            <p>Your answer: {answers[index]}</p>
                            <p>Correct answer: {question.correct_answer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </>
    );
};

export default TriviaPage;
