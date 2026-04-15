const paymentModel = require("../models/paymentModel");

const paymentController = {
  async tip(req, res) {
    try {
      const { recipient_id, amount, message } = req.body;
      if (!recipient_id || !amount) {
        return res.status(400).json({ message: "recipient_id and amount required" });
      }

      const result = await paymentModel.tip(req.user.id, recipient_id, amount, message);
      res.json(result);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async subscribeToCreator(req, res) {
    try {
      const { creator_id, amount } = req.body;
      if (!creator_id || !amount) {
        return res.status(400).json({ message: "creator_id and amount required" });
      }

      const result = await paymentModel.subscribeToCreator(req.user.id, creator_id, amount);
      res.json(result);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getHistory(req, res) {
    try {
      const history = await paymentModel.getHistory(req.user.id);
      res.json(history);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getEarnings(req, res) {
    try {
      const earnings = await paymentModel.getEarnings(req.user.id);
      res.json(earnings);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = paymentController;