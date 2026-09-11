import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/auth.slice";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
let isLoggingOut = false;
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      store.dispatch(logout());

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
