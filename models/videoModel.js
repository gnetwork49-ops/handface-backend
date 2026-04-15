const pool = require("../db");

const videoModel = {
  async getByUser(userId) {
    const { rows } = await pool.query(
      "SELECT * FROM videos WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  },

  async create(userId, { title, url, thumbnail }) {
    const { rows } = await pool.query(
      "INSERT INTO videos (user_id, title, url, thumbnail) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, url, thumbnail]
    );
    return rows[0];
  },

  async delete(id, userId) {
    await pool.query("DELETE FROM videos WHERE id = $1 AND user_id = $2", [id, userId]);
  }
};

module.exports = videoModel;