const Application = require("../models/Application");
const Job = require("../models/Job");
const multer = require("multer");
const path = require("path");

// =====================================
// 🗂️ Multer Configuration for File Upload
// =====================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/"); // Save files inside uploads/resumes/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// =====================================
// 📄 Create New Job Application
// =====================================
exports.createApplication = async (req, res) => {
  try {
    const {
      jobId,
      name,
      email,
      location,
      collegeName,
      tenthPercentage,
      degreePercentage,
      selectedLanguage,
      communication,
    } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // ✅ Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Build resume path
    const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;

    // ✅ Map programming preference
    const programming = {
      java: selectedLanguage === "Java" ? 5 : 0,
      python: selectedLanguage === "Python" ? 5 : 0,
      mern: selectedLanguage === "MERN" ? 5 : 0,
      testing: selectedLanguage === "Software Testing" ? 5 : 0,
    };

    // ✅ Create Application Document
    const application = await Application.create({
      job: job._id,
      user: req.user._id,
      name,
      email,
      location,
      collegeName,
      tenthPercentage,
      degreePercentage,
      programming,
      communication,
      resume: resumePath,
      status: "Pending", // Default status
    });

    res.status(201).json({
      message: "✅ Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error("❌ Error creating application:", error);
    res
      .status(500)
      .json({ message: "Server error while applying for job", error: error.message });
  }
};

// =====================================
// 📋 Fetch Logged-In User’s Applications
// =====================================
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate("job", "title company lastDate")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
};

// ✅ Export multer middleware for routes
exports.upload = upload;
