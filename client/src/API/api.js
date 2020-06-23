import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: 'json',
});

export default apiInstance;
