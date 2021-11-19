import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/users/',
  });

 export default instance;