const router = require("express").Router();
const UserController = require("../controllers/users");

// auth login
router.post("/signin", UserController.signin);

// signin / registration
router.post("/signup", UserController.signup);

module.exports = router;