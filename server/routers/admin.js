const router = require("express").Router();
const AdminController = require("../controllers/admin");

// auth login
router.post("/signin", AdminController.signin);

//get all users
router.get("/users", AdminController.getAllUsers);

//get login picture
router.post("/loginpic", AdminController.getloginpic);

// signin / registration
router.post("/signup", AdminController.signup);

module.exports = router;
