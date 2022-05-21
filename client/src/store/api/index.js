import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:1337/api/v1',
  withCredentials: true,
})

export default api