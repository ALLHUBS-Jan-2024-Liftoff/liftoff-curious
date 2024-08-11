import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCarousel from '../components/HomeCarousel';
import { getTopicById, getTopicsWithMinQuestions } from '../services/topicService';
import { getNQuestionsOnTopicX } from '../services/questionService';

function HomePage() {
  const [topicsForDropdown, setTopicsForDropdown] = useState([]);
  const [topicsForQuickQuiz, setTopicsForQuickQuiz] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      try {
        // Fetch topics with at least 30 questions for the dropdown
        const topicsForDropdownData = await getTopicsWithMinQuestions(30);
        setTopicsForDropdown(topicsForDropdownData);

        // Fetch topics with at least 10 questions for the quick quiz cards
        const topicsForQuickQuizData = await getTopicsWithMinQuestions(10);
        setTopicsForQuickQuiz(topicsForQuickQuizData.slice(0, 6)); // Show only the first 6 topics
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    }

    fetchTopics();
  }, []);

  const handleSubmit = async (e, topicId = selectedTopic, questionCount = numQuestions) => {
    e.preventDefault();
    try {
      const questions = await getNQuestionsOnTopicX(questionCount, topicId);
      const topicObject = await getTopicById(topicId);
      const chosenTopic = topicObject.name;
      navigate('/quiz', {
        state: {
          questions,          // Passing the questions array
          numQuestions: questionCount,       // Passing the number of questions selected
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
      <div className='jumbotron d-block d-lg-none d-flex align-items-center' style={{ height: '300px', backgroundImage: 'url("./assets/banner-images/Mobile_Banner_lowQ.jpg")', backgroundPositionX: '100%' }}>
        <div className='p-3 pe-5 text-white' style={{ background: 'linear-gradient(to right, rgba(0, 100, 0, 0.9) 0%, rgba(0, 100, 0, 0.5) 70%, transparent 100%)' }}>
          <h1 className="fw-bold">Fun Quizzes</h1>
          <h2>Anywhere, Anytime!</h2>
        </div>
      </div>
      <div className="bg-light">
        <div className="row">
          <div className="col-12 col-lg-6 pt-2">
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
          <div className="col-12 col-lg-6 pt-2">
            <div className="p-3 p-lg-5 pb-lg-3">
            <p>It's as easy as 1-2-3! Simply select your desired topic, choose the number of questions you want to tackle, and dive into the quiz. No lengthy sign-ups or complicated steps—just straightforward, fun, and educational quizzing. So why wait? Plunge right in.</p>
              <div className="p-3 p-lg-4 border bg-white rounded" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="topic" className="form-label">Coding Topic:</label>
                    <select
                      id="topic"
                      className="form-select"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select from this list</option>
                      {topicsForDropdown.map((topic) => (
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
                      min="2"
                      max="30"
                      step="1"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                    />
                    <span className="ms-2">{numQuestions} questions</span>
                  </div>

                  <button type="submit" className="btn btn-primary">Take the Quiz</button>
                </form>
              </div>
              <p className='text-center mt-3 faded-text'>Need a break from coding topics? <a href="/trivia" title="with questions on non-coding topics">Play Trivia</a> instead!</p>
            </div>
          </div>
        </div>
        { topicsForQuickQuiz.length > 0 ? (
          <div className="row p-3 p-lg-5 pt-lg-0">
          <h3 className="mb-3">Featured Quizzes</h3>
          <p className="mb-3 mb-lg-4">Unsure which topic to choose or how many questions you'd like to tackle?<br/>We've got you covered! Dive into our selection of 10-question quick quizzes—perfect for getting started and finding your groove.</p>
          {topicsForQuickQuiz.map((topic) => (
            <div key={topic.id} className="col-12 col-md-6 mb-4">
              <div className="card h-100 d-flex flex-row" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                <div className="card-img-left">
                  <img 
                    src={`./assets/topic-logos/${topic.name.toLowerCase()}.png`} 
                    className="img-fluid" 
                    alt={`${topic.name} logo`} 
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{topic.name}</h5>
                    <p className="card-text">Test your knowledge with 10 questions on {topic.name}.</p>
                  </div>
                  <button 
                    className="btn btn-success align-self-end"
                    onClick={(e) => handleSubmit(e, topic.id, 10)}
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
          ) : (<div style={{ fontSize: "0", lineHeight: "0"}}>&nbsp;</div>)
        }
        

        <div className="row" style={{ padding: "0 0.8rem 0 0.8rem" }}>
          <div className="col col-12 text-center" style={{ background: "url('./assets/images/binary-codes-pattern-bottom-cropped-greyscale.png')" }}>
            <div className="text-center px-5 pt-5">
              <img src="./assets/images/Home-Page-Footer-Attachment.png" alt="Human evolution - from the Ape to the Coder" title="Code! Evolve!! Survive!!!" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;