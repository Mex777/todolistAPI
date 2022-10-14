const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
