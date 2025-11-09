// frontend/src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobPosted from "./pages/JobPosted";
import JobPosting from "./pages/JobPosting";
import CustomerAnalysis from "./pages/CustomerAnalysis";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobForm from "./pages/JobForm";
import { Toaster } from "react-hot-toast";
import { isLoggedIn, logout } from "./api";

/* ========================================================
   ✅ Protected Route Wrapper
   Redirects to /login if not authenticated
======================================================== */
const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

/* ========================================================
   ✅ Logout Handler Component
   Clears token and redirects to login
======================================================== */
const LogoutHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout(); // clear token + user
    navigate("/login", { replace: true });
  }, [navigate]);
  return null;
};

/* ========================================================
   ✅ Main App Component
======================================================== */
export default function App() {
  return (
    <>
      {/* ✅ Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "10px 14px",
          },
        }}
      />

      <Router>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={isLoggedIn() ? <Navigate to="/dashboard/jobs" replace /> : <Login />}
          />

          <Route
            path="/register"
            element={isLoggedIn() ? <Navigate to="/dashboard/jobs" replace /> : <Register />}
          />

          {/* 🧭 Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* Default Dashboard Route */}
            <Route index element={<Navigate to="jobs" replace />} />

            {/* Subpages */}
            <Route path="jobs" element={<JobPosted />} />
            <Route path="new" element={<JobPosting />} />
            <Route path="analysis" element={<CustomerAnalysis />} />
            <Route path="profile" element={<Profile />} />
            <Route path="apply/:id" element={<JobForm />} />
          </Route>

          {/* 🚪 Logout Route (clears session) */}
          <Route path="/logout" element={<LogoutHandler />} />

          {/* 🚫 Catch-All Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}
