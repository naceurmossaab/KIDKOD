const res = require("express/lib/response");
const mongoose = require("mongoose");
const Quations = require("../models/quations");

module.exports = {
	add_quation: async (req, res) => {
		try {
			let quation = req.body;
			const savedQuation = await Quations.create(quation);
			res.send(savedQuation);
		} catch (error) {
			res.send(error);
		}
	},
	find_one_quation: async (req, res) => {
		try {
			let id = req.params._id;
			const quation = await Quations.findById(id);
			res.send(quation);
		} catch (error) {
			res.send(error);
		}
	},
	find_many_quations: async (req, res) => {
		try {
			let ids = req.body.map((id) => mongoose.Types.ObjectId(id));
			const quations = await model.find({
				_id: { $in: ids },
			});
			res.send(quations);
		} catch (error) {
			res.send(error);
		}
	},
	update_quation: async (req, res) => {
		try {
			let quation = req.body;
			let id = req.params._id;
			const updatedQuation = await Quations.findByIdAndUpdate(
				id,
				quation
			);
			res.send(updatedQuation);
		} catch (error) {
			res.send(error);
		}
	},
	update_quation: async (req, res) => {
		try {
			let quation = req.body;
			let id = req.params._id;
			const updatedQuation = await Quations.findByIdAndUpdate(
				id,
				quation
			);
			res.send(updatedQuation);
		} catch (error) {
			res.send(error);
		}
	},
	delete_one_quation: async (req, res) => {
		try {
			let quation = req.body;
			let id = req.params._id;
			const updatedQuation = await Quations.findByIdAndUpdate(
				id,
				quation
			);
			res.send(updatedQuation);
		} catch (error) {
			res.send(error);
		}
	},
};
