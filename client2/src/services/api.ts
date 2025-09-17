import axios, { type AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

/*
 * Token Refresh Mechanism:
 *
 * 1. When an API call fails with a 401 or token-expired header:
 *    - If not already refreshing, initiates a token refresh
 *    - If already refreshing, adds request to queue of subscribers
 *
 * 2. Token refresh process:
 *    - Gets current tokens from AsyncStorage
 *    - Calls refresh endpoint with existing tokens
 *    - Stores new tokens in AsyncStorage
 *    - Updates original request with new token
 *    - Retries original request
 *
 * 3. For concurrent requests during refresh:
 *    - Queues them as subscribers
 *    - Once refresh completes, replays all queued requests with new token
 *    - Prevents multiple simultaneous refresh calls
 *
 * 4. On refresh failure:
 *    - Clears tokens from storage
 *    - Redirects to login
 */

const API_BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

const TIMEOUT = 60 * 1000; // 60 seconds

// class TokenRefreshManager {
//   private isRefreshing = false;
//   private refreshSubscribers: ((token: string) => void)[] = [];

//   onRefreshed(token: string) {
//     this.refreshSubscribers.forEach((callback) => callback(token));
//     this.refreshSubscribers = [];
//   }

//   addRefreshSubscriber(callback: (token: string) => void) {
//     this.refreshSubscribers.push(callback);
//   }

//   setRefreshing(value: boolean) {
//     this.isRefreshing = value;
//   }

//   isCurrentlyRefreshing() {
//     return this.isRefreshing;
//   }

//   clearSubscribers() {
//     this.refreshSubscribers = [];
//   }
// }

// const tokenManager = new TokenRefreshManager();
export const publicAPI = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (request) => {
  try {
    const token = Cookies.get("jwt");

    if (!request.headers) {
      request.headers = {} as AxiosRequestHeaders;
    }

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error(err);
  }

  return request;
});
