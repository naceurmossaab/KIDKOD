// const res = require("express/lib/response");
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
	add_many_quations: async (req, res) => {
		try {
			let quation = req.body.quations;
			const savedQuations = await Quations.insertMany(quation);
			res.send(savedQuations);
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
			let ids = req.body.ids.map((id) => mongoose.Types.ObjectId(id));
			const quations = await Quations.find({
				_id: { $in: ids },
			});
			res.send(quations);
		} catch (error) {
			res.send(error);
		}
	},
	find_all_quations: async (req, res) => {
		try {
			const quations = await Quations.find();
			res.send(quations);
		} catch (error) {
			res.send(error);
		}
	},
	update_one_quation: async (req, res) => {
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
			let id = req.params._id;
			const deletedQuation = await Quations.findByIdAndRemove(id);
			res.send(deletedQuation);
		} catch (error) {
			res.send(error);
		}
	},
};
