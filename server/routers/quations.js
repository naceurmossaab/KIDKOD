const express = require("express");
const quationsController = require("../controllers/quations");
const router = express.Router();

router.route("/add").post(quationsController.add_quation);
router.route("/add/many").post(quationsController.add_many_quations);
router
	.route("/find")
	.post(quationsController.find_many_quations)
	.get(quationsController.find_all_quations);

router
	.route("/:_id")
	.get(quationsController.find_one_quation)
	.put(quationsController.update_one_quation)
	.delete(quationsController.delete_one_quation);

module.exports = router;
