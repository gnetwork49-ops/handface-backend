const router = require("express").Router();
const authController = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

const requireJson = (req, res, next) => {
  if (!req.is("application/json")) return res.status(415).json({ message: "Unsupported Media Type" });
  next();
};

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false
});

router.post("/register", requireJson, authController.register);
router.post("/login", authLimiter, requireJson, authController.login);

module.exports = router;