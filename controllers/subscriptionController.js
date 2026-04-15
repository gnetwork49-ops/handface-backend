const subscriptionModel = require("../models/subscriptionModel");

const subscriptionController = {
  async getPlans(req, res) {
    try {
      const plans = await subscriptionModel.getPlans();
      res.json(plans);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getMySubscription(req, res) {
    try {
      const subscription = await subscriptionModel.getUserSubscription(req.user.id);
      res.json(subscription);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async subscribe(req, res) {
    try {
      const { plan } = req.body;
      const result = await subscriptionModel.subscribe(req.user.id, plan);
      res.json(result);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = subscriptionController;