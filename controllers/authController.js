const authService = require("../services/authService");

const authController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register(username, email, password);
      res.status(201).json(user);
    } catch (err) {
      console.error("Register error:", err);
      res.status(400).json({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json({ token: result.token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = authController;