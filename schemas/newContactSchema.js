const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
  favorite: Joi.bool(),
});

module.exports = newContactSchema;
