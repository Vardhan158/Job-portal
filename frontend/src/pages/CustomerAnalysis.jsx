import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp } from "lucide-react";

const data = [
  { name: "Week 1", applicants: 15 },
  { name: "Week 2", applicants: 30 },
  { name: "Week 3", applicants: 45 },
  { name: "Week 4", applicants: 60 },
];

export default function CustomerAnalysis() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6 overflow-hidden z-0">
      {/* 🌈 Floating Glow Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-300 via-purple-200 to-transparent blur-3xl"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* ✨ Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Customer Analysis
          </h2>
          <p className="text-gray-600 mt-2">
            Weekly growth overview of job applicants 📈
          </p>
        </div>

        {/* 📊 Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-6 mb-10"
        >
          <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg p-5 flex items-center gap-4 hover:shadow-2xl transition-all duration-300">
            <div className="bg-indigo-600 text-white p-3 rounded-xl shadow">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Total Applicants</h3>
              <p className="text-2xl font-bold text-indigo-700">150+</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg p-5 flex items-center gap-4 hover:shadow-2xl transition-all duration-300">
            <div className="bg-purple-600 text-white p-3 rounded-xl shadow">
              <TrendingUp size={28} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Monthly Growth</h3>
              <p className="text-2xl font-bold text-purple-700">↑ 40%</p>
            </div>
          </div>
        </motion.div>

        {/* 📈 Line Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl p-6"
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                itemStyle={{ color: "#4F46E5", fontWeight: 500 }}
              />
              <Line
                type="monotone"
                dataKey="applicants"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ r: 5, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{
                  r: 7,
                  fill: "#9333EA",
                  strokeWidth: 3,
                  stroke: "#fff",
                }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  );
}
