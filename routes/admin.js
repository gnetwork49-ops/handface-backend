const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.post("/init", adminController.initDb);
router.get("/users", auth, adminController.getUsers);
router.get("/users/count", auth, adminController.getUserCount);
router.get("/stats", auth, adminController.getStats);

module.exports = router;