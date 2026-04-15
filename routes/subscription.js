const router = require("express").Router();
const subscriptionController = require("../controllers/subscriptionController");
const auth = require("../middleware/auth");

router.get("/plans", subscriptionController.getPlans);
router.get("/my", auth, subscriptionController.getMySubscription);
router.post("/subscribe", auth, subscriptionController.subscribe);

module.exports = router;