const livestreamModel = require("../models/livestreamModel");

const livestreamController = {
  async getActive(req, res) {
    try {
      const livestreams = await livestreamModel.getActive();
      res.json(livestreams);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getById(req, res) {
    try {
      const livestream = await livestreamModel.getById(req.params.id);
      if (!livestream) return res.status(404).json({ message: "Livestream not found" });
      res.json(livestream);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async start(req, res) {
    try {
      const { title, description } = req.body;
      const livestream = await livestreamModel.create(req.user.id, { title, description });
      req.app.get("io").emit("livestream_started", livestream);
      res.status(201).json(livestream);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async end(req, res) {
    try {
      const livestream = await livestreamModel.end(req.params.id, req.user.id);
      if (!livestream) return res.status(404).json({ message: "Livestream not found or unauthorized" });
      req.app.get("io").emit("livestream_ended", { id: req.params.id });
      res.json({ message: "Livestream ended" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async incrementView(req, res) {
    try {
      await livestreamModel.incrementView(req.params.id);
      res.json({ message: "View counted" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = livestreamController;