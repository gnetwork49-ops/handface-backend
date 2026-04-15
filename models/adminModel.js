const pool = require("../db");

const adminModel = {
  async getUsers(limit = 20, offset = 0) {
    const { rows } = await pool.query(
      "SELECT id, username, email, full_name, is_verified, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    return rows;
  },

  async getUserCount() {
    const { rows } = await pool.query("SELECT COUNT(*) as total FROM users");
    return parseInt(rows[0].total);
  },

  async getStats() {
    const users = await pool.query("SELECT COUNT(*) as total FROM users");
    const posts = await pool.query("SELECT COUNT(*) as total FROM posts");
    const activeSubscriptions = await pool.query("SELECT COUNT(*) as total FROM subscriptions WHERE plan != 'free'");
    return {
      users: parseInt(users.rows[0].total),
      posts: parseInt(posts.rows[0].total),
      activeSubscriptions: parseInt(activeSubscriptions.rows[0].total)
    };
  },

  async verifyUser(userId) {
    await pool.query("UPDATE users SET is_verified = true WHERE id = $1", [userId]);
  },

  async removeVerification(userId) {
    await pool.query("UPDATE users SET is_verified = false WHERE id = $1", [userId]);
  }
};

module.exports = adminModel;