const router = require("express").Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/authValidation");

// POST /api/auth/signup
router.post("/signup", signupValidation, signup);

// POST /api/auth/login
router.post("/login", loginValidation, login);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST /api/auth/reset-password/:token
router.post("/reset-password/:token", resetPassword);

module.exports = router;
