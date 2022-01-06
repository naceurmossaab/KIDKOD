const express = require("express");

// Variables envirement
require("dotenv").config();
const port = process.env.PORT || 8000;

// Connection to database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
	.connect("mongodb://localhost/KIDKOD")
	.then((res) => console.log("mongoose connected !"));

let app = express();
// Midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const quationRouter = require("./routers/quations");
const courseRouter = require("./routers/courses");
const challengeRouter = require("./routers/challenges");
const answerRouter = require("./routers/answers");

app.use("/api/quation", quationRouter);
app.use("/api/course", courseRouter);
app.use("/api/challenge", challengeRouter);
app.use("/api/challenge", answerRouter);

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port} !`);
});
