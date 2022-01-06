const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema(
	{
		quations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quations" }],
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
		level: Number,
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Challenges", challengeSchema);
