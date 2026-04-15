const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");

router.post("/tip", auth, paymentController.tip);
router.post("/subscribe-to-creator", auth, paymentController.subscribeToCreator);
router.get("/history", auth, paymentController.getHistory);
router.get("/earnings", auth, paymentController.getEarnings);

module.exports = router;