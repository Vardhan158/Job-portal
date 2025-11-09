const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/* ==========================================================
   📝 Register User (Manual)
========================================================== */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

/* ==========================================================
   🔐 Login User (Manual or Google)
========================================================== */
const loginUser = async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;

    // 🟢 If Google login (no password)
    if (!password && name && email) {
      let user = await User.findOne({ email });

      if (!user) {
        // Create user if not found
        user = await User.create({
          name,
          email,
          photo,
          password: null, // since Google users don’t have password
        });
      }

      return res.status(200).json({
        success: true,
        message: "Google login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          token: generateToken(user._id),
        },
      });
    }

    // 🔹 Normal Email/Password login
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { registerUser, loginUser };
