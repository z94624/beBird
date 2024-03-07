import axios from 'axios';

const eBirdAPI = axios.create({
    baseURL: 'https://api.ebird.org/v2',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
    },
});
