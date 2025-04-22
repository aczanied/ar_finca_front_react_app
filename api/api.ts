import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-agrocosta.azurewebsites.net/api', // <-- usa tu IP real, no localhost
  timeout: 10000,
});

export default api;