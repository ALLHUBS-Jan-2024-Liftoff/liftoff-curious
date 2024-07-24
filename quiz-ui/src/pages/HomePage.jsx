import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCarousel from '../components/HomeCarousel';
import { getAllTopics, getTopicById } from '../services/topicService';
import { getNQuestionsOnTopicX } from '../services/questionService';

function HomePage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const topicsData = await getAllTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questions = await getNQuestionsOnTopicX(numQuestions, selectedTopic);
      const topicObject = await getTopicById(selectedTopic);
      const chosenTopic = topicObject.name; 
      navigate('/quiz', {
        state: {
          questions,          // Passing the questions array
          numQuestions,       // Passing the number of questions selected
          chosenTopic         // Passing the name of the chosen topic
        }
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <div className="home">
      <HomeCarousel />
      <div className="bg-light">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="p-3 ps-lg-5">
              <div className="py-3">
                <h2>Play Fun and Interactive Quizzes</h2>
                <h4>And Elevate Your Coding Skills</h4>
              </div>
              <p className="text-justify">
                Welcome to Coders' Quiz, where learning meets fun! Quizzes are more than just assessment tools; they are an engaging way to enhance your knowledge, boost your confidence, and sharpen your skills. Whether you're brushing up on JavaScript, diving into web development, or exploring new programming languages, you are in the right place to experience an interactive and exciting testing environment. Bored with traditional study methods? Take our quiz challenges and enjoy learning!
              </p>
              <p className="text-justify">
                At Coders' Quiz, we believe learning should be accessible to everyone, so our platform is free. We offer a quick and effective way to gauge your programming knowledge for exams, interviews, or personal growth. Our quizzes are informative and enjoyable, providing instant feedback and helping you identify your strengths and areas for improvement. A practical tool for anyone looking to elevate their coding skills.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="p-3 p-lg-5">
              <div className="p-3 p-lg-4 border bg-white rounded">
                <p>It’s as easy as 1-2-3! Simply select your desired topic, choose the number of questions you want to tackle, and dive into the quiz. No lengthy sign-ups or complicated steps—just straightforward, fun, and educational quizzing. So why wait? Plunge right in.</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="topic" className="form-label">Select Topic:</label>
                    <select
                      id="topic"
                      className="form-select"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a topic</option>
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="numQuestions" className="form-label">Number of Questions:</label>
                    <input
                      type="range"
                      id="numQuestions"
                      className="form-range"
                      min="5"
                      max="30"
                      step="5"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                    />
                    <span className="ms-2">{numQuestions}</span>
                  </div>

                  <button type="submit" className="btn btn-primary">Take the Quiz</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
