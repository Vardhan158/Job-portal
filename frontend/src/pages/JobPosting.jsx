import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api";
import { Briefcase, Building2, Calendar, Layers } from "lucide-react";

export default function JobPosting() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    lastDate: "",
    driveType: "",
  });

  // ✅ Handle Job Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/jobs", job);
      toast.success("✅ Job posted successfully!", {
        style: { background: "#E8F5E9", color: "#2E7D32", fontWeight: "500" },
      });

      setJob({
        title: "",
        company: "",
        description: "",
        lastDate: "",
        driveType: "",
      });

      setTimeout(() => navigate("/dashboard/jobs"), 1000);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("❌ Failed to post job. Try again.", {
        style: { background: "#FFEBEE", color: "#C62828", fontWeight: "500" },
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden py-16 px-6">
      {/* 🌈 Floating Gradient Blob Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-purple-200 to-transparent blur-3xl"
      />

      {/* 💎 Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white/70 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl p-8 w-full max-w-2xl"
      >
        {/* ✨ Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-700">📝 Post a New Job</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Fill out the details below to create a new job listing.
          </p>
        </div>

        {/* 🧠 Job Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Briefcase className="absolute left-3 top-2.5 text-indigo-500" size={20} />
            <input
              type="text"
              placeholder="Job Title"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </motion.div>

          {/* Company */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Building2 className="absolute left-3 top-2.5 text-indigo-500" size={20} />
            <input
              type="text"
              placeholder="Company Name"
              value={job.company}
              onChange={(e) => setJob({ ...job, company: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </motion.div>

          {/* Description */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <textarea
              placeholder="Job Description"
              rows="4"
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
              required
            ></textarea>
          </motion.div>

          {/* Last Date */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Calendar className="absolute left-3 top-2.5 text-indigo-500" size={20} />
            <input
              type="date"
              value={job.lastDate}
              onChange={(e) => setJob({ ...job, lastDate: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </motion.div>

          {/* Drive Type */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Layers className="absolute left-3 top-2.5 text-indigo-500" size={20} />
            <select
              value={job.driveType}
              onChange={(e) => setJob({ ...job, driveType: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            >
              <option value="">Select Drive Type</option>
              <option value="Walk-in Drive">Walk-in Drive</option>
              <option value="Direct Face-to-Face">Direct Face-to-Face</option>
            </select>
          </motion.div>

          {/* ✅ Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
          >
            🚀 Post Job
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
