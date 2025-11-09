const express = require("express");
const path = require("path");
const multer = require("multer");
const { protect } = require("../middleware/auth");
const {
  createApplication,
  getUserApplications,
} = require("../controllers/applicationController");

const router = express.Router();

// =====================================
// 🗂️ Multer Configuration for Resume Uploads
// =====================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/"); // Store resumes in 'uploads/resumes' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

// ✅ File Filter: Only allow PDF/DOC/DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, or DOCX files are allowed!"), false);
  }
};

// ✅ Initialize Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// =====================================
// 📋 Application Routes
// =====================================

// 📝 Create new job application (with resume upload)
router.post("/", protect, upload.single("resume"), createApplication);

// 📄 Get all applications for the logged-in user
router.get("/my", protect, getUserApplications);

module.exports = router;
