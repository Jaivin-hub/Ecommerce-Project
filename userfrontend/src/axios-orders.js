import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jaivin.online/users',
  // baseURL: 'http://localhost:5000/users'

  });

 export default instance;