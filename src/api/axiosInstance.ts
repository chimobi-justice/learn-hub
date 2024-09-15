import axios from 'axios'

import { API_BASE_URL } from '@api/constant'

axios.defaults.baseURL = API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ucType_');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('ucType_');
//       // window.location.href = '/auth/login'
//     }
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'An unexpected error occurred');
    }
    return Promise.reject(new Error('An unexpected error occurred'));
  }
);
