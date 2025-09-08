// src/api.js
import axios from "axios";

// Create base Axios instance
const api = axios.create({
  baseURL: "https://gentlemanwell.shop/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: add access token to headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 + normalize errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token refresh flow
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8000/api/auth/refresh/",
            { refresh: refreshToken }
          );

          localStorage.setItem("access_token", refreshResponse.data.access);
          localStorage.setItem("refresh_token", refreshResponse.data.refresh);

          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    // ✅ Normalize error into a string
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      (typeof error.response?.data === "string"
        ? error.response.data
        : JSON.stringify(error.response?.data)) ||
      error.message ||
      "Something went wrong";

    return Promise.reject(message);
  }
);

export default api;
