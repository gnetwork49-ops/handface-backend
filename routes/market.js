const router = require("express").Router();
const marketController = require("../controllers/marketController");
const auth = require("../middleware/auth");

router.get("/", marketController.getAll);
router.get("/:id", marketController.getById);
router.post("/", auth, marketController.create);
router.put("/:id", auth, marketController.update);
router.delete("/:id", auth, marketController.delete);
router.get("/categories/list", marketController.getCategories);

module.exports = router;