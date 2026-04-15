const router = require("express").Router();
const verificationController = require("../controllers/verificationController");
const auth = require("../middleware/auth");

router.post("/verify/:id", auth, verificationController.verify);
router.delete("/verify/:id", auth, verificationController.removeVerification);

module.exports = router;