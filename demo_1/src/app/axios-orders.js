import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jaivin.online/users',
});
export default instance;