const User = require("../models/users");
const jwt  = require("jsonwebtoken");

const createToken = (id) => {
     return jwt.sign({ id }, "stack", {});
};

module.exports = {
     signin: async (req, res, next) => {
          const { username, password } = req.body;

          try {
               const loggedInUser = await User.login(username, password);

               // i did not want to return user, because, I could not show the hashed password to the client
               // that's why I created a new variable called foundUser
               const foundUser = await User
                    .findByIdAndUpdate(loggedInUser._id, { connected: true }, { new: true })

               const token = createToken(foundUser._id);
               res.cookie("jwt", token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
               // jwt.verify(token, 'stack', (err, user) => console.log(User.findById(user)));
               res.status(201).json(foundUser);
          } catch (error) {
               console.log(error.message);
               res.send(error.message);
          }
     },
     signup: async (req, res, next) => {
          const { username, email, password } = req.body;
          try {
               const savedUser = await User.create({
                    username,
                    email,
                    password
               });

               const foundUser = await User
                    .findById(savedUser._id)
                    .select("-password");

               res.status(201).json(foundUser);
          } catch (error) {
               res.send(error.message);
          }
     },
     logout: async (req, res, next) => {
          // logout
     },
};
