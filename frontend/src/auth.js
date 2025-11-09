/* ======================================================
   🔐 Auth Storage Utilities
   Handles saving and retrieving JWT + user data securely
====================================================== */

export const setAuth = ({ token, user }) => {
  if (!token || !user) {
    console.error("❌ setAuth called without token or user.");
    return;
  }
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

/* ======================================================
   👤 Get Logged-In User Object
====================================================== */
export const getAuthUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.warn("⚠️ Failed to parse user from localStorage:", err);
    return null;
  }
};

/* ======================================================
   🧩 Get Stored Token
====================================================== */
export const getToken = () => localStorage.getItem("token");

/* ======================================================
   🚪 Logout and Clear Session
====================================================== */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // optional UX improvement:
  window.location.href = "/login"; // redirect immediately after logout
};

/* ======================================================
   🧭 Auth Status Check
====================================================== */
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token && token.length > 10; // simple sanity check
};
