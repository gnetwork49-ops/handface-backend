const videoModel = require("../models/videoModel");

const videoController = {
  async getAll(req, res) {
    try {
      const videos = await videoModel.getByUser(req.user.id);
      res.json(videos);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async create(req, res) {
    try {
      const { title, url, thumbnail } = req.body;
      const video = await videoModel.create(req.user.id, { title, url, thumbnail });
      res.status(201).json(video);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async delete(req, res) {
    try {
      await videoModel.delete(req.params.id, req.user.id);
      res.json({ message: "Video deleted" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = videoController;