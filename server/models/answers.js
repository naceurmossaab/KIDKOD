const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
	{
		attempt: [String],
		challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenges" },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
		progress: String,
	},
	{
		timestampe: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Answers", answerSchema);
