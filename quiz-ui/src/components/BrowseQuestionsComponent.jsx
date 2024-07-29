import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Table, Form, Row, Col, Dropdown, Alert } from 'react-bootstrap';
import { getAllQuestions, updateQuestion, deleteQuestion, bulkDeleteQuestions } from '../services/questionService';
import { getAllTopics } from '../services/topicService';
import AuthContext from '../context/AuthContext';

const BrowseQuestionsComponent = ({ refreshTrigger }) => {
  const { authenticated } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [show, setShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isBulkDeleteDisabled, setIsBulkDeleteDisabled] = useState(true);
  const [selectAll, setSelectAll] = useState(false); // State to keep track of whether all checkboxes are selected
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchQuestions();
      fetchTopics();
    }
  }, [authenticated]);

  useEffect(() => {
    if (refreshTrigger && authenticated) {
      fetchQuestions();
    }
  }, [refreshTrigger, authenticated]);

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

  const handleViewShow = (question) => {
    setCurrentQuestion(question);
    setViewShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setViewShow(false);
    setCurrentQuestion(null);
  };

  const handleSave = async () => {
    try {
      const selectedTopic = topics.find(topic => topic.id === parseInt(currentQuestion.topicId));
      const questionWithTopic = {
        ...currentQuestion,
        topic: selectedTopic,
      };
      await updateQuestion(currentQuestion.id, questionWithTopic);
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

  const handleTopicChange = (e) => {
    const { value } = e.target;
    setCurrentQuestion({ ...currentQuestion, topicId: value });
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
      let newSelected;
      if (questionId === 'all') { // Change here
        if (selectAll) { // Change here
          newSelected = []; // Change here
          setSelectAll(false); // Change here
        } else {
          newSelected = questions.map(question => question.id); // Change here
          setSelectAll(true); // Change here
        }
      } else {
        newSelected = prevSelected.includes(questionId)
          ? prevSelected.filter(id => id !== questionId)
          : [...prevSelected, questionId];
        if (newSelected.length === questions.length) {
          setSelectAll(true); // Change here
        } else {
          setSelectAll(false); // Change here
        }
      }
      setIsBulkDeleteDisabled(newSelected.length === 0);
      return newSelected;
    });
  };

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  if (!authenticated) {
    return <p>Please log in to view the questions.</p>;
  }

  return (
    <div className="container p-0 mt-4">
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
        <Button
          variant="danger"
          className="mb-3"
          onClick={handleBulkDelete}
          disabled={isBulkDeleteDisabled}
        >
          <span className="d-flex d-lg-none">Delete Selected</span><span className="d-none d-lg-flex">Delete Selected Questions</span>
        </Button>
      </div>
      {message && (
        <Alert variant={messageType} className="mt-4">
          {message}
        </Alert>
      )}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check // Change here
                type="checkbox" // Change here
                checked={selectAll} // Change here
                onChange={() => handleSelectQuestion('all')} // Change here
              />
            </th>
            <th>#</th>
            <th>ID</th>
            <th>Question</th>
            <th>Topic</th>
            <th className="actions-column">Actions</th>
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
              <td>
                  {truncateString(`Q: ${question.content} Ans: ${question.answer} Choices: A) ${question.optionA}, B) ${question.optionB}, C) ${question.optionC}, D) ${question.optionD}`, screenWidth >= 800 ? 200 : 50)}
              </td>
              <td>{question.topic ? question.topic.name : 'No Topic'}</td>
              <td className="actions-column">
                <Button variant="info" onClick={() => handleViewShow(question)} className="me-lg-2 mb-1">
                  <i className="fas fa-eye text-white"></i>
                </Button>
                <Button variant="warning" onClick={() => handleShow(question)} className="me-lg-2 mb-1">
                  <i className="fas fa-edit text-white"></i>
                </Button>
                <Button variant="danger" onClick={() => handleDelete(question.id)} className="me-lg-2 mb-1">
                  <i className="fas fa-trash-alt text-white"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentQuestion && (
        <>
          <Modal show={viewShow} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>View Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Question Text:</strong> {currentQuestion.content}</p>
              <p><strong>Option A:</strong> {currentQuestion.optionA}</p>
              <p><strong>Option B:</strong> {currentQuestion.optionB}</p>
              <p><strong>Option C:</strong> {currentQuestion.optionC}</p>
              <p><strong>Option D:</strong> {currentQuestion.optionD}</p>
              <p><strong>Correct Answer:</strong> {currentQuestion.answer}</p>
              <p><strong>Topic:</strong> {currentQuestion.topic ? currentQuestion.topic.name : 'No Topic'}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

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
                  <Form.Control as="select" name="topicId" value={currentQuestion.topicId} onChange={handleTopicChange}>
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
        </>
      )}
    </div>
  );
};

export default BrowseQuestionsComponent;
