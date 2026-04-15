const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const requireJson = (req, res, next) => {
  if (!req.is("application/json")) return res.status(415).json({ message: "Unsupported Media Type" });
  next();
};

router.get("/feed", auth, postController.getFeed);
router.post("/", auth, requireJson, postController.create);
router.post("/:id/like", auth, requireJson, postController.like);
router.post("/:id/comments", auth, requireJson, postController.comment);

module.exports = router;