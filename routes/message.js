const router = require("express").Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

router.get("/:conversationId", auth, messageController.getMessages);
router.post("/", auth, messageController.sendMessage);

module.exports = router;