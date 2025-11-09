// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobPosted from "./pages/JobPosted";
import JobPosting from "./pages/JobPosting";
import CustomerAnalysis from "./pages/CustomerAnalysis";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobForm from "./pages/JobForm";
import { Toaster } from "react-hot-toast";
import { isLoggedIn } from "./api"; // ✅ helper from api.js
import React from "react";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🧭 Protected Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              isLoggedIn() ? <Dashboard /> : <Navigate to="/login" replace />
            }
          >
            <Route index element={<Navigate to="jobs" replace />} /> {/* default dashboard page */}
            <Route path="jobs" element={<JobPosted />} />
            <Route path="new" element={<JobPosting />} />
            <Route path="analysis" element={<CustomerAnalysis />} />
            <Route path="profile" element={<Profile />} />
            <Route path="apply/:id" element={<JobForm />} />
          </Route>

          {/* 🚫 Catch-All Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}
