const express = require("express");
const challengeController = require("../controllers/challenges");
const router = express.Router();

router.route("/add").post(challengeController.add_challenge);
router.route("/find").get(challengeController.find_all_challenges);
router.route("/:level").get(challengeController.find_one_challenge_by_level);
router
	.route("/:_id")
	.get(challengeController.find_one_challenge_by_id)
	.put(challengeController.update_one_challenge)
	.delete(challengeController.delete_one_challenge);

module.exports = router;
