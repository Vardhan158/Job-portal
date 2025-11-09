import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { data } = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.user.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
        })
      );

      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err);
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Sign-Up
  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const { data } = await API.post("/api/auth/login", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      localStorage.setItem("token", data.user.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          photo: data.user.photo,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Google Signup Error:", err);
      setError("Google signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 relative overflow-hidden">
      {/* 🌈 Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
      ></motion.div>

      {/* 🖼️ Left Side Image */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex md:w-1/2 justify-center items-center p-10"
      >
        <motion.img
          src="https://cdn.dribbble.com/userupload/8919986/file/original-0f2cda839f16d2f04b8938a27204f188.png?resize=1200x900&vertical=center"
          alt="Career growth illustration"
          className="w-full max-w-lg rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>

      {/* ✨ Right Side Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full md:w-1/2 max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold tracking-wide text-white"
          >
            Create Account
          </motion.h1>
          <p className="text-gray-200 mt-2 text-sm">Join JobSelect to find your dream job</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="text-center text-sm text-red-400 bg-red-400/10 border border-red-500/20 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-200 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@gmail.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-200 text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Register"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-xs text-gray-300">or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google Signup */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={googleSignup}
          className="flex items-center justify-center gap-3 bg-white text-gray-800 w-full py-2 rounded-lg shadow hover:shadow-md transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Sign up with Google</span>
        </motion.button>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-300 font-medium hover:text-white cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
