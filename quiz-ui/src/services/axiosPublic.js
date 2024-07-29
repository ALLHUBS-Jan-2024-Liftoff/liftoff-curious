import axios from 'axios';

const axiosPublicInstance = axios.create({
  baseURL: 'http://localhost:8080', // backend base URL
});

export default axiosPublicInstance;