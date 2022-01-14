const { append } = require("express/lib/response");
const mongoose = require("mongoose");

const quationSchema = mongoose.Schema(
	{
		announcement: String,
		choices: Array,
		correct: Array,
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Quations", quationSchema);
