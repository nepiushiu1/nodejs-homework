const Joi = require("joi");

const contactChangesSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string(),
  phone: Joi.string().pattern(
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
  ),
  favorite: Joi.bool(),
});

module.exports = contactChangesSchema;
