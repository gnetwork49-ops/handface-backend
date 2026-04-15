const messageModel = require("../models/messageModel");

const messageController = {
  async getMessages(req, res) {
    try {
      const messages = await messageModel.getByConversation(req.params.conversationId);
      res.json(messages);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async sendMessage(req, res) {
    try {
      const { conversation_id, content } = req.body;
      const message = await messageModel.create(conversation_id, req.user.id, content);
      res.status(201).json(message);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = messageController;