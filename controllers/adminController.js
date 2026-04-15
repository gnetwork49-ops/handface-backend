const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const pool = require("../db");
const fs = require("fs");
const path = require("path");

const adminController = {
  async getUsers(req, res) {
    try {
      const admin = await userModel.findById(req.user.id);
      if (!admin?.is_admin) {
        return res.status(403).json({ message: "Admin only" });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const users = await adminModel.getUsers(limit, offset);
      res.json(users);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getUserCount(req, res) {
    try {
      const admin = await userModel.findById(req.user.id);
      if (!admin?.is_admin) {
        return res.status(403).json({ message: "Admin only" });
      }

      const total = await adminModel.getUserCount();
      res.json({ total });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async getStats(req, res) {
    try {
      const admin = await userModel.findById(req.user.id);
      if (!admin?.is_admin) {
        return res.status(403).json({ message: "Admin only" });
      }

      const stats = await adminModel.getStats();
      res.json(stats);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },

  async initDb(req, res) {
    try {
      const initSql = fs.readFileSync(path.join(__dirname, "..", "init.sql"), "utf-8");
      const statements = initSql.split(";").filter(s => s.trim());
      
      for (const stmt of statements) {
        if (stmt.trim()) {
          await pool.query(stmt);
        }
      }
      
      res.json({ message: "Database initialized successfully" });
    } catch (err) {
      console.error("Init DB error:", err);
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = adminController;