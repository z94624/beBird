import axios from 'axios';

export const ebird = axios.create({
    baseURL: 'https://api.ebird.org/v2',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        'X-eBirdApiToken': import.meta.env.VITE_EBIRD_API_KEYGEN,
    },
    method: 'get',
    timeout: 100,
    maxBodyLength: Infinity,
});
