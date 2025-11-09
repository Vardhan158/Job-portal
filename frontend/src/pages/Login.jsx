import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import API, { setAuth } from "../api";
import photo1 from "../assets/photo1.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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

      const token = res.data?.token || res.data?.user?.token;
      const userData = res.data?.user || res.data;
      if (!token) throw new Error("Token not received from server");

      setAuth({
        token,
        user: {
          name: userData.name || user.displayName || "User",
          email: userData.email || user.email,
        },
      });

      navigate("/dashboard/jobs", { replace: true });
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await API.post("/api/auth/login", {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });

      const token = res.data?.token || res.data?.user?.token;
      const userData = res.data?.user || res.data;
      if (!token) throw new Error("Token not received from server");

      setAuth({
        token,
        user: {
          name: userData.name || user.displayName,
          email: userData.email || user.email,
          photo: userData.photo || user.photoURL,
        },
      });

      navigate("/dashboard/jobs", { replace: true });
    } catch (err) {
      console.error("❌ Google Sign-In Error:", err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Splash screen
  if (showSplash) {
    const letters = "CARGOFIRST".split("");
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-sky-700 to-cyan-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-widest"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="mx-1"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-16 text-white text-sm tracking-widest"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-blue-900 via-sky-700 to-cyan-400 relative overflow-hidden px-4 sm:px-6">
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center w-full md:w-1/2 p-6 md:p-10 order-1 md:order-2"
      >
      <motion.img
        src={photo1}
        alt="Career growth illustration"
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl h-[300px] sm:h-[400px] md:h-[550px] object-contain rounded-3xl md:ml-10 lg:ml-70"
        whileHover={{ scale: 1.05 }}
      />

      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full sm:w-10/12 md:w-[420px] bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-white order-2 md:order-1 mb-8 md:mb-0"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent"
          >
            JobSelect
          </motion.h1>
          <p className="text-gray-200 mt-2 text-sm sm:text-base">
            Welcome back! Sign in to continue.
          </p>
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
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-100 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 py-2.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-xs text-gray-300">or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={googleLogin}
          disabled={googleLoading}
          className="flex items-center justify-center gap-3 bg-white text-gray-800 w-full py-2 rounded-lg shadow hover:shadow-md transition duration-300 text-sm sm:text-base"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </motion.button>

        <p className="text-center text-xs sm:text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-sky-300 font-semibold hover:text-white cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
