import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxied to backend by Vite in dev, set a full URL in production
});

// Attach JWT token to every request if the user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hrc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401 responses (expired/invalid token)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("hrc_token");
      localStorage.removeItem("hrc_user");
    }
    return Promise.reject(error);
  }
);

export default api;
