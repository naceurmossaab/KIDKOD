const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
	{
		text: String,
		pictures: [String],
	},
	{
		timestampe: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Challenges", courseSchema);
