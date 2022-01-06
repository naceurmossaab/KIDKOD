const mongoose = require("mongoose");
const bcrypt   = require("bcrypt"); 

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
		badge: { type: String, default: "beginner" },
		picture: { type: String, default: "https://www.bootdey.com/img/Content/avatar/avatar7.png" },
	},
	{ timestamps: true, versionKey: false }
);

userSchema.statics.login = async function (username, plainTextPassword) {
	const foundUser = await this.findOne({ username });
	if (foundUser) {
		const success = await bcrypt.compare(
			plainTextPassword,
			foundUser.password
		);
		if (success) return foundUser;
		else throw Error("Incorrect username/password");
	}
	else throw Error("Username not exist");
};

userSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

module.exports = mongoose.model("Users", userSchema);
