const express = require("express");
const randomPicturesController = require("../controllers/random-pictures");
const router = express.Router();

router.route("/add").post(randomPicturesController.add_randomPicture);
router.route("/getAll").get(randomPicturesController.find_all_randomPictures);

module.exports = router;
