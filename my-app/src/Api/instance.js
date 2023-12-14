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
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

