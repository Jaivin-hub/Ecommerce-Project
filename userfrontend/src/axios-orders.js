import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://jaivin.online/users',
  baseURL: 'http://localhost:8000/users'

  });

 export default instance;