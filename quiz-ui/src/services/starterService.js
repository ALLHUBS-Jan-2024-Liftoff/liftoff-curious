import axios from "axios";

const BASEAPIURL = "http://localhost:8080";

export const fetchStarters = async () => {
  try {
    const response = await axios.get(`${BASEAPIURL}/api/starters/all`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the starters!", error);
    throw error;
  }
};

export const fetchStarterById = async (starterId) => {
    try {
      const response = await axios.get(`${BASEAPIURL}/api/starters/${starterId}`);
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the starter!", error);
      throw error;
    }
};

export const createStarter = async (message) => {
  try {
    const response = await axios.post(`${BASEAPIURL}/api/starters/new`, null, {
      params: { message },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error creating the starter!", error);
    throw error;
  }
};


export const updateStarter = async (starter) => {
    try {
      const response = await axios.put(`${BASEAPIURL}/api/starters/update`, starter);
      return response.data;
    } catch (error) {
      console.error("There was an error updating the starter!", error);
      throw error;
    }
};
 

export const deleteStarter = async (starterId) => {
  try {
    await axios.delete(`${BASEAPIURL}/api/starters/delete/${starterId}`);
  } catch (error) {
    console.error("There was an error deleting the starter!", error);
    throw error;
  }
};
