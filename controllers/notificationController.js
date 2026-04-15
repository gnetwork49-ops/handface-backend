const notificationModel = require("../models/notificationModel");

const notificationController = {
  async getAll(req, res) {
    try {
      const notifications = await notificationModel.getByUser(req.user.id);
      res.json(notifications);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async markRead(req, res) {
    try {
      await notificationModel.markRead(req.params.id, req.user.id);
      res.json({ message: "Notification marked as read" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async markAllRead(req, res) {
    try {
      await notificationModel.markAllRead(req.user.id);
      res.json({ message: "All notifications marked as read" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = notificationController;