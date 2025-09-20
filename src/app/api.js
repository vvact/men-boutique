// src/app/api.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/", // update if your backend URL is different
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach access token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle 401 errors (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;
      try {
        // Refresh the access token
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post("http://localhost:8000/api/auth/token/refresh/", {
          refresh,
        });
        localStorage.setItem("access", res.data.access);

        // Retry original request
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
