// frontend/src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://job-portal-qxmq.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

/* 🔐 Auth Helpers */
export const setAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthUser = () => JSON.parse(localStorage.getItem("user") || "null");
export const getToken = () => localStorage.getItem("token");
export const isLoggedIn = () => !!localStorage.getItem("token");

/* 🚪 Logout Helper */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
