import axios from 'axios';

const axiosAuthInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080', // Replace with your backend base URL
});

export default axiosAuthInstance;