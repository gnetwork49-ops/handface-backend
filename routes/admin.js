const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const pool = require("../db");

router.post("/init", adminController.initDb);
router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 as test");
    res.json({ status: "connected", result: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});
router.get("/users", auth, adminController.getUsers);
router.get("/users/count", auth, adminController.getUserCount);
router.get("/stats", auth, adminController.getStats);

module.exports = router;