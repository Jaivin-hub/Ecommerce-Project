import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8000/users'
  baseURL: 'https://jaivin.online/users',
});
export default instance;