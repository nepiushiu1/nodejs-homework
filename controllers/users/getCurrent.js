// const User = require("../../models/user");

const getCurrent = async (req, res) => {
  const { email, password } = req.user;
  res.json({
    status: "success",
    code: 201,
    data: { user: { email, password } },
  });
};

module.export = getCurrent;
