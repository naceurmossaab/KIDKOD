const mongoose = require("mongoose");
const randomPictures = require("../models/random-pictures");

module.exports = {
     add_randomPicture: async (req, res) => {
          try {
               let picture = req.body;
               const savedRandomPicture = await randomPictures.create(picture);
               res.send(savedRandomPicture);
          } catch (error) {
               res.send(error);
          }
     },
     find_all_randomPictures: async (req, res) => {
          try {
               const findRandomPictures = await randomPictures.find();
               res.send(findRandomPictures);
          } catch (error) {
               res.send(error);
          }
     },
     delete_randomPicture: async (req, res) => {
          try {
               let id = req.params._id;
               const deletedRandomPicture = await randomPictures.findByIdAndRemove(id);
               res.send(deletedRandomPicture);
          } catch (error) {
               res.send(error);
          }
     },
};
