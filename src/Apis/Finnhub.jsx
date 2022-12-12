import axios from 'axios';

const TOKEN = "cdiqnbaad3i9g9pvvrj0cdiqnbaad3i9g9pvvrjg";

export const finnhub = axios.create({
    baseURL: "https://finnhub.io/api/v1",
    //headers: {Accept: 'application/json'},
    params: { token: TOKEN }
});

export default finnhub;