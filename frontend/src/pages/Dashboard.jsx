import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // For mobile icons

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50">
      {/* 🌙 Fixed Sidebar */}
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

      {/* 📱 Mobile Overlay (Dim Background) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 📱 Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl shadow-md transition-all duration-300"
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* 🧭 Main Content Area */}
      <main
        className="flex-1 min-h-screen w-full md:ml-64 overflow-y-auto transition-all duration-500 p-1 md:p-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* ✨ Gradient Header - Centered Text */}
            <header className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg px-6 py-4 mb-6 z-10 text-center">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-indigo-100 mt-1">
                Welcome back to JobSelect 👋
              </p>
            </header>

            {/* 💎 Dynamic Page Content */}
            <section className="bg-white rounded-2xl shadow-lg p-6 min-h-[75vh] border border-gray-100">
              <Outlet />
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
