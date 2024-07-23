import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const BulkAddQuestionsComponent = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleUpload = () => {
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
                    topicId: parseInt(question['topicId'], 10) // Ensure the topicId is correctly parsed as an integer
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
                <Col>
                    <p>Please upload a CSV file containing the questions for bulk upload. Make sure to follow the right format for the data in your CSV file. &lt; instructions on column headings to be added, and instruction on topicId to be explained &gt; - Also, another item TBA - a way to download a sample CSV file.</p>
                    <Form>
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
