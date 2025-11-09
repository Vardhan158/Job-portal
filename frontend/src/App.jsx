// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobPosted from "./pages/JobPosted";
import JobPosting from "./pages/JobPosting";
import CustomerAnalysis from "./pages/CustomerAnalysis";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobForm from "./pages/JobForm"; // ✅ Import new JobForm page
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      {/* ✅ Global Toast Notification */}
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
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🧭 Protected Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="jobs" element={<JobPosted />} />
            <Route path="new" element={<JobPosting />} />
            <Route path="analysis" element={<CustomerAnalysis />} />
            <Route path="profile" element={<Profile />} />

            {/* ✅ Job Application Form Route */}
            <Route path="apply/:id" element={<JobForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
