const mongoose = require("mongoose");
const Answers = require("../models/answers");

module.exports = {
	add_answer: async (req, res) => {
		try {
			let answer = req.body;
			const savedAnswer = await Answers.create(answer);
			res.send(savedAnswer);
		} catch (error) {
			res.send(error);
		}
	},
	find_all_answers: async (req, res) => {
		try {
			const answers = await Answers.find()
				.populate("challenge")
				.populate("user");
			res.send(answers);
		} catch (error) {
			res.send(error);
		}
	},
	find_one_answer_by_challengeID_and_userID: async (req, res) => {
		try {
			let challengeId = req.params.challengeId;
			let userId = req.params.userId;
			const answer = await Answers.findOne({
				challenge: challengeId,
				user: userId,
			})
				.populate("challenge")
				.populate("user");
			res.send(answer);
		} catch (error) {
			res.send(error);
		}
	},
	update_one_answer_by_challengeID_and_userID: async (req, res) => {
		try {
			let challengeId = req.params.challengeId;
			let userId = req.params.userId;
			let update = req.body;
			const answer = await Answers.findOneAndUpdate(
				{
					challenge: challengeId,
					user: userId,
				},
				update
			)
				.populate("challenge")
				.populate("user");
			res.send(answer);
		} catch (error) {
			res.send(error);
		}
	},
	delete_one_answer_by_challengeID_and_userID: async (req, res) => {
		try {
			let challengeId = req.params.challengeId;
			let userId = req.params.userId;
			const answer = await Answers.findOneAndRemove({
				challenge: challengeId,
				user: userId,
			})
				.populate("challenge")
				.populate("user");
			res.send(answer);
		} catch (error) {
			res.send(error);
		}
	},
};
