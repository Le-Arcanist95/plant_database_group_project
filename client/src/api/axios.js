import axios from 'axios';
const SERVER_URL = 'http://localhost:1254';

const backendClient = axios.create({
    baseURL: SERVER_URL,
});

const privateBackendClient = axios.create({
    baseURL: SERVER_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

const trefleToken = backendClient.get('/trefleAuth')
    .then(response => response.data.token)
    .catch(error => {console.log(error)});

console.log(trefleToken);
const trefleClient = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/',
    params: {
        token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o',
    }
});

export { backendClient, privateBackendClient, trefleClient };