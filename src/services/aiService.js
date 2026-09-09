// src/services/apiService.js

import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // We don't require customer login.
    //
    // Admin authentication can be added here later
    // if your admin app shares this API instance.

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";

    console.error(
      "API Error:",
      message
    );

    return Promise.reject(error);
  }
);

export default api;