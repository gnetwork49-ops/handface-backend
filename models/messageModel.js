const pool = require("../db");

const messageModel = {
  async getByConversation(conversationId) {
    const { rows } = await pool.query(
      "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC",
      [conversationId]
    );
    return rows;
  },

  async create(conversationId, senderId, content) {
    const { rows } = await pool.query(
      "INSERT INTO messages (conversation_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *",
      [conversationId, senderId, content]
    );
    return rows[0];
  }
};

module.exports = messageModel;