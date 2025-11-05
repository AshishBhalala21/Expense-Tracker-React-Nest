import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000', // your NestJS backend
  withCredentials: true, // allow cookies if you use them
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
