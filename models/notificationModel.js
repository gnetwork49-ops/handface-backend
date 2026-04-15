const pool = require("../db");

const notificationModel = {
  async getByUser(userId) {
    const { rows } = await pool.query(
      `SELECT n.*, p.content as post_content 
       FROM notifications n 
       LEFT JOIN posts p ON n.post_id = p.id 
       WHERE n.user_id = $1 
       ORDER BY n.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async create(userId, { type, from_user_id, post_id }) {
    const { rows } = await pool.query(
      "INSERT INTO notifications (user_id, type, from_user_id, post_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, type, from_user_id, post_id]
    );
    return rows[0];
  },

  async markRead(id, userId) {
    await pool.query(
      "UPDATE notifications SET read = true WHERE id = $1 AND user_id = $2",
      [id, userId]
    );
  },

  async markAllRead(userId) {
    await pool.query("UPDATE notifications SET read = true WHERE user_id = $1", [userId]);
  }
};

module.exports = notificationModel;