const express = require("express");
const coursesController = require("../controllers/courses");
const router = express.Router();

router.route("/add").post(coursesController.add_course);
router.route("/add/many").post(coursesController.add_many_courses);
router.route("/find").get(coursesController.find_all_courses);

router
	.route("/:_id")
	.get(coursesController.find_one_course)
	.put(coursesController.update_one_course)
	.delete(coursesController.delete_one_course);

module.exports = router;
