const mongoose = require("mongoose");

const quationSchema = mongoose.Schema(
	{
		announcement: String,
		choices: [String],
		correct: String,
	},
	{
		timestampe: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Quations", quationSchema);
