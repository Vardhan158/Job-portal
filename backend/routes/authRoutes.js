const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register",[
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  validate, registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
