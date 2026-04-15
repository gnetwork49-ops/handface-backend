const marketModel = require("../models/marketModel");

const marketController = {
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;
      const category = req.query.category;

      const items = await marketModel.getAll({ limit, offset, category });
      res.json(items);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getById(req, res) {
    try {
      const item = await marketModel.getById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async create(req, res) {
    try {
      const { title, description, price, category, images } = req.body;
      if (!title || !price) {
        return res.status(400).json({ message: "Title and price required" });
      }

      const item = await marketModel.create(req.user.id, { title, description, price, category, images });
      res.status(201).json(item);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async update(req, res) {
    try {
      const { title, description, price, category, images, status } = req.body;
      const item = await marketModel.update(req.params.id, req.user.id, { title, description, price, category, images, status });
      if (!item) return res.status(404).json({ message: "Item not found or unauthorized" });
      res.json(item);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async delete(req, res) {
    try {
      await marketModel.delete(req.params.id, req.user.id);
      res.json({ message: "Item deleted" });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getCategories(req, res) {
    try {
      const categories = await marketModel.getCategories();
      res.json(categories);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = marketController;