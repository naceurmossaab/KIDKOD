const Admin = require("../models/admin");
const User  = require("../models/users");
const jwt   = require("jsonwebtoken");

const createToken = (id) => {
     return jwt.sign({ id }, "stack", {});
};

module.exports = {
     signin: async (req, res, next) => {
          const { username, password } = req.body;

          try {
               const loggedInUser = await Admin.login(username, password);
               // console.log("logged user : ", loggedInUser);
               // i did not want to return user, because, I could not show the hashed password to the client
               // that's why I created a new variable called foundUser
               const foundUser = await Admin.findByIdAndUpdate(
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
          const { username, email, password } = req.body;
          try {
               const savedUser = await Admin.create({
                    username,
                    email,
                    password,
               });

               const foundUser = await Admin.findById(savedUser._id).select("-password");

               res.status(201).json(foundUser);
          } catch (error) {
               console.log("signup error : ", error.message);
               res.status(400).send(error.message);
          }
     },
     logout: async (req, res, next) => {
          // logout
     },
     getAllUsers: async (req, res, next) => {
          try {
               const allUsers = await User.find({}).select("-password");
               res.status(201).json(allUsers);
          } catch (error) {
               res.status(400).send(error.message);
          }
     },
};
