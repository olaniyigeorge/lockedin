

import { useGlobalState } from '@/globalStore';
import axios, { AxiosError } from 'axios';
import { ExtendedAxiosRequestConfig } from './types';

// Move state access inside functions instead of top level
const authToken = useGlobalState.getState().authToken;

interface ErrorResponse {
  message: string;
  statusCode?: number;
}

const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Only set withCredentials if your backend is configured to handle credentials
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config: ExtendedAxiosRequestConfig) => {
    // console.log('authToken', authToken);
    if (authToken) {
      config.headers.set('Authorization', `Bearer ${authToken}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred on the server';
      return Promise.reject({ errorMessage });
    }

    // Include more detailed error information
    return Promise.reject({
      message: 'Network error or server not reachable',
      originalError: error,
    });
  }
);

export default axiosInstance;
