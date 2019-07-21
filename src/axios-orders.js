import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:8085/burger/build/'
});

export default instance;