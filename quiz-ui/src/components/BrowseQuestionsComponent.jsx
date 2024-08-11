import React, { useEffect, useState, useContext } from 'react';
import { Button, Modal, Table, Form, Row, Col, Dropdown, Alert, Pagination } from 'react-bootstrap';
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
  const [selectAll, setSelectAll] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedTopicName, setSelectedTopicName] = useState("Select A Topic to Filter");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

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
        setSelectedQuestions([]);
        setSelectAll(false);
  
        // Reset topic selection and pagination
        setSelectedTopic(null);
        setSelectedTopicName("Select A Topic to Filter");
        setFilteredQuestions(questions); // Show all questions
        setCurrentPage(1); // Reset to first page
  
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
    // Reset alert message
    setMessage(null);
    setMessageType(null);
    
    setSelectedQuestions([]);
    setSelectAll(false);
  
    if (topicId === "all") {
      setSelectedTopicName("All Topics");
      setFilteredQuestions(questions);
    } else {
      const selectedTopic = topics.find(topic => topic.id === parseInt(topicId));
      setSelectedTopicName(selectedTopic ? selectedTopic.name : "Select A Topic");
      setFilteredQuestions(questions.filter(question => question.topic && question.topic.id === parseInt(topicId)));
    }
    setSelectedTopic(topicId);
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  

  const handleSelectQuestion = (questionId) => {
    setSelectedQuestions((prevSelected) => {
      let newSelected;
      if (questionId === 'all') {
        if (selectAll) {
          // If currently selecting all, unselect all visible questions
          newSelected = prevSelected.filter(id => !currentQuestions.some(q => q.id === id));
          setSelectAll(false);
        } else {
          // If not currently selecting all, select all visible questions
          const visibleQuestionIds = currentQuestions.map(question => question.id);
          newSelected = Array.from(new Set([...prevSelected, ...visibleQuestionIds]));
          setSelectAll(true);
        }
      } else {
        // Toggle individual question selection
        newSelected = prevSelected.includes(questionId)
          ? prevSelected.filter(id => id !== questionId)
          : [...prevSelected, questionId];
  
        // Check if all visible questions are selected
        const allVisibleSelected = currentQuestions.every(question => newSelected.includes(question.id));
        setSelectAll(allVisibleSelected);
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

  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => {
    // Reset alert message
    setMessage(null);
    setMessageType(null);
    
    setSelectedQuestions([]);
    setSelectAll(false);
    setCurrentPage(pageNumber);
  };  

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  const getPaginationItems = () => {
    let items = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
      items.push(<Pagination.Item key={1} onClick={() => paginate(1)}>{1}</Pagination.Item>);
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      items.push(<Pagination.Item key={totalPages} onClick={() => paginate(totalPages)}>{totalPages}</Pagination.Item>);
    }

    return items;
  };

  const handleDeleteAllQuestions = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all questions in the question bank? This action is irreversible.");
    if (confirmDelete) {
      try {
        const allQuestionIds = questions.map(question => question.id);
        await bulkDeleteQuestions(allQuestionIds);
        setMessageType('success');
        setMessage('All questions deleted successfully.');
        setSelectedQuestions([]);
        setSelectAll(false);
        fetchQuestions();
      } catch (error) {
        setMessageType('danger');
        setMessage('Error deleting all questions.');
        console.error("Error deleting questions:", error);
      }
    }
  };  

  return (
    <div className="container p-0 mt-4">
      <div className="d-flex align-items-end justify-content-between">
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {selectedTopicName == 'Select A Topic to Filter' ? `${selectedTopicName}` : `Topic: ${selectedTopicName}`}
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
              <Form.Check
                type="checkbox"
                checked={selectAll}
                onChange={() => handleSelectQuestion('all')}
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
          {currentQuestions.map((question, index) => (
            <tr key={question.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleSelectQuestion(question.id)}
                />
              </td>
              <td>{indexOfFirstQuestion + index + 1}</td>
              <td>{question.id}</td>
              <td>
                {truncateString(`Q: ${question.content} Ans: ${question.answer} Choices: A) ${question.optionA}, B) ${question.optionB}, C) ${question.optionC}, D) ${question.optionD}`, screenWidth >= 800 ? 200 : 50)}
              </td>
              <td>{question.topic ? question.topic.name : 'No Topic'}</td>
              <td className="actions-column">
                <Button variant="info" onClick={() => handleViewShow(question)} className="me-lg-2 mb-1" title="View">
                  <i className="fas fa-eye text-white"></i>
                </Button>
                <Button variant="warning" onClick={() => handleShow(question)} className="me-lg-2 mb-1" title="Edit">
                  <i className="fas fa-edit text-white"></i>
                </Button>
                <Button variant="danger" onClick={() => handleDelete(question.id)} className="me-lg-2 mb-1" title="Delete">
                  <i className="fas fa-trash-alt text-white"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center mt-4">
        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {getPaginationItems()}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
  
      <details className="mt-4">
        <summary className="text-danger"><strong>Danger Zone</strong></summary>
        <p className="mt-2">This action will delete all questions from the question bank. This operation is irreversible, so proceed with caution.</p>
        <Button variant="danger" onClick={handleDeleteAllQuestions}>
          Delete All Questions in Question Bank
        </Button>
      </details>
  
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