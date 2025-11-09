// =====================================
// 🌐 Backend Entry Point (server.js)
// =====================================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// =====================================
// 🧩 Load environment variables & connect DB
// =====================================
dotenv.config();
connectDB();

// =====================================
// ⚙️ Initialize Express App
// =====================================
const app = express();

// =====================================
// 🛡️ Global Middleware
// =====================================

// ✅ Enable CORS for frontend communication
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies/auth headers
  })
);

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ HTTP Request logger (for development)
app.use(morgan("dev"));

// =====================================
// 🗂️ Static Files (for uploaded resumes or profile photos)
// =====================================

// Serve uploads from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Ensure resume folder exists (for safety)
const fs = require("fs");
const uploadsDir = path.join(__dirname, "uploads", "resumes");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads/resumes folder");
}

// =====================================
// 🚀 Health Check Route
// =====================================
app.get("/", (req, res) => {
  res.send("✅ Job Selection API is running successfully 🚀");
});

// =====================================
// 📦 Main API Routes
// =====================================
app.use("/api/auth", authRoutes); // Authentication (Login, Register, Google)
app.use("/api/jobs", jobRoutes); // Job CRUD routes
app.use("/api/applications", applicationRoutes); // Job applications

// =====================================
// ⚠️ Error Handling Middleware
// =====================================
app.use(notFound);
app.use(errorHandler);

// =====================================
// 🚀 Start Server
// =====================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Access API: http://localhost:${PORT}`);
});
