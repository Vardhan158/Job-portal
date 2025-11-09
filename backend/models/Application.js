const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    email: String,
    location: String,
    collegeName: String,
    tenthPercentage: Number,
    degreePercentage: Number,
    programming: {
      java: { type: Number, default: 0 },
      python: { type: Number, default: 0 },
      mern: { type: Number, default: 0 },
      testing: { type: Number, default: 0 },
    },
    communication: Number,
    resume: String,
    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
