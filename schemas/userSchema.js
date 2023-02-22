const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
  // avatarURL: Joi.string(),
});

module.exports = userSchema;
