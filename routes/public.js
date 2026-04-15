const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/users/:username", userController.getByUsername);

module.exports = router;