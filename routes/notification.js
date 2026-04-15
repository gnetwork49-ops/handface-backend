const router = require("express").Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");

router.get("/", auth, notificationController.getAll);
router.put("/:id/read", auth, notificationController.markRead);
router.put("/read-all", auth, notificationController.markAllRead);

module.exports = router;