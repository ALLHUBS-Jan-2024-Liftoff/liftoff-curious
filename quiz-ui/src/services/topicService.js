import axios from "axios";

const BASEAPIURL = "http://localhost:8080";

export const getAllTopics = async () => {
  try {
    const response = await axios.get(`${BASEAPIURL}/quiz-api/topics/all`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the topics!", error);
    throw error;
  }
};

export const getTopicById = async (topicId) => {
    try {
      const response = await axios.get(`${BASEAPIURL}/quiz-api/topics/${topicId}`);
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the topic!", error);
      throw error;
    }
};

export const createTopic = async (name) => {
    try {
        const response = await axios.post(`${BASEAPIURL}/quiz-api/topics`, { name: name });
        return response.data;
    } catch (error) {
        console.error("There was an error creating the topic!", error);
        throw error;
    }
};

export const updateTopic = async (topicId, topic) => {
    try {
        const response = await axios.put(`${BASEAPIURL}/quiz-api/topics/${topicId}`, topic);
        return response.data;
    } catch (error) {
        console.error("Error updating topic:", error);
        throw error;
    }
};

export const deleteTopic = async (topicId) => {
    try {
        const response = await axios.delete(`${BASEAPIURL}/quiz-api/topics/${topicId}`);
        return response.data;    
    } catch (error) {
        console.error("There was an error deleting the topic!", error);
        throw error;
    }
};
