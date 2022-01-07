const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
	{
		text: String,
		pictures: [String],
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Courses", courseSchema);
