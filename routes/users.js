const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/me", auth, userController.getMe);
router.put("/me", auth, userController.updateMe);
router.get("/:id", userController.getById);

module.exports = router;