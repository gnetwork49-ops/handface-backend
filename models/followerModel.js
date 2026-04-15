const pool = require("../db");

const followerModel = {
  async follow(followerId, followingId) {
    await pool.query(
      "INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)",
      [followerId, followingId]
    );
  },

  async unfollow(followerId, followingId) {
    await pool.query(
      "DELETE FROM followers WHERE follower_id = $1 AND following_id = $2",
      [followerId, followingId]
    );
  },

  async getFollowers(userId) {
    const { rows } = await pool.query(
      `SELECT u.id, u.username, u.email, u.avatar
       FROM followers f JOIN users u ON f.follower_id = u.id
       WHERE f.following_id = $1`,
      [userId]
    );
    return rows;
  },

  async getFollowing(userId) {
    const { rows } = await pool.query(
      `SELECT u.id, u.username, u.email, u.avatar
       FROM followers f JOIN users u ON f.following_id = u.id
       WHERE f.follower_id = $1`,
      [userId]
    );
    return rows;
  },

  async isFollowing(followerId, followingId) {
    const { rows } = await pool.query(
      "SELECT 1 FROM followers WHERE follower_id = $1 AND following_id = $2",
      [followerId, followingId]
    );
    return !!rows[0];
  }
};

module.exports = followerModel;