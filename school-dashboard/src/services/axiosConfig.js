// src/services/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Make sure this matches your FastAPI address
});

export default api;
