const router = require("express").Router();
const videoController = require("../controllers/videoController");
const auth = require("../middleware/auth");

router.get("/", auth, videoController.getAll);
router.post("/", auth, videoController.create);
router.delete("/:id", auth, videoController.delete);

module.exports = router;