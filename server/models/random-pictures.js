const mongoose = require("mongoose");

const randomPicturesSchema = mongoose.Schema(
     { url: String },
     { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("randomPictures", randomPicturesSchema);
