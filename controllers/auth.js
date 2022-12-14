const passport = require("passport");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username, info };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY, {
          expiresIn: "12h",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const signup = async (req, res, next) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
};

module.exports = { login, signup };
