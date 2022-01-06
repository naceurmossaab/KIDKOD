const express  = require("express");
const mongoose = require("mongoose");
const users = require("./routers/users.js");
const cookieSession = require("cookie-session");
require("dotenv").config();
const port = process.env.PORT || 8000;
var cors = require('cors');

// Connection to database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
	.connect("mongodb://localhost/KIDKOD")
	.then((res) => console.log("mongoose connected !"));

/******************** Mongoose ********************/
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/kidkod").then(res => console.log("mongoose connected !"));


/******************** Middleware ********************/
let app = express();
// Midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/******************** Routes ********************/
app.use("/users", users);

/******************** Cookie Life ********************/
app.use(cookieSession({maxAge: 365 * 24 * 60 * 60 * 1000, keys: ['secret_key']})); // 1 year in milliseconds})

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
