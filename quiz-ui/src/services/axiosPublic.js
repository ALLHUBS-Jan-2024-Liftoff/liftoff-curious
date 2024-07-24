import axios from 'axios';

const axiosPublicInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend base URL
});

export default axiosPublicInstance;