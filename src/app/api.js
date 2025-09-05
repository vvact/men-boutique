import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://gentlemanwell.shop/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
