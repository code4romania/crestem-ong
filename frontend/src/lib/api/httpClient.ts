import axios from 'axios';
import { API_URL, DEV_MODE } from '@config';
import { logger } from '@lib/log';

const headers = {
  'Cache-Control': 'no-cache'
};

const HttpClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers
});

/**
 * Logging request/repsonse interceptors
 */
const log = logger.extend('http:client');

HttpClient.interceptors.request.use(
  (config) => {
    DEV_MODE &&
      log('%s %s%s', config.method.toUpperCase(), config.baseURL, config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

HttpClient.interceptors.response.use(
  (response) => {
    DEV_MODE && log('%s %s', response.status, response.statusText);
    return response;
  },
  ({ request, response }) => {
    if (!response) {
      log('request failed');
      return Promise.reject({
        message: 'The request was made but no response was received',
        context: { request }
      });
    }
    log('%s %s | %s', response?.status, response?.statusText, response?.data?.message);
    return Promise.resolve({ context: response, message: response.data?.message });
  }
);

export default HttpClient;
