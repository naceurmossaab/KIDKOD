const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port} !`);
});
