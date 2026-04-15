const pool = require("../db");

const livestreamModel = {
  async getActive() {
    const { rows } = await pool.query(
      "SELECT * FROM livestreams WHERE status = 'active' ORDER BY started_at DESC"
    );
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      "SELECT l.*, u.username, u.avatar FROM livestreams l JOIN users u ON l.user_id = u.id WHERE l.id = $1",
      [id]
    );
    return rows[0];
  },

  async create(userId, { title, description }) {
    const { rows } = await pool.query(
      "INSERT INTO livestreams (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, description]
    );
    return rows[0];
  },

  async end(id, userId) {
    const { rows } = await pool.query(
      "UPDATE livestreams SET status = 'ended', ended_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );
    return rows[0];
  },

  async incrementView(id) {
    await pool.query("UPDATE livestreams SET viewer_count = viewer_count + 1 WHERE id = $1", [id]);
  }
};

module.exports = livestreamModel;