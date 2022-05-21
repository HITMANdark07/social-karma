import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000/api',
  withCredentials: true,
})

export default api;