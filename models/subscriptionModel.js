const pool = require("../db");

const subscriptionModel = {
  async getPlans() {
    return [
      { id: "free", name: "Free", price: 0, features: ["Basic posting", "Followers"] },
      { id: "pro", name: "Pro", price: 999, features: ["Analytics", "Priority support", "Verified badge"] },
      { id: "business", name: "Business", price: 2999, features: ["All Pro features", "Monetization", "API access"] }
    ];
  },

  async getUserSubscription(userId) {
    const { rows } = await pool.query(
      "SELECT plan, status, expires_at FROM subscriptions WHERE user_id = $1",
      [userId]
    );
    return rows[0] || { plan: "free", status: "active" };
  },

  async subscribe(userId, plan) {
    const prices = { free: 0, pro: 999, business: 2999 };

    if (plan === "free") {
      await pool.query("UPDATE subscriptions SET plan = 'free' WHERE user_id = $1", [userId]);
      return { message: "Switched to free plan" };
    }

    await pool.query(
      `INSERT INTO subscriptions (user_id, plan, stripe_customer_id, stripe_subscription_id, status, expires_at)
       VALUES ($1, $2, $3, $4, 'active', NOW() + INTERVAL '30 days')
       ON CONFLICT (user_id) DO UPDATE SET plan = $2, status = 'active', expires_at = NOW() + INTERVAL '30 days'`,
      [userId, plan, `cus_${userId}`, `sub_${Date.now()}`]
    );

    await pool.query(
      "INSERT INTO payments (user_id, amount, type, reference_id, status) VALUES ($1, $2, 'subscription', $3, 'completed')",
      [userId, prices[plan], `sub_${Date.now()}`]
    );

    return { message: "Subscription activated", plan };
  }
};

module.exports = subscriptionModel;