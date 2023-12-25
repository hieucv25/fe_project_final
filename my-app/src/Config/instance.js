import axios from 'axios';

const PORT = "http://localhost:8080/";

export const instance = axios.create({
  baseURL: PORT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(
  function (config) {
    const time = new Date(localStorage.getItem('expirationTime_Token'));
    const now = new Date();
    if (now >= time) {
      return Promise.reject("Expired token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

