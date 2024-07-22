import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { createQuestion } from '../services/questionService';
import { getAllTopics } from '../services/topicService';

const AddQuestionComponent = () => {
  const [question, setQuestion] = useState({
    content: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answer: '',
    topicId: ''
  });
  const [topics, setTopics] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const data = await getAllTopics();
      setTopics(data);
    } catch (error) {
      console.error("There was an error fetching the topics!", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion({ ...question, topicId: parseInt(question.topicId) });
      setSubmitted(true);
      setError(false);
      setQuestion({
        content: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: '',
        topicId: ''
      });
    } catch (error) {
      console.error("There was an error creating the question!", error);
      setError(true);
      setSubmitted(false);
    }
  };

  return (
    <div className="container mt-4">
      <p>Please fill out the details to add a new question:</p>
      {submitted && <Alert variant="success">Question added successfully!</Alert>}
      {error && <Alert variant="danger">There was an error adding the question. Please try again.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Question Text</Form.Label>
          <Form.Control type="text" name="content" value={question.content} onChange={handleChange} />
        </Form.Group>
        <Row>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Option A</Form.Label>
              <Form.Control type="text" name="optionA" value={question.optionA} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Option B</Form.Label>
              <Form.Control type="text" name="optionB" value={question.optionB} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Option C</Form.Label>
              <Form.Control type="text" name="optionC" value={question.optionC} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Option D</Form.Label>
              <Form.Control type="text" name="optionD" value={question.optionD} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control as="select" name="answer" value={question.answer} onChange={handleChange}>
                <option value="">Select the correct answer</option>
                {question.optionA && <option value={question.optionA}>{question.optionA}</option>}
                {question.optionB && <option value={question.optionB}>{question.optionB}</option>}
                {question.optionC && <option value={question.optionC}>{question.optionC}</option>}
                {question.optionD && <option value={question.optionD}>{question.optionD}</option>}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group>
              <Form.Label>Topic</Form.Label>
              <Form.Control as="select" name="topicId" value={question.topicId} onChange={handleChange}>
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" className="mt-4 mb-4" type="submit">Add Question</Button>
      </Form>
    </div>
  );
};

export default AddQuestionComponent;