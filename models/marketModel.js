const pool = require("../db");

const marketModel = {
  async getAll({ limit = 20, offset = 0, category } = {}) {
    let query = "SELECT * FROM marketplace_items WHERE status = 'active'";
    const params = [limit, offset];

    if (category) {
      query += " AND category = $3";
      params.push(category);
    }

    query += " ORDER BY created_at DESC LIMIT $1 OFFSET $2";

    const { rows } = await pool.query(query, params);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(
      "SELECT m.*, u.username, u.avatar FROM marketplace_items m JOIN users u ON m.seller_id = u.id WHERE m.id = $1",
      [id]
    );
    return rows[0];
  },

  async create(sellerId, { title, description, price, category, images }) {
    const { rows } = await pool.query(
      "INSERT INTO marketplace_items (seller_id, title, description, price, category, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [sellerId, title, description, price, category, JSON.stringify(images)]
    );
    return rows[0];
  },

  async update(id, sellerId, data) {
    const { rows } = await pool.query(
      `UPDATE marketplace_items 
       SET title = COALESCE($1, title), description = COALESCE($2, description),
           price = COALESCE($3, price), category = COALESCE($4, category),
           images = COALESCE($5, images), status = COALESCE($6, status)
       WHERE id = $7 AND seller_id = $8 RETURNING *`,
      [data.title, data.description, data.price, data.category, data.images, data.status, id, sellerId]
    );
    return rows[0];
  },

  async delete(id, sellerId) {
    await pool.query("DELETE FROM marketplace_items WHERE id = $1 AND seller_id = $2", [id, sellerId]);
  },

  async getCategories() {
    const { rows } = await pool.query(
      "SELECT DISTINCT category FROM marketplace_items WHERE category IS NOT NULL"
    );
    return rows.map(r => r.category);
  }
};

module.exports = marketModel;