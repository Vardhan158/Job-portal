export const setAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthUser = () => JSON.parse(localStorage.getItem("user") || "null");
export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.clear();
export const isLoggedIn = () => !!localStorage.getItem("token");
