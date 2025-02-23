import axios from 'axios'
import { API_BASE_URL } from '@api/constant'
import { LOCAL_STORAGE_VALUES } from '@constant/Localstorage'

// Configure the base axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Request Interceptor to add Authorization header
const addAuthorizationHeader = (config: any) => {
  const token = localStorage.getItem(LOCAL_STORAGE_VALUES.ucType_);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

// Response Interceptor to handle errors
const handleErrorResponse = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Handle 401 (unauthorized) by removing token from localStorage
    if (error.response?.status === 401 && localStorage.getItem(LOCAL_STORAGE_VALUES.ucType_)) {
      localStorage.removeItem(LOCAL_STORAGE_VALUES.ucType_);
      localStorage.removeItem(LOCAL_STORAGE_VALUES.clu);
      window.location.href = '/auth/login'
    }
    return Promise.reject(error);
  }
}

// Apply interceptors
axiosInstance.interceptors.request.use(addAuthorizationHeader, (error) => Promise.reject(error));
axiosInstance.interceptors.response.use((response) => response, handleErrorResponse);