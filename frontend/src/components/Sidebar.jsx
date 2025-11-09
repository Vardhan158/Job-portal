import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logout } from "../api"; // ✅ import logout helper
import toast from "react-hot-toast";

const links = [
  { path: "/dashboard/jobs", label: "Job Posted", icon: "📋" },
  { path: "/dashboard/new", label: "Job Posting", icon: "📝" },
  { path: "/dashboard/analysis", label: "Customer Analysis", icon: "📊" },
  { path: "/dashboard/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  /* 🧭 Logout Handler */
  const handleLogout = () => {
    logout(); // clear token + user
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-indigo-700 to-indigo-900 text-white w-64 min-h-screen p-6 flex flex-col justify-between"
    >
      <div>
        {/* ✅ Centered Title */}
        <h2 className="text-2xl font-bold mb-8 tracking-wide text-center">
          Dashboard
        </h2>

        {/* ✅ Navigation Links */}
        <nav className="space-y-2">
          {links.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                   ${
                     isActive
                       ? "bg-white text-indigo-700 font-semibold"
                       : "hover:bg-indigo-600"
                   }`
                }
              >
                <span>{link.icon}</span> {link.label}
              </NavLink>
            </motion.div>
          ))}

          {/* 🚪 Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 mt-4 rounded-lg bg-red-500/90 hover:bg-red-600 transition text-white font-semibold shadow-md"
          >
            <span>🚪</span> Logout
          </motion.button>
        </nav>
      </div>

      {/* ✅ Footer */}
      <p className="text-sm text-indigo-200 text-center mt-8">
        © {new Date().getFullYear()} JobSelect
      </p>
    </motion.aside>
  );
}
