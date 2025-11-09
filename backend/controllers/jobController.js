const Job = require("../models/Job");

// ✅ Create Job
const createJob = async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      description: req.body.description,
      lastDate: req.body.lastDate,
      driveType: req.body.driveType,
      user: req.user?._id || null,
    });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("user", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Job By ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("user", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    Object.assign(job, req.body);
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export all
module.exports = {
  createJob,
  getAllJobs,
  getJobById, // ✅ <--- THIS LINE IS THE KEY FIX
  updateJob,
  deleteJob,
};
