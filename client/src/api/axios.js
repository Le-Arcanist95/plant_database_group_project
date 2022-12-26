import axios from 'axios';

const serverClient = axios.create({
    baseURL: 'https://localhost:1254'
});

const trefleClient = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/',
    params: {
        token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o',
    }
});

export { serverClient, trefleClient };