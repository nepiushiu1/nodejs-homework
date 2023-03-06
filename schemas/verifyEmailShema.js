const Joi = require("joi");

const verifyEmailShema = Joi.object({ email: Joi.string().required() });

module.exports = verifyEmailShema;
