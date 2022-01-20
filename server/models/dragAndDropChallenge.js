const mongoose = require("mongoose");

const dndChallenge = mongoose.Schema(
	{
		challengeData: Array,
		level: Number,
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("DnDChallenge", dndChallenge);
