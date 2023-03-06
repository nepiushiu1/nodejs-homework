const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const User = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const verificationToken = v4();

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a
        target="_blank"
        href="htpp://localhost:3000/api/auth/verify/${verificationToken}"
      >
        Нажмите для подтверждения email
      </a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = register;
