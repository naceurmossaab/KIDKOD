const router = require("express").Router();
const AdminController = require("../controllers/admin");

// auth login
router.post("/signin", AdminController.signin);

//get all users
router.get("/users", AdminController.getAllUsers);

// signin / registration
router.post("/signup", AdminController.signup);

module.exports = router;
