const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please enter a username"],
			unique: [
				true,
				"There's already an account registered with that username",
			],
		},
		email: { type: String, require: [true, "Please enter an email"] },
		password: {
			type: String,
			required: [true, "Please enter a password"],
			minlength: [8, "Minimum password length is 8 characters"],
		},
		level: { type: Number, default: 1 },
		badge: String,
		picture: String,
	},
	{
		timestampe: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Users", userSchema);
