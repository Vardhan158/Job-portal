const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    lastDate: { type: Date, required: true },
    company: { type: String, required: true },
    driveType: {
      type: String,
      enum: ["Walk-in Drive", "Direct Face-to-Face"],
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
