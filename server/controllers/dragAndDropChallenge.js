const mongoose = require("mongoose");
const DnDChallenge = require("../models/dragAndDropChallenge.js");

module.exports = {
	add_DnD_challenge: async (req, res) => {
		try {
			let challenge = req.body;
			const savedChallenge = await DnDChallenge.create(challenge);
			res.send(savedChallenge);
		} catch (error) {
			res.send(error);
		}
	},
	find_one_dnd_challenge_by_level: async (req, res) => {
		try {
			let level = req.params.level;
			const challenge = await DnDChallenge.findOne({
				level,
			});
			res.send(challenge);
		} catch (error) {
			res.send(error);
		}
	},
};
