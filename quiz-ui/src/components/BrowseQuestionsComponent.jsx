import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Row, Col, Dropdown, Alert } from 'react-bootstrap';
import { getAllQuestions, updateQuestion, deleteQuestion, bulkDeleteQuestions } from '../services/questionService';
import { getAllTopics } from '../services/topicService';

const BrowseQuestionsComponent = ({ refreshTrigger }) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    fetchQuestions();
    fetchTopics();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      fetchQuestions();
    }
  }, [refreshTrigger]);

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchTopics = async () => {
    try {
      const data = await getAllTopics();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleShow = (question) => {
    setCurrentQuestion({ ...question, topicId: question.topic ? question.topic.id : '' });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentQuestion(null);
  };

  const handleSave = async () => {
    try {
      await updateQuestion(currentQuestion.id, {
        ...currentQuestion,
        topicId: parseInt(currentQuestion.topicId)
      });
      fetchQuestions();
      handleClose();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async (questionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
      try {
        await deleteQuestion(questionId);
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected questions?");
    if (confirmDelete) {
      try {
        await bulkDeleteQuestions(selectedQuestions);
        setMessageType('success');
        setMessage('Selected questions deleted successfully.');
        fetchQuestions();
      } catch (error) {
        setMessageType('danger');
        setMessage('Error deleting selected questions.');
        console.error("Error deleting questions:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    if (topicId === "all") {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(question => question.topic && question.topic.id === parseInt(topicId)));
    }
  };

  const handleSelectQuestion = (questionId) => {
    setSelectedQuestions((prevSelected) => {
      if (prevSelected.includes(questionId)) {
        return prevSelected.filter(id => id !== questionId);
      } else {
        return [...prevSelected, questionId];
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-end justify-content-between">
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Select A Topic to Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {topics.map((topic) => (
              <Dropdown.Item key={topic.id} onClick={() => handleTopicSelect(topic.id)}>
                {topic.name}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleTopicSelect("all")}>All Topics</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="danger" className="mb-3" onClick={handleBulkDelete}>Delete Selected Questions</Button>
      </div>
      {message && (
        <Alert variant={messageType} className="mt-4">
          {message}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>#</th>
            <th>Q-ID</th>
            <th>Question Text</th>
            <th>Answer Options</th>
            <th>Correct Answer</th>
            <th>Topic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question, index) => (
            <tr key={question.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleSelectQuestion(question.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{question.id}</td>
              <td>{question.content}</td>
              <td>
                <ul>
                  <li>{question.optionA}</li>
                  <li>{question.optionB}</li>
                  <li>{question.optionC}</li>
                  <li>{question.optionD}</li>
                </ul>
              </td>
              <td>{question.answer}</td>
              <td>{question.topic ? question.topic.name : 'No Topic'}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(question)}>Edit</Button>&nbsp;&nbsp;
                <Button variant="danger" onClick={() => handleDelete(question.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentQuestion && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Question Text</Form.Label>
                <Form.Control type="text" name="content" value={currentQuestion.content} onChange={handleChange} />
              </Form.Group>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Option A</Form.Label>
                    <Form.Control type="text" name="optionA" value={currentQuestion.optionA} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Option B</Form.Label>
                    <Form.Control type="text" name="optionB" value={currentQuestion.optionB} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Option C</Form.Label>
                    <Form.Control type="text" name="optionC" value={currentQuestion.optionC} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Option D</Form.Label>
                    <Form.Control type="text" name="optionD" value={currentQuestion.optionD} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control as="select" name="answer" value={currentQuestion.answer} onChange={handleChange}>
                  <option value="">Select the correct answer</option>
                  {currentQuestion.optionA && <option value={currentQuestion.optionA}>{currentQuestion.optionA}</option>}
                  {currentQuestion.optionB && <option value={currentQuestion.optionB}>{currentQuestion.optionB}</option>}
                  {currentQuestion.optionC && <option value={currentQuestion.optionC}>{currentQuestion.optionC}</option>}
                  {currentQuestion.optionD && <option value={currentQuestion.optionD}>{currentQuestion.optionD}</option>}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Topic</Form.Label>
                <Form.Control as="select" name="topicId" value={currentQuestion.topicId} onChange={handleChange}>
                  <option value="">Select a topic</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSave}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BrowseQuestionsComponent;
