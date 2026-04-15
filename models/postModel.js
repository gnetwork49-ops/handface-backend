const pool = require("../db");

const postModel = {
  async create(userId, { content, media_type, media_url }) {
    const { rows } = await pool.query(
      "INSERT INTO posts (user_id, content, media_type, media_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, content, media_type, media_url]
    );
    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return rows[0];
  },

  async getFeed(limit = 10, offset = 0) {
    const { rows } = await pool.query(
      `SELECT p.id, p.content, p.media_type, p.media_url, p.created_at,
        json_build_object('id', u.id, 'username', u.username) AS author,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id)::int AS "likesCount",
        (SELECT json_agg(json_build_object('content', c.content, 'author', json_build_object('username', cu.username)))
         FROM comments c JOIN users cu ON cu.id = c.user_id WHERE c.post_id = p.id) AS comments
       FROM posts p JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows.map(r => ({ ...r, comments: r.comments || [] }));
  },

  async like(userId, postId) {
    await pool.query(
      "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, postId]
    );
  },

  async unlike(userId, postId) {
    await pool.query(
      "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
      [userId, postId]
    );
  },

  async addComment(userId, postId, content) {
    const { rows } = await pool.query(
      "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, postId, content]
    );
    return rows[0];
  },

  async delete(id, userId) {
    await pool.query("DELETE FROM posts WHERE id = $1 AND user_id = $2", [id, userId]);
  }
};

module.exports = postModel;