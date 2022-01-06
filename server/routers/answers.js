const express = require("express");
const answerController = require("../controllers/answers");
const router = express.Router();

router.route("/add").post(answerController.add_answer);
router.route("/find").get(answerController.find_all_answers);
router
	.route("/:challengeId/:userId")
	.get(answerController.find_one_answer_by_challengeID_and_userID)
	.put(answerController.update_one_answer_by_challengeID_and_userID)
	.delete(answerController.delete_one_answer_by_challengeID_and_userID);

module.exports = router;
