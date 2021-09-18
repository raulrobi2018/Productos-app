import axios from 'axios';

const baseURL = 'http://192.168.0.113:3001/api';

const cafeApi = axios.create({baseURL});

export default cafeApi;
