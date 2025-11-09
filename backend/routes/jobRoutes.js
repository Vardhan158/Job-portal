const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ✅ Create Job
router.post("/", protect, createJob);

// ✅ Get All Jobs
router.get("/", getAllJobs);

// ✅ Get Job By ID
router.get("/:id", getJobById);

// ✅ Update Job
router.put("/:id", protect, updateJob);

// ✅ Delete Job
router.delete("/:id", protect, deleteJob);

module.exports = router;
