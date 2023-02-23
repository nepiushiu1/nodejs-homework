const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const avatarUrl = gravatar.url(email);

  const result = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: result,
    },
  });
};

module.exports = register;

// const { User } = require("../../models/user");
// const { Conflict } = require("http-errors");
// const gravatar = require("gravatar");

// const signUp = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Conflict(`${email} in use`);
//   }
//   const avatarURL = gravatar.url(email);
//   const newUser = new User({ email, avatarURL });
//   newUser.setPassword(password);
//   newUser.save();
//   res.status(201).json({
//     user: {
//       email,
//       subscription: "starter",
//       avatarURL,
//     },
//   });
// };

// module.exports = signUp;
