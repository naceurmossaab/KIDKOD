const router = require("express").Router();
const AdminController = require("../controllers/admin");

// auth login
router.post("/signin", AdminController.signin);

//get login picture
router.post("/loginpic", AdminController.getloginpic);

// signin / registration
router.post("/signup", AdminController.signup);
router.put("/updateLevel/:_id", AdminController.update_user_level);

module.exports = router;
