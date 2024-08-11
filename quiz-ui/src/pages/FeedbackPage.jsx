import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

function FeedbackPage() {
  const location = useLocation();
  const { quizData, topic } = location.state || { quizData: [], topic: '' };

  const totalQuestions = quizData.length;
  const attemptedQuestions = quizData.filter((q) => typeof q.userAnswer === 'string').length;
  const correctAnswers = quizData.filter((q) => q.userAnswer === q.answer).length;
  const wrongAnswers = attemptedQuestions - correctAnswers;

  const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
  const wrongPercentage = ((wrongAnswers / totalQuestions) * 100).toFixed(2);
  const attemptedPercentage = ((attemptedQuestions / totalQuestions) * 100).toFixed(2);

  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const downloadPDF = () => {
    const input = document.getElementById('feedback-container');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const imgWidth = pdfWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin; // Start position for the first page with top margin

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 2 * margin;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight - 2 * margin;
        }

        pdf.save('quiz_feedback.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const handleSendEmail = () => {
    const feedbackContent = document.getElementById('feedback-content').innerHTML;
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('email', userEmail);
    formData.append('htmlContent', feedbackContent);

    axios.post('http://localhost:8080/app/send-email', formData)
      .then(() => {
        setEmailSent(true);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div style={{ minHeight: '850px'}} className="container py-3 py-lg-5 bg-white px-lg-4" id="feedback-container">
      <div className="row">
        <div className="col-6">
          <h4>Quiz Feedback</h4>
        </div>
        <div className="col-6 text-end">
          <Button variant="primary" onClick={downloadPDF}>Download PDF</Button>
          <Button variant="secondary" className="ms-0 ms-lg-2 mt-3 mt-lg-0" onClick={() => setShowModal(true)}>Email Feedback</Button>
        </div>
      </div>
      <div id="feedback-content">
        <Table striped bordered hover className="mt-4 rounded responsive" responsive>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Total Questions</th>
              <th>Attempted</th>
              <th>Correct</th>
              <th>Incorrect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{topic}</td>
              <td>{totalQuestions}</td>
              <td>{attemptedQuestions} / {totalQuestions} ({attemptedPercentage}%)</td>
              <td>
                {correctAnswers} / {totalQuestions} ({correctPercentage}%)
              </td>
              <td>
                {wrongAnswers} / {totalQuestions} ({wrongPercentage}%)
              </td>
            </tr>
          </tbody>
        </Table>

        {quizData.map((question, index) => (
          <div key={question.id} className="mb-4 p-3 border rounded feedback-section">
            <p>
              <strong>Q{index + 1}: {question.content}</strong>
            </p>
            <div>
              {['optionA', 'optionB', 'optionC', 'optionD'].map((optionKey, i) => (
                <div key={optionKey} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`option${index}-${i}`}
                    name={`question${index}`}
                    value={question[optionKey]}
                    checked={question.userAnswer === question[optionKey]}
                    readOnly
                  />
                  <label className="form-check-label" htmlFor={`option${index}-${i}`}>
                    <span className="badge bg-light text-dark me-2">Option {String.fromCharCode(65 + i)}:</span> {question[optionKey]}
                    {question.userAnswer === question[optionKey] && (
                      <span style={{ backgroundColor: question.userAnswer === question.answer ? '#198754' : '#dc3545', color: 'white' }}
                        className={`badge ms-2 ${question.userAnswer === question.answer ? 'bg-success' : 'bg-danger'}`}
                      >
                        {question.userAnswer === question.answer ? '✓ Your Answer' : '✗ Your Answer'}
                      </span>
                    )}
                    {question.answer === question[optionKey] && (
                      <span className="badge text-dark ms-2" style={{ backgroundColor: '#d4edda' }}>✓ Correct Answer</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4">
        Thank you for taking the quiz! If you want to play again, start your selections on the{' '}
        <Link to="/">home page</Link>.
      </p>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Email Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emailSent ? (
            <p>Email sent successfully!</p>
          ) : (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {!emailSent && (
            <Button variant="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FeedbackPage;
