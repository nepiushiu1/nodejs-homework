const User = require("../../models/user");
const { Unauthorizet } = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!email) {
    throw new Unauthorizet("missing required field email");
  }
  if (!user) {
    throw new Unauthorizet("Not found");
  }
  if (user.verify) {
    throw new Unauthorizet("user alredy verify");
  }
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a
        target="_blank"
        href="htpp://localhost:3000/api/auth/verify/${user.verificationToken}"
      >
        Нажмите для подтверждения email
      </a>`,
  };
  await sendEmail(mail);
  res.json({ message: "Verification email sent" });
};
module.exports = resendVerifyEmail;
