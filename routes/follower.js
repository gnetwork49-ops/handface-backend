const router = require("express").Router();
const followerController = require("../controllers/followerController");
const auth = require("../middleware/auth");

router.get("/followers", auth, followerController.getFollowers);
router.get("/following", auth, followerController.getFollowing);
router.post("/:id/follow", auth, followerController.follow);
router.delete("/:id/follow", auth, followerController.unfollow);

module.exports = router;