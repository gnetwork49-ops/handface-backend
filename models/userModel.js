const pool = require("../db");

const userModel = {
  async findById(id) {
    const { rows } = await pool.query(
      "SELECT id, username, email, full_name, bio, avatar, cover_image, is_verified, is_admin, created_at FROM users WHERE id = $1",
      [id]
    );
    return rows[0];
  },

  async findPublicProfile(id) {
    const { rows } = await pool.query(
      "SELECT id, username, full_name, bio, avatar, cover_image, is_verified, created_at FROM users WHERE id = $1",
      [id]
    );
    return rows[0];
  },

  async update(id, { full_name, bio, avatar, cover_image }) {
    const { rows } = await pool.query(
      `UPDATE users 
       SET full_name = COALESCE($1, full_name),
           bio = COALESCE($2, bio),
           avatar = COALESCE($3, avatar),
           cover_image = COALESCE($4, cover_image)
       WHERE id = $5
       RETURNING id, username, email, full_name, bio, avatar, cover_image, is_verified, created_at`,
      [full_name, bio, avatar, cover_image, id]
    );
    return rows[0];
  },

  async getAll(limit = 20, offset = 0) {
    const { rows } = await pool.query(
      "SELECT id, username, email, full_name, is_verified, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    return rows;
  },

  async count() {
    const { rows } = await pool.query("SELECT COUNT(*) as total FROM users");
    return parseInt(rows[0].total);
  }
};

module.exports = userModel;