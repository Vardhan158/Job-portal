const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null }, // ✅ optional for Google users
    photo: { type: String, default: "" }, // ✅ store Google profile picture URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
