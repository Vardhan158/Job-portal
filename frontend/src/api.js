import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized — clearing session");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;

export const setAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthUser = () => JSON.parse(localStorage.getItem("user") || "null");
export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.clear();
export const isLoggedIn = () => !!localStorage.getItem("token");
