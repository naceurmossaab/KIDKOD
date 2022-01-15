const mongoose = require("mongoose");
const Challenges = require("../models/challenges.js");

module.exports = {
	add_challenge: async (req, res) => {
		try {
			let challenge = req.body;
			const savedChallenge = await Challenges.create(challenge);
			res.send(savedChallenge);
		} catch (error) {
			res.send(error);
		}
	},
	find_one_challenge_by_level: async (req, res) => {
		try {
			let level = req.params.level;
			const challenge = await Challenges.findOne({
				level: level,
			})
				.populate("quations")
				.populate("course");
			res.send(challenge);
		} catch (error) {
			res.send(error);
		}
	},
	find_one_challenge_by_id: async (req, res) => {
		try {
			let id = req.params._id;
			const challenge = await Challenges.findById(id)
				.populate("quations")
				.populate("course");
			res.send(challenge);
		} catch (error) {
			res.send(error);
		}
	},
	find_all_challenges: async (req, res) => {
		try {
			const challenges = await Challenges.find()
				.populate("quations")
				.populate("course");

			res.send(challenges);
		} catch (error) {
			res.send(error);
		}
	},
	update_one_challenge: async (req, res) => {
		try {
			let id = req.params._id;
			let update = req.body.challenge;
			const challenge = await Challenges.findByIdAndUpdate(id, update);
			res.send(challenge);
		} catch (error) {
			res.send(error);
		}
	},
	delete_one_challenge: async (req, res) => {
		try {
			let id = req.params._id;
			const challenge = await Challenges.findByIdAndRemove(id);
			res.send(challenge);
		} catch (error) {
			res.send(error);
		}
	},
};
