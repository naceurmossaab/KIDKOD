const User = require("../models/admin");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
     return jwt.sign({ id }, "stack", {});
};

module.exports = {
     signin: async (req, res, next) => {
          const { username, password, loginpic } = req.body;

          try {
               const loggedInUser =
                    password.length && !loginpic.length
                         ? await User.login(username, password)
                         : await User.loginpic(username, loginpic);
               // console.log("logged user : ", loggedInUser);
               // i did not want to return user, because, I could not show the hashed password to the client
               // that's why I created a new variable called foundUser
               const foundUser = await User.findByIdAndUpdate(
                    loggedInUser._id,
                    { connected: true },
                    { new: true }
               );

               const token = createToken(foundUser._id);
               res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 365 * 24 * 60 * 60 * 1000,
               });
               // jwt.verify(token, 'stack', (err, user) => console.log(User.findById(user)));
               res.status(201).json(foundUser);
          } catch (error) {
               res.status(400).send(error.message);
          }
     },
     signup: async (req, res, next) => {
          const { username, email, password, loginpic } = req.body;
          try {
               const savedUser = await User.create({
                    username,
                    email,
                    password,
                    loginpic,
               });

               const foundUser = await User.findById(savedUser._id).select(
                    "-password"
               );

               res.status(201).json(foundUser);
          } catch (error) {
               console.log("signup error : ", error.message);
               res.status(400).send(error.message);
          }
     },
     getloginpic: async (req, res, next) => {
          const { username } = req.body;

          try {
               const foundUser = await User.find({ username }).select("loginpic");
               res.status(201).json(foundUser);
          } catch (error) {
               res.status(400).send(error.message);
          }
     },
     logout: async (req, res, next) => {
          // logout
     },
     update_user_level: async (req, res) => {
          try {
               let level = req.body;
               let id = req.params._id;
               const updatedUser = await User.findByIdAndUpdate(id, level, {
                    new: true,
               });
               res.send(updatedUser);
          } catch (error) {
               res.send(error);
          }
     },
};
