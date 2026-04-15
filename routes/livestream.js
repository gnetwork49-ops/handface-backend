const router = require("express").Router();
const livestreamController = require("../controllers/livestreamController");
const auth = require("../middleware/auth");

router.get("/", livestreamController.getActive);
router.get("/:id", livestreamController.getById);
router.post("/", auth, livestreamController.start);
router.put("/:id/end", auth, livestreamController.end);
router.post("/:id/view", livestreamController.incrementView);

module.exports = router;