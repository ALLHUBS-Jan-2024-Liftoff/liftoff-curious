import React, { useState, useContext } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const BulkAddQuestionsComponent = () => {
  const { authenticated } = useContext(AuthContext);
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!authenticated) {
      setMessageType('danger');
      setMessage('Please log in to upload questions.');
      return;
    }
    if (!csvFile) {
      setMessageType('danger');
      setMessage('Please select a CSV file to upload.');
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        const questions = results.data.map(question => ({
          content: question.content,
          answer: question.answer,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          topicId: parseInt(question['topicId'], 10)
        }));

        axios.post('http://localhost:8080/quiz-api/questions/bulk-upload', {
          questions: questions
        })
        .then(response => {
          setMessageType('success');
          setMessage('Upload successful');
        })
        .catch(error => {
          setMessageType('danger');
          setMessage('Upload failed. Please try again.');
          console.error('Error:', error);
        });
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col className="pt-2 pt-lg-4 pb-2 pb-lg-4">
          <p>Please upload a CSV file containing the questions for bulk upload</p>
          <details>
            <summary><u>Instructions</u></summary>
            <p className="mt-2">Make sure to follow the right format for the data in your CSV file as explained in the below image.</p>
            <p className="mt-2">As you can see the topicId column should contain an number against each question. Ensure that the topics are existing and their ids are correct before you add a question in that topic. For example, if in your list of topics HTML has a topic id of 1, that number should go in the topicId field against each question on HTML topic.</p>
            <p className="mt-2"><img src="./assets/images/csv-template.jpg" alt="Image explaining the CSV File Template" className="img-fluid"/></p>
          </details>
          <details>
            <summary><u>Useful Downloads</u></summary>
            <p className="mt-2">
              Download these utility files:&nbsp; 
              <a href="./csv/questions_blank-csv-template.csv" title="Click to download" download>CSV File Blank Template</a>&nbsp;|&nbsp; 
              <a href="./csv/sample_questions.csv" title="Click to download" download>CSV with Sample Questions</a>
            </p>
          </details>
          <Form className='mt-4'>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload CSV File</Form.Label>
              <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>Upload CSV</Button>
          </Form>
          {message && (
            <Alert variant={messageType} className="mt-4">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BulkAddQuestionsComponent;
