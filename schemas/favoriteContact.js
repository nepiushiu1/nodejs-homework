const Joi = require("joi");

const favoriteContact = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = favoriteContact;
