const router = require("express").Router();
const UserController = require("../controllers/users");

// auth login
router.post("/signin", UserController.signin);

//get login picture
router.post("/loginpic", UserController.getloginpic);

// signin / registration
router.post("/signup", UserController.signup);
router.put("/updateLevel/:_id", UserController.update_user_level);

module.exports = router;
