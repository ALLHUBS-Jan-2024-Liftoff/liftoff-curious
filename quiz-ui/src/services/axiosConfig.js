import axios from 'axios';

const axiosAuthInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080', // backend base URL
});

export default axiosAuthInstance;