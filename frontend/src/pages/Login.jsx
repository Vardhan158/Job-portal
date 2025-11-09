import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const res = await API.post("/api/auth/login", {
        email: user.email,
        name: user.displayName || "User",
      });

      if (res.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.data.user?.name || user.displayName || "User",
            email: res.data.user?.email || user.email,
          })
        );
        navigate("/dashboard/jobs");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await API.post("/api/auth/login", {
        email: user.email,
        name: user.displayName,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.user?.name || user.displayName,
          email: res.data.user?.email || user.email,
          photo: user.photoURL,
        })
      );

      navigate("/dashboard/jobs");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-indigo-700 via-pink-600 to-purple-800 relative overflow-hidden">
      {/* 🌈 Animated Gradient Lights */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #ff80b5, transparent 60%)",
            "radial-gradient(circle at 80% 80%, #7dd3fc, transparent 60%)",
            "radial-gradient(circle at 40% 60%, #a78bfa, transparent 60%)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute inset-0 opacity-40 blur-3xl"
      />

      {/* 🎨 Responsive Illustration (Now visible on all screens) */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center w-full md:w-1/2 p-6 md:p-10 order-1 md:order-2"
      >
        <motion.img
          src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7567.jpg"
          alt="Job Portal Illustration"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-3xl shadow-2xl border border-white/20"
          whileHover={{ scale: 1.03 }}
        />
      </motion.div>

      {/* 🧠 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-11/12 sm:w-96 md:w-[420px] mx-auto bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-8 text-white order-2 md:order-1 mb-8 md:mb-0"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            JobSelect
          </motion.h1>
          <p className="text-gray-200 mt-2 text-sm">Welcome back! Sign in to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-red-300 bg-red-500/20 border border-red-400/30 py-2 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block text-gray-100 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@gmail.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-100 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-xs text-gray-300">or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={googleLogin}
          className="flex items-center justify-center gap-3 bg-white text-gray-800 w-full py-2 rounded-lg shadow hover:shadow-md transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </motion.button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-300 font-semibold hover:text-white cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
