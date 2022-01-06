const express  = require("express");
const mongoose = require("mongoose");
const users = require("./routers/users.js");
const cookieSession = require("cookie-session");
require("dotenv").config();
const port = process.env.PORT || 8000;
var cors = require('cors');

let app = express();

/******************** Mongoose ********************/
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/kidkod").then(res => console.log("mongoose connected !"));


/******************** Middleware ********************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/******************** Routes ********************/
app.use("/users", users);

/******************** Cookie Life ********************/
app.use(cookieSession({maxAge: 365 * 24 * 60 * 60 * 1000, keys: ['secret_key']})); // 1 year in milliseconds})

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port} !`);
});
