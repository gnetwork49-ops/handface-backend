const userModel = require("../models/userModel");
const authModel = require("../models/authModel");

const userController = {
  async getMe(req, res) {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async updateMe(req, res) {
    try {
      const { full_name, bio, avatar, cover_image } = req.body;
      const user = await userModel.update(req.user.id, { full_name, bio, avatar, cover_image });
      res.json(user);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getById(req, res) {
    try {
      const user = await userModel.findPublicProfile(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getByUsername(req, res) {
    try {
      const user = await authModel.findByUsername(req.params.username);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = userController;