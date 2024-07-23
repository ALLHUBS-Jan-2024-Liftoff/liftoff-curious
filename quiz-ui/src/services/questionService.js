import axios from "axios";

const BASEAPIURL = "http://localhost:8080";

export const getAllQuestions = async () => {
  try {
    const response = await axios.get(`${BASEAPIURL}/quiz-api/questions/all`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the questions!", error);
    throw error;
  }
};

export const getQuestionById = async (questionId) => {
  try {
    const response = await axios.get(`${BASEAPIURL}/quiz-api/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the question!", error);
    throw error;
  }
};

export const createQuestion = async (question) => {
  try {
    const response = await axios.post(`${BASEAPIURL}/quiz-api/questions`, question);
    return response.data;
  } catch (error) {
    console.error("There was an error creating the question!", error);
    throw error;
  }
};

export const updateQuestion = async (questionId, question) => {
  try {
    const response = await axios.put(`${BASEAPIURL}/quiz-api/questions/${questionId}`, question);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.delete(`${BASEAPIURL}/quiz-api/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the question!", error);
    throw error;
  }
};

export const bulkDeleteQuestions = async (questionIds) => {
  try {
    const response = await axios.delete(`${BASEAPIURL}/quiz-api/questions/bulk-delete`, {
      data: questionIds,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the questions!", error);
    throw error;
  }
};
