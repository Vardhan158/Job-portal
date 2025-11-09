import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api";

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    collegeName: "",
    tenthPercentage: "",
    degreePercentage: "",
    selectedLanguage: "", // Java / Python / MERN / Testing
    communication: 0,
    resume: null,
  });

  // ✅ Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.get(`/api/jobs/${id}`);
        setJob(data);
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchJob();
  }, [id]);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("jobId", id);

    Object.keys(form).forEach((key) => {
      if (key === "resume") {
        if (form.resume) fd.append("resume", form.resume);
      } else {
        fd.append(key, form[key]);
      }
    });

    try {
      await API.post("/api/applications", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Application submitted successfully!");
      navigate("/dashboard/jobs");
    } catch (error) {
      toast.error("❌ Failed to apply. Try again.");
    }
  };

  if (!job) return <p className="text-center mt-10">Loading job details...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-6">{job.company}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🧍 Basic Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="College Name"
            value={form.collegeName}
            onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
            className="border p-2 rounded-md"
            required
          />
        </div>

        {/* 🎓 Education Details */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">10th Marks (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter 10th percentage"
              value={form.tenthPercentage}
              onChange={(e) => setForm({ ...form, tenthPercentage: e.target.value })}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Degree Marks (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter degree percentage"
              value={form.degreePercentage}
              onChange={(e) => setForm({ ...form, degreePercentage: e.target.value })}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
        </div>

        {/* 💻 Programming Language (Radio Buttons) */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Preferred Programming Language
          </h3>
          <div className="flex flex-wrap gap-4">
            {["Java", "Python", "MERN", "Software Testing"].map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-2 border rounded-md px-3 py-1 cursor-pointer hover:bg-indigo-50"
              >
                <input
                  type="radio"
                  name="selectedLanguage"
                  value={lang}
                  checked={form.selectedLanguage === lang}
                  onChange={(e) =>
                    setForm({ ...form, selectedLanguage: e.target.value })
                  }
                  className="text-indigo-600"
                  required
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* 🗣️ Communication Skill Rating */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Communication Skill (1–10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={form.communication}
            onChange={(e) => setForm({ ...form, communication: e.target.value })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* 📎 Resume Upload */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* ✅ Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
        >
          Submit Application
        </motion.button>
      </form>
    </div>
  );
}
