import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 🌀 Show loading screen initially

  // 🕒 Show loading screen for 3 seconds on refresh or visit
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // 🔤 Animation variants for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  /* ============================================================
     🌀 Responsive Loading Screen - "CARGOFIRST"
  ============================================================ */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-center px-4">
        {/* 🔤 Animated CARGOFIRST Text */}
        <motion.div
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-widest flex flex-wrap justify-center gap-1 sm:gap-2"
          initial="hidden"
          animate="visible"
        >
          {"CARGOFIRST".split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="drop-shadow-xl"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* 🌀 Subtext (Loading Dashboard...) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.5,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mt-8 sm:mt-10 text-white text-sm sm:text-base font-medium tracking-wide"
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  /* ============================================================
     💼 Main Dashboard Layout
  ============================================================ */
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50">
      {/* 🌙 Sidebar */}
      <motion.aside
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className={`fixed top-0 left-0 h-full bg-white/90 backdrop-blur-md shadow-2xl border-r border-gray-200 z-50 
        w-64 transform transition-transform duration-500 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </motion.aside>

      {/* 📱 Overlay for mobile when sidebar open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 📱 Toggle button for sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl shadow-md transition-all duration-300"
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🧭 Main Content */}
      <main className="flex-1 min-h-screen w-full md:ml-64 overflow-y-auto transition-all duration-500 p-1 md:p-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* ✨ Dashboard Header */}
            <header className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg px-6 py-4 mb-6 z-10 text-center">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-indigo-100 mt-1">
                Welcome back to JobSelect 👋
              </p>
            </header>

            {/* 💎 Page Content */}
            <section className="bg-white rounded-2xl shadow-lg p-6 min-h-[75vh] border border-gray-100">
              <Outlet />
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
