import axios from 'axios';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
}

export const setAuthHeader = (token) => {
    window.localStorage.setItem('auth_token', token);
}

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-Type"] = 'application/json'

 export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
}
