const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const subscriptionChange = require("./subscriptionChange");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  subscriptionChange,
  resendVerifyEmail,
};
