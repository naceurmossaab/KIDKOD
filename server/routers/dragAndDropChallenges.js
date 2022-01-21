const express = require("express");
const dndChallengeController = require("../controllers/dragAndDropChallenge");
const router = express.Router();

router.route("/add").post(dndChallengeController.add_DnD_challenge);
router
	.route("/:level")
	.get(dndChallengeController.find_one_dnd_challenge_by_level);

module.exports = router;
