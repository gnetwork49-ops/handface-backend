const pool = require("../db");

const paymentModel = {
  async tip(senderId, recipientId, amount, message) {
    await pool.query("BEGIN");

    await pool.query(
      "INSERT INTO tips (sender_id, recipient_id, amount, message) VALUES ($1, $2, $3, $4)",
      [senderId, recipientId, amount, message]
    );

    await pool.query(
      "INSERT INTO payments (user_id, amount, type, reference_id, status) VALUES ($1, $2, 'tip', $3, 'completed')",
      [senderId, amount, `tip_${Date.now()}`]
    );

    await pool.query("COMMIT");
    return { message: "Tip sent successfully" };
  },

  async subscribeToCreator(subscriberId, creatorId, amount) {
    await pool.query(
      `INSERT INTO creator_subscribers (creator_id, subscriber_id, amount)
       VALUES ($1, $2, $3)
       ON CONFLICT (creator_id, subscriber_id) DO UPDATE SET amount = $3`,
      [creatorId, subscriberId, amount]
    );

    await pool.query(
      "INSERT INTO payments (user_id, amount, type, reference_id, status) VALUES ($1, $2, 'creator_subscription', $3, 'completed')",
      [subscriberId, amount, `cs_${Date.now()}`]
    );

    return { message: "Subscribed to creator" };
  },

  async getHistory(userId) {
    const { rows } = await pool.query(
      "SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50",
      [userId]
    );
    return rows;
  },

  async getEarnings(userId) {
    const tips = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM tips WHERE recipient_id = $1",
      [userId]
    );
    const subscriptions = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total FROM creator_subscribers WHERE creator_id = $1",
      [userId]
    );
    return {
      tips: parseInt(tips.rows[0].total),
      subscriptions: parseInt(subscriptions.rows[0].total),
      total: parseInt(tips.rows[0].total) + parseInt(subscriptions.rows[0].total)
    };
  }
};

module.exports = paymentModel;